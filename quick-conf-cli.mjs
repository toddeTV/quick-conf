#!/usr/bin/env node

import { execSync, spawnSync } from 'node:child_process'
import fs from 'node:fs'
import https from 'node:https'
import path from 'node:path'
import process from 'node:process'
import readline from 'node:readline'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const CLI_VERSION = '1.0.0'
const REPO_OWNER = 'toddeTV'
const REPO_NAME = 'quick-conf'
const GITHUB_API_BASE = 'https://api.github.com'

let PACKAGE_MANAGER = 'pnpm'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

// --- Helpers ---

function safeUnlink(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
    }
  }
  catch {
    // ignore errors (e.g. file locked)
  }
}

/**
 * Prompts the user with a question and returns the answer.
 * @param {string} query - The question to ask.
 * @returns {Promise<string>} The user's input.
 */
function askQuestion(query) {
  return new Promise(resolve => rl.question(query, resolve))
}

/**
 * Logs a message to the console with color coding based on type.
 * @param {string} msg - The message to log.
 * @param {'info'|'success'|'warn'|'error'} type - The type of log message.
 */
function log(msg, type = 'info') {
  const colors = {
    info: '\x1B[36m%s\x1B[0m', // Cyan
    success: '\x1B[32m%s\x1B[0m', // Green
    warn: '\x1B[33m%s\x1B[0m', // Yellow
    error: '\x1B[31m%s\x1B[0m', // Red
  }
  console.log(colors[type] || colors.info, `[Quick Conf] ${msg}`)
}

/**
 * Fetches and parses JSON content from a URL.
 * @param {string} url - The URL to fetch.
 * @returns {Promise<any>} The parsed JSON data.
 */
async function fetchJson(url) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'User-Agent': 'Quick-Conf-CLI',
        'Accept': 'application/vnd.github.v3+json',
      },
    }
    https.get(url, options, (res) => {
      let data = ''
      if (res.statusCode >= 400) {
        // Consume response data to free up memory
        res.resume()
        return reject(new Error(`Request Failed. Status Code: ${res.statusCode}`))
      }
      res.on('data', (chunk) => {
        data += chunk
      })
      res.on('end', () => {
        try {
          resolve(JSON.parse(data))
        }
        catch (e) {
          reject(e)
        }
      })
    }).on('error', reject)
  })
}

/**
 * Downloads a file from a URL to a local destination.
 * Handles redirects (301/302).
 * @param {string} url - The URL to download from.
 * @param {string} dest - The local file path destination.
 * @returns {Promise<string>} The destination path upon success.
 */
async function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest)
    https.get(url, { headers: { 'User-Agent': 'Quick-Conf-CLI' } }, (response) => {
      if (response.statusCode === 302 || response.statusCode === 301) {
        file.close()
        fs.unlinkSync(dest) // Delete partial file
        return downloadFile(response.headers.location, dest).then(resolve).catch(reject)
      }
      if (response.statusCode !== 200) {
        file.close()
        fs.unlinkSync(dest)
        return reject(new Error(`Failed to download. Status Code: ${response.statusCode}`))
      }
      response.pipe(file)
      file.on('finish', () => {
        file.close(() => resolve(dest))
      })
    }).on('error', (err) => {
      fs.unlink(dest, () => {})
      reject(err)
    })
  })
}

/**
 * Extracts a tarball to a destination directory using the system `tar` command.
 * @param {string} tarPath - The path to the tarball file.
 * @param {string} destDir - The directory where files should be extracted.
 * @throws {Error} If extraction fails.
 */
function extractTarball(tarPath, destDir) {
  // Ensure destDir exists
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true })
  }
  try {
    // Use spawnSync to avoid shell injection risks
    const result = spawnSync('tar', ['-xf', tarPath, '-C', destDir, '--strip-components=1'], { stdio: 'inherit' })

    if (result.error)
      throw result.error
    if (result.status !== 0)
      throw new Error(`tar exited with code ${result.status}`)
  }
  catch (error) {
    throw new Error(`Failed to extract tarball: ${error.message}`)
  }
}

/**
 * Fetches the content of a remote file as a string.
 * @param {string} url - The URL of the file to fetch.
 * @returns {Promise<string>} The file content.
 */
async function getRemoteFileContent(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = ''
      res.on('data', chunk => data += chunk)
      res.on('end', () => resolve(data))
    }).on('error', reject)
  })
}

/**
 * Retrieves the version of the CLI tool from the remote repository.
 * @returns {Promise<string>} The remote version string, or 'Unknown' if fetch fails.
 */
async function getRemoteCliVersion() {
  try {
    const url = `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/main/quick-conf-cli.mjs`
    const content = await getRemoteFileContent(url)
    const match = content.match(/const CLI_VERSION = '([\d.]+)'/)
    return match ? match[1] : 'Unknown'
  }
  catch {
    return 'Unknown'
  }
}

/**
 * Retrieves the version of the local project from package.json.
 * @returns {string} The local project version, or '-' if not found.
 */
function getLocalProjectVersion() {
  try {
    const pkgPath = path.join(process.cwd(), 'package.json')
    if (fs.existsSync(pkgPath)) {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
      return pkg.version || '-'
    }
  }
  catch {}
  return '-'
}

/**
 * Prompts the user to select a package manager and updates the global configuration.
 * Defaults to 'pnpm'.
 * @returns {Promise<void>}
 */
async function selectPackageManager() {
  console.log('\nSelect Package Manager:')
  console.log('1. pnpm (Recommended because of existing `pnpm-lock.yaml`)')
  console.log('2. npm')
  console.log('3. yarn')
  console.log('4. bun')

  const choice = await askQuestion('Enter choice (1-4) [1]: ')
  switch (choice.trim()) {
    case '2':
      PACKAGE_MANAGER = 'npm'
      break
    case '3':
      PACKAGE_MANAGER = 'yarn'
      break
    case '4':
      PACKAGE_MANAGER = 'bun'
      break
    default:
      PACKAGE_MANAGER = 'pnpm'
      break
  }
  log(`Selected package manager: ${PACKAGE_MANAGER}`, 'info')
}

// --- Features ---

/**
 * Checks if a newer version of the CLI is available and prompts for update.
 * @param {string} remoteCliVer - The version string of the remote CLI.
 * @returns {Promise<void>}
 */
async function checkSelfUpdate(remoteCliVer) {
  log('Checking for updates...')
  try {
    const latestVersion = remoteCliVer

    if (latestVersion !== 'Unknown' && compareVersions(latestVersion, CLI_VERSION) > 0) {
      log(`New version available: ${latestVersion} (Current: ${CLI_VERSION})`, 'warn')
      const answer = await askQuestion('Do you want to update the CLI tool? (y/N): ')
      if (answer.toLowerCase() === 'y') {
        // Find asset
        const latestRelease = await fetchJson(`${GITHUB_API_BASE}/repos/${REPO_OWNER}/${REPO_NAME}/releases/latest`)
        const asset = latestRelease.assets.find(a => a.name === 'quick-conf-cli.mjs')
        let downloadUrl
        if (asset) {
          downloadUrl = asset.browser_download_url
        }
        else {
          // Fallback to raw file from tag if asset not found (assuming standard repo structure)
          downloadUrl = `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/${latestRelease.tag_name}`
            + '/quick-conf-cli.mjs'
          log('CLI asset not found in release, trying to fetch from source...', 'warn')
        }

        log(`Downloading update from ${downloadUrl}...`)
        const newFile = `${__filename}.new`
        const oldFile = `${__filename}.old`

        await downloadFile(downloadUrl, newFile)

        // Rename current to .old
        try {
          if (fs.existsSync(oldFile))
            safeUnlink(oldFile)
          fs.renameSync(__filename, oldFile)
        }
        catch (e) {
          log(`Failed to rename current script: ${e.message}`, 'error')
          log(`Update downloaded to: ${newFile}`, 'info')
          log('Please manually rename it to quick-conf-cli.mjs', 'info')
          process.exit(1)
        }

        // Rename .new to current
        try {
          fs.renameSync(newFile, __filename)
          log('Update complete. Please restart the tool.', 'success')
          process.exit(0)
        }
        catch (e) {
          log(`Failed to install new script: ${e.message}`, 'error')
          // Try to restore
          try {
            fs.renameSync(oldFile, __filename)
            log('Restored original script.', 'info')
          }
          catch {
            log('Failed to restore original script. You may need to reinstall.', 'error')
          }
          process.exit(1)
        }
      }
    }
    else {
      log('CLI is up to date.')
    }
  }
  catch (error) {
    log(`Failed to check for updates: ${error.message}`, 'error')
    // Continue execution even if update check fails
  }
}

/**
 * Compares two semantic version strings.
 * @param {string} v1 - The first version string.
 * @param {string} v2 - The second version string.
 * @returns {number} 1 if v1 > v2, -1 if v1 < v2, 0 if equal.
 */
function compareVersions(v1, v2) {
  const p1 = v1.split('.').map(Number)
  const p2 = v2.split('.').map(Number)
  for (let i = 0; i < Math.max(p1.length, p2.length); i++) {
    const n1 = p1[i] || 0
    const n2 = p2[i] || 0
    if (n1 > n2)
      return 1
    if (n1 < n2)
      return -1
  }
  return 0
}

/**
 * Performs a fresh installation of the template.
 * Downloads the latest release, extracts it, and optionally installs dependencies.
 * @returns {Promise<void>}
 */
async function freshInstall() {
  const answer = await askQuestion(
    'This will download the latest release and overwrite files in the current directory. Continue? (y/N): ',
  )
  if (answer.toLowerCase() !== 'y')
    return

  try {
    log('Fetching latest release info...')
    const latestRelease = await fetchJson(`${GITHUB_API_BASE}/repos/${REPO_OWNER}/${REPO_NAME}/releases/latest`)
    const tarballUrl = latestRelease.tarball_url

    log(`Downloading release ${latestRelease.tag_name}...`)
    const tempTar = path.join(__dirname, 'temp_install.tar.gz')
    await downloadFile(tarballUrl, tempTar)

    // Extract to temp dir first to avoid overwriting current files directly (especially the CLI tool)
    const tempDir = path.join(__dirname, '.install_temp')
    if (fs.existsSync(tempDir))
      fs.rmSync(tempDir, { recursive: true, force: true })
    fs.mkdirSync(tempDir)

    log('Extracting...')
    extractTarball(tempTar, tempDir)
    fs.unlinkSync(tempTar)

    log('Installing files...')
    // Copy files from tempDir to __dirname, excluding quick-conf-cli.mjs
    const extractedFiles = fs.readdirSync(tempDir)
    for (const file of extractedFiles) {
      if (file === 'quick-conf-cli.mjs')
        continue // Skip overwriting the CLI tool

      const srcPath = path.join(tempDir, file)
      const destPath = path.join(__dirname, file)
      fs.cpSync(srcPath, destPath, { recursive: true, force: true })
    }

    // Cleanup
    fs.rmSync(tempDir, { recursive: true, force: true })

    log('Installation files downloaded.', 'success')

    const installDeps = await askQuestion(`Do you want to run "${PACKAGE_MANAGER} install"? (y/N): `)
    if (installDeps.toLowerCase() === 'y') {
      log(`Running ${PACKAGE_MANAGER} install...`)
      let cmd = `${PACKAGE_MANAGER} install`
      if (PACKAGE_MANAGER === 'pnpm') {
        cmd += ' --frozen-lockfile --prefer-offline'
      }
      execSync(cmd, { stdio: 'inherit' })
    }

    log('Fresh installation complete!', 'success')
  }
  catch (error) {
    log(`Installation failed: ${error.message}`, 'error')
  }
}

/**
 * Updates the template while preserving user content.
 * Backs up specific directories/files, installs the new version, and restores the backup.
 * @returns {Promise<void>}
 */
async function updateTemplate() {
  log('Starting update process...')

  try {
    // 1. Download
    log('Fetching latest release info...')
    const latestRelease = await fetchJson(`${GITHUB_API_BASE}/repos/${REPO_OWNER}/${REPO_NAME}/releases/latest`)
    const tarballUrl = latestRelease.tarball_url

    const tempDir = path.join(__dirname, '.update_temp')
    if (fs.existsSync(tempDir))
      fs.rmSync(tempDir, { recursive: true, force: true })
    fs.mkdirSync(tempDir)

    const tempTar = path.join(tempDir, 'source.tar.gz')
    log(`Downloading release ${latestRelease.tag_name}...`)
    await downloadFile(tarballUrl, tempTar)

    // 2. Extract
    const extractDir = path.join(tempDir, 'extracted')
    fs.mkdirSync(extractDir)
    log('Extracting update...')
    extractTarball(tempTar, extractDir)

    // 3. Preserve & Backup
    const backupDir = path.join(tempDir, 'backup')
    fs.mkdirSync(backupDir)

    log('Backing up user files...')

    // Helper to move if exists
    const moveIfExists = (srcRel, destRel) => {
      const src = path.join(__dirname, srcRel)
      const dest = path.join(backupDir, destRel)
      if (fs.existsSync(src)) {
        const destParent = path.dirname(dest)
        if (!fs.existsSync(destParent))
          fs.mkdirSync(destParent, { recursive: true })
        fs.renameSync(src, dest)
        return true
      }
      return false
    }

    // Specific preservations
    // Note: 'public' might be at root or 'app/public'. We try both.
    const preservedMap = {}
    if (moveIfExists('content', 'content'))
      preservedMap.content = true
    if (moveIfExists('app/public', 'app/public'))
      preservedMap['app/public'] = true
    if (moveIfExists('public', 'public'))
      preservedMap.public = true
    if (moveIfExists('.env', '.env'))
      preservedMap['.env'] = true

    // 4. Delete Root (except preserved and script itself)
    log('Cleaning up old files...')
    const files = fs.readdirSync(__dirname)
    for (const file of files) {
      if (file === 'quick-conf-cli.mjs')
        continue
      if (file === '.git')
        continue
      if (file === '.gitignore')
        continue // Keep gitignore just in case
      if (file === '.update_temp')
        continue

      // If we already moved it to backup, it's gone from root, so no need to delete.
      // But we need to check if it was a preserved path that we DIDN'T move (e.g. if we decided to keep it in place).
      // Our strategy was move-to-backup, so it should be gone.
      // However, we need to be careful not to delete things we want to keep but didn't move (like .git).

      const filePath = path.join(__dirname, file)
      if (fs.existsSync(filePath)) { // Check existence again
        fs.rmSync(filePath, { recursive: true, force: true })
      }
    }

    // 5. Install New Files
    log('Installing new files...')
    // We need to copy from extractDir to __dirname
    // But we must NOT overwrite if we are going to restore from backup?
    // Actually, we want to overwrite everything with new version, THEN restore user content.

    // Recursive copy function since fs.cpSync is Node 16.7+ (we assume recent node, but let's be safe or use cp -r)
    // Using fs.cpSync for cross-platform compatibility (Windows/Linux/macOS)
    const extractedFiles = fs.readdirSync(extractDir)
    for (const file of extractedFiles) {
      if (file === 'quick-conf-cli.mjs')
        continue // Skip overwriting the CLI tool

      const srcPath = path.join(extractDir, file)
      const destPath = path.join(__dirname, file)
      fs.cpSync(srcPath, destPath, { recursive: true, force: true })
    }

    // 6. Restore Backup
    log('Restoring user files...')
    const restore = (backupRel, destRel) => {
      const src = path.join(backupDir, backupRel)
      const dest = path.join(__dirname, destRel)
      if (fs.existsSync(src)) {
        // If destination exists (from fresh install), remove it first to replace with user backup
        if (fs.existsSync(dest)) {
          fs.rmSync(dest, { recursive: true, force: true })
        }
        // Ensure parent exists
        const destParent = path.dirname(dest)
        if (!fs.existsSync(destParent))
          fs.mkdirSync(destParent, { recursive: true })

        fs.renameSync(src, dest)
      }
    }

    if (preservedMap.content)
      restore('content', 'content')
    if (preservedMap['app/public'])
      restore('app/public', 'app/public')
    if (preservedMap.public)
      restore('public', 'public')
    if (preservedMap['.env'])
      restore('.env', '.env')

    // 7. Cleanup
    log('Cleaning up temp files...')
    fs.rmSync(tempDir, { recursive: true, force: true })

    log('Update complete!', 'success')
  }
  catch (error) {
    log(`Update failed: ${error.message}`, 'error')
    log('You may need to manually restore files from .update_temp/backup if it exists.', 'warn')
  }
}

/**
 * Fetches and displays migration notes from the repository.
 * Allows the user to select a specific migration guide to view.
 * @returns {Promise<void>}
 */
async function viewMigrationNotes() {
  log('Fetching migration notes...')
  try {
    // Fetch the guides folder
    const contents = await fetchJson(
      `${GITHUB_API_BASE}/repos/${REPO_OWNER}/${REPO_NAME}/contents/docs/migrations/guides`,
    )
    if (!Array.isArray(contents)) {
      log('No migration notes found or invalid response.', 'warn')
      return
    }

    const files = contents.filter(f => f.type === 'file' && f.name.endsWith('.md'))
    if (files.length === 0) {
      log('No migration documents found.', 'info')
      return
    }

    console.log('\nAvailable Migration Notes:')
    files.forEach((f, i) => console.log(`${i + 1}. ${f.name}`))

    const choice = await askQuestion('\nSelect a file number to view (or 0 to go back): ')
    const index = Number.parseInt(choice) - 1

    if (index >= 0 && index < files.length) {
      const file = files[index]
      log(`Fetching ${file.name}...`)
      // Fetch content
      // GitHub API returns content encoded in base64 usually, or we can use download_url
      const contentRes = await new Promise((resolve, reject) => {
        https.get(file.download_url, { headers: { 'User-Agent': 'Quick-Conf-CLI' } }, (res) => {
          let data = ''
          res.on('data', c => data += c)
          res.on('end', () => resolve(data))
        }).on('error', reject)
      })

      console.log(`\n${'='.repeat(50)}`)
      console.log(contentRes)
      console.log(`${'='.repeat(50)}\n`)
    }
  }
  catch (error) {
    log(`Failed to fetch migration notes: ${error.message}`, 'error')
  }
}

/**
 * Checks if the system meets the requirements for the CLI tool.
 * Specifically checks for the presence of the `tar` command.
 * Exits the process if requirements are not met.
 */
function checkRequirements() {
  try {
    execSync('tar --version', { stdio: 'ignore' })
  }
  catch {
    log('System "tar" command not found. This tool requires "tar" to extract files.', 'error')
    log('On Windows, ensure you are on Windows 10 or later.', 'error')
    process.exit(1)
  }
}

/**
 * The main entry point of the CLI application.
 * Displays the menu and handles user interaction.
 * @returns {Promise<void>}
 */
async function main() {
  console.log(`
   ___        _      _         ____             __     ____ _     ___
  / _ \\ _   _(_) ___| | __    / ___|___  _ __  / _|   / ___| |   |_ _|
 | | | | | | | |/ __| |/ /   | |   / _ \\| '_ \\| |_   | |   | |    | |
 | |_| | |_| | | (__|   <    | |__| (_) | | | |  _|  | |___| |___ | |
  \\__\\_\\\\__,_|_|\\___|_|\\_\\    \\____\\___/|_| |_|_|     \\____|_____|___|

  Quick Conf CLI v${CLI_VERSION}

`)

  checkRequirements()

  // Cleanup old update file if exists
  safeUnlink(`${__filename}.old`)

  log('Fetching version information...')
  const localCliVer = CLI_VERSION
  const remoteCliVer = await getRemoteCliVersion()
  const localProjVer = getLocalProjectVersion()
  let remoteProjVer = 'Unknown'
  try {
    const latestRelease = await fetchJson(`${GITHUB_API_BASE}/repos/${REPO_OWNER}/${REPO_NAME}/releases/latest`)
    remoteProjVer = latestRelease.tag_name
  }
  catch {
    // ignore
  }

  console.log('\nVersion Information:')
  console.log('--------------------------------------------------')
  console.log(`| ${'Component'.padEnd(20)} | ${'Local'.padEnd(10)} | ${'Remote'.padEnd(10)} |`)
  console.log('--------------------------------------------------')
  console.log(`| ${'CLI Tool'.padEnd(20)} | ${localCliVer.padEnd(10)} | ${remoteCliVer.padEnd(10)} |`)
  console.log(`| ${'Project Template'.padEnd(20)} | ${localProjVer.padEnd(10)} | ${remoteProjVer.padEnd(10)} |`)
  console.log('--------------------------------------------------')

  await selectPackageManager()

  await checkSelfUpdate(remoteCliVer)

  while (true) {
    console.log('\nMain Menu:')
    console.log('1. Fresh Installation')
    console.log('2. Update Template (Preserve Content)')
    console.log('3. View Migration Notes')
    console.log('4. Exit')

    const choice = await askQuestion('\nEnter your choice (1-4): ')

    switch (choice.trim()) {
      case '1':
        await freshInstall()
        break
      case '2':
        await updateTemplate()
        break
      case '3':
        await viewMigrationNotes()
        break
      case '4':
        log('Goodbye!')
        rl.close()
        process.exit(0)
        break
      default:
        log('Invalid choice, please try again.', 'warn')
    }
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
