#!/usr/bin/env node

import { execSync, spawnSync } from 'node:child_process'
import fs from 'node:fs'
import https from 'node:https'
import os from 'node:os'
import path from 'node:path'
import process from 'node:process'
import readline from 'node:readline'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Ensure we are working in the script's directory
process.chdir(__dirname)

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
 * Checks if the current directory is empty (ignoring .git and the script itself).
 * @returns {boolean} True if empty, false otherwise.
 */
function checkDirectoryEmpty() {
  const files = fs.readdirSync(process.cwd())
  const allowed = ['.git', path.basename(__filename)]
  const others = files.filter(f => !allowed.includes(f))
  return others.length === 0
}

/**
 * Checks if the current directory is a clone of the template.
 * @returns {boolean} True if it is a template clone, false otherwise.
 */
function checkIsTemplateClone() {
  const pkgPath = path.join(process.cwd(), 'package.json')
  if (!fs.existsSync(pkgPath))
    return false
  try {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
    return pkg.isQuickConfTemplate === true
  }
  catch {
    return false
  }
}

/**
 * Deletes all files in the current directory except .git and the script itself.
 * @param {string[]} additionalAllowed - Additional files/folders to preserve.
 */
function clearDirectory(additionalAllowed = []) {
  // Safety check: ensure we're not in a dangerous location
  const cwd = path.resolve(process.cwd())
  const home = path.resolve(os.homedir())
  const { root } = path.parse(cwd)
  if (cwd === home || cwd === root) {
    log('Error: Cannot clear directory in home or root directory', 'error')
    process.exit(1)
  }

  // Read and delete files and folders
  const files = fs.readdirSync(process.cwd())
  const allowed = ['.git', path.basename(__filename), ...additionalAllowed]
  for (const file of files) {
    if (allowed.includes(file))
      continue
    fs.rmSync(path.join(process.cwd(), file), { recursive: true, force: true })
  }
}

/**
 * Recursively replaces a string in all files within a directory.
 * @param {string} dir - The directory to search in.
 * @param {string} search - The string to search for.
 * @param {string} replacement - The string to replace with.
 */
function replaceStringInDirectory(dir, search, replacement) {
  if (!fs.existsSync(dir))
    return
  const files = fs.readdirSync(dir)
  for (const file of files) {
    const filePath = path.join(dir, file)
    const stat = fs.lstatSync(filePath)
    if (stat.isSymbolicLink()) {
      continue
    }
    if (stat.isDirectory()) {
      replaceStringInDirectory(filePath, search, replacement)
    }
    else {
      try {
        let content = fs.readFileSync(filePath, 'utf-8')
        if (content.includes(search)) {
          content = content.replaceAll(search, replacement)
          fs.writeFileSync(filePath, content, 'utf-8')
        }
      }
      catch {
        // ignore binary files or errors
      }
    }
  }
}

/**
 * Removes repository metadata files and folders that should not be in the final project.
 * (Steps 3 & 4 of the flow)
 */
function removeRepoFiles() {
  log('Removing repository files (docs, content, public, etc.)...', 'info')
  const folders = [
    '.github',
    'content',
    'docs',
    'public',
  ]
  const files = [
    '.coderabbit.yml',
    '.release-please-manifest.json',
    'CONTRIBUTING.md',
    'LICENSE.md',
    'README.md',
    'release-please-config.json',
    'renovate.json',
  ]

  for (const folder of folders) {
    const itemPath = path.join(process.cwd(), folder)
    if (fs.existsSync(itemPath)) {
      fs.rmSync(itemPath, { recursive: true, force: true })
    }
  }
  for (const file of files) {
    const itemPath = path.join(process.cwd(), file)
    if (fs.existsSync(itemPath)) {
      try {
        fs.unlinkSync(itemPath)
      }
      catch (e) {
        log(`Failed to delete ${file}: ${e.message}`, 'warn')
      }
    }
  }
}

/**
 * Applies the template starter content by moving it to the root.
 * (Steps 5, 6, 7 of Fresh Install flow)
 * @param {string} [projectName] - The project name to replace placeholders with.
 */
function applyTemplateStarter(projectName) {
  const starterPath = path.join(process.cwd(), 'template-starter')
  if (!fs.existsSync(starterPath)) {
    log('No template-starter found; skipping starter setup', 'info')
    return
  }

  log('Setting up starter content...', 'info')

  if (projectName) {
    log(`Replacing placeholders with "${projectName}"...`, 'info')
    replaceStringInDirectory(starterPath, 'ConferenceNamePlaceholder', projectName)
  }

  // Step 5: Check collisions and delete in root
  const items = fs.readdirSync(starterPath)
  for (const item of items) {
    const rootPath = path.join(process.cwd(), item)
    if (fs.existsSync(rootPath)) {
      fs.rmSync(rootPath, { recursive: true, force: true })
    }
  }

  // Step 6: Move files
  for (const item of items) {
    const src = path.join(starterPath, item)
    const dest = path.join(process.cwd(), item)
    fs.renameSync(src, dest)
  }

  // Step 7: Delete folder
  fs.rmSync(starterPath, { recursive: true, force: true })
  log('Starter content set up.', 'info')
}

/**
 * Deletes package manager lock files to ensure a fresh dependency resolution.
 */
function deleteLockFiles() {
  const lockFiles = ['package-lock.json', 'yarn.lock', 'pnpm-lock.yaml', 'bun.lockb']
  for (const file of lockFiles) {
    const filePath = path.join(process.cwd(), file)
    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath)
      }
      catch {
        // ignore
      }
    }
  }
  log('Deleted existing lock files to ensure fresh installation.', 'info')
}

/**
 * Prompts the user to install dependencies.
 * @returns {Promise<void>}
 */
async function promptInstallDependencies() {
  const installDeps = await askQuestion(`Do you want to run "${PACKAGE_MANAGER} install"? (y/N): `)
  if (installDeps.toLowerCase() === 'y') {
    const cmd = `${PACKAGE_MANAGER} install`
    log(`Running ${cmd} ...`)
    try {
      execSync(cmd, { stdio: 'inherit' })
    }
    catch (e) {
      log(`Failed to run install: ${e.message}`, 'error')
    }
  }
  else {
    log('Warning: Dependencies not installed.', 'warn')
    log('A lock file is required for stable builds and dependencies are needed to run the app.', 'warn')
    log(`Please run "${PACKAGE_MANAGER} install" manually to generate a lock file.`, 'warn')
  }
}

/**
 * Configures the project by asking for the name and clearing metadata.
 * @returns {Promise<string|null>} The user entered project name.
 */
async function configureProject() {
  log('Configuring project...', 'info')
  const pkgPath = path.join(process.cwd(), 'package.json')
  if (!fs.existsSync(pkgPath)) {
    log('package.json not found, skipping configuration.', 'warn')
    return null
  }

  let pkg
  try {
    pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
  }
  catch (e) {
    log(`Failed to parse package.json: ${e.message}`, 'error')
    return null
  }

  const rawInput = await askQuestion('Enter the name of your project: ')
  const cleanedProjectName = rawInput.trim().replace(/\s+/g, ' ')

  if (!cleanedProjectName) {
    log('Project name cannot be empty.', 'error')
    return null
  }

  const pkgName = cleanedProjectName
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')

  if (!pkgName) {
    log('Project name yields an invalid package.json name.', 'error')
    return null
  }

  // Update package.json fields
  pkg.name = pkgName
  pkg.author = ''
  pkg.contributors = []
  pkg.description = ''
  pkg.repository = {}
  pkg.bugs = {}
  pkg.keywords = []
  delete pkg.isQuickConfTemplate

  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2))
  log(`Updated package.json with name "${pkgName}" and cleared metadata.`, 'success')

  return cleanedProjectName
}

/**
 * Displays the license compliance warning.
 */
async function showLicenseWarning() {
  console.log(`\n${'='.repeat(50)}`)
  log('LICENSE COMPLIANCE WARNING', 'warn')
  console.log('='.repeat(50))
  console.log('The \'/content\' and \'/public\' folders in this template contain example data,')
  console.log('including images and text, which are not covered under the MIT license of the code.')
  console.log('\nImportant: You must replace all example content in \'/content\' and \'/public\'')
  console.log('folders with your own assets and information to ensure you are not infringing')
  console.log('on any copyrights or usage rights associated with the placeholder data.')
  console.log('\nNote: The file \'public/custom-styles.css\' must exist.')
  console.log(`${'='.repeat(50)}\n`)

  await askQuestion('Press Enter to confirm you have read and understood this warning...')
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
 * @param {boolean} isTemplateClone - Whether we are installing over a template clone.
 * @returns {Promise<void>}
 */
async function freshInstall(isTemplateClone = false) {
  if (isTemplateClone) {
    log('Detected "Fresh Installation after using the Template on GitHub".', 'info')
    if (!checkIsTemplateClone()) {
      log('Error: Current directory does not appear to be a valid template clone', 'error')
      log('(wrong name or version in package.json).', 'error')
      return
    }
    const answer = await askQuestion(
      'This will DELETE ALL FILES in the current directory (except .git and this script) '
      + 'and install the latest release. Continue? (y/N): ',
    )
    if (answer.toLowerCase() !== 'y')
      return

    log('Clearing directory...', 'warn')
    // Step 1: Clear directory
    clearDirectory()
  }
  else {
    log('Detected "Fresh Installation in an empty folder".', 'info')
    log('Checking if directory is empty...', 'info')
    if (!checkDirectoryEmpty()) {
      log('Error: Directory is not empty. Please run this in an empty folder (except .git and this script).', 'error')
      return
    }
    const answer = await askQuestion(
      'This will download the latest release into the current directory. Continue? (y/N): ',
    )
    if (answer.toLowerCase() !== 'y')
      return
  }

  try {
    // Step 2: Download Everything
    log('Fetching latest release info...')
    const latestRelease = await fetchJson(`${GITHUB_API_BASE}/repos/${REPO_OWNER}/${REPO_NAME}/releases/latest`)
    const tarballUrl = latestRelease.tarball_url

    log(`Downloading release ${latestRelease.tag_name}...`)
    const tempTar = path.join(__dirname, 'temp_install.tar.gz')
    await downloadFile(tarballUrl, tempTar)

    const tempDir = path.join(__dirname, '.install_temp')
    if (fs.existsSync(tempDir))
      fs.rmSync(tempDir, { recursive: true, force: true })
    fs.mkdirSync(tempDir)

    log('Extracting...')
    extractTarball(tempTar, tempDir)
    fs.unlinkSync(tempTar)

    log('Installing files...')
    const extractedFiles = fs.readdirSync(tempDir)
    for (const file of extractedFiles) {
      if (file === 'quick-conf-cli.mjs')
        continue // Skip overwriting the CLI tool

      const src = path.join(tempDir, file)
      const dest = path.join(process.cwd(), file)
      // Move to root
      fs.renameSync(src, dest)
    }

    // Cleanup
    fs.rmSync(tempDir, { recursive: true, force: true })
    log('Installation files downloaded.', 'success')

    const projectName = await configureProject()

    if (!projectName)
      throw new Error('Project configuration failed.')

    // Step 3 & 4: Remove Repo Files
    removeRepoFiles()

    // Step 5, 6, 7: Apply Template Starter
    applyTemplateStarter(projectName)

    await showLicenseWarning()

    deleteLockFiles()
    await promptInstallDependencies()

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

  // Step 1: Backup to .update_temp
  const updateTemp = path.join(__dirname, '.update_temp')

  if (fs.existsSync(updateTemp))
    fs.rmSync(updateTemp, { recursive: true, force: true })
  fs.mkdirSync(updateTemp)
  const backupDir = path.join(updateTemp, 'backup')
  fs.mkdirSync(backupDir)

  log('Backing up user files...', 'info')

  const moveIfExists = (srcRel, destRel) => {
    const src = path.join(process.cwd(), srcRel)
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

  // Preserve user content based on "Preserve Map" strategy
  moveIfExists('.github', '.github')
  moveIfExists('content', 'content')
  moveIfExists('public', 'public')
  moveIfExists('.env', '.env')
  moveIfExists('LICENSE.md', 'LICENSE.md')
  moveIfExists('README.md', 'README.md')
  // Preserve configuration files
  moveIfExists('.gitignore', '.gitignore')
  moveIfExists('.npmrc', '.npmrc')
  moveIfExists('.vscode/settings.json', '.vscode/settings.json')

  // Handle package.json metadata separately later, but we need to read it now
  let oldPkg = null
  const pkgPath = path.join(process.cwd(), 'package.json')
  if (fs.existsSync(pkgPath)) {
    try {
      oldPkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
    }
    catch (e) {
      log(`Could not read current package.json: ${e.message}`, 'warn')
    }
  }

  // Step 2: Clear root (except cli, .git, .update_temp)
  log('Clearing directory for update...', 'warn')
  clearDirectory(['.update_temp'])

  try {
    // Step 3: Download Everything
    log('Fetching latest release info...')
    const latestRelease = await fetchJson(`${GITHUB_API_BASE}/repos/${REPO_OWNER}/${REPO_NAME}/releases/latest`)
    const tarballUrl = latestRelease.tarball_url

    const tempTar = path.join(updateTemp, 'temp_update.tar.gz')
    log(`Downloading release ${latestRelease.tag_name}...`)
    await downloadFile(tarballUrl, tempTar)

    const extractDir = path.join(updateTemp, 'extracted')
    fs.mkdirSync(extractDir)
    log(`Extracting release ${latestRelease.tag_name}...`)
    extractTarball(tempTar, extractDir)
    fs.unlinkSync(tempTar)

    // Move extracted files to root
    const extractedFiles = fs.readdirSync(extractDir)
    for (const file of extractedFiles) {
      if (file === 'quick-conf-cli.mjs')
        continue

      const src = path.join(extractDir, file)
      const dest = path.join(process.cwd(), file)
      fs.renameSync(src, dest)
    }

    // Step 4: Remove Repo Files AND template-starter
    removeRepoFiles()
    const starterPath = path.join(process.cwd(), 'template-starter')
    if (fs.existsSync(starterPath)) {
      fs.rmSync(starterPath, { recursive: true, force: true })
    }

    // Step 5: Restore package.json metadata
    if (oldPkg) {
      const newPkgPath = path.join(process.cwd(), 'package.json')
      if (fs.existsSync(newPkgPath)) {
        try {
          const newPkg = JSON.parse(fs.readFileSync(newPkgPath, 'utf-8'))
          newPkg.name = oldPkg.name
          newPkg.author = oldPkg.author
          newPkg.contributors = oldPkg.contributors
          newPkg.description = oldPkg.description
          newPkg.keywords = oldPkg.keywords
          newPkg.bugs = oldPkg.bugs
          newPkg.repository = oldPkg.repository
          delete newPkg.isQuickConfTemplate
          fs.writeFileSync(newPkgPath, JSON.stringify(newPkg, null, 2))
          log('Restored project metadata.', 'success')
        }
        catch (e) {
          log(`Failed to restore project metadata: ${e.message}`, 'error')
        }
      }
    }

    // Step 6 & 7: Restore Backup
    log('Restoring user files...')
    const backupItems = fs.readdirSync(backupDir)
    for (const item of backupItems) {
      // Step 6: Delete collisions from root (clean slate matching backup)
      const rootPath = path.join(process.cwd(), item)
      if (fs.existsSync(rootPath)) {
        fs.rmSync(rootPath, { recursive: true, force: true })
      }
    }
    // Step 7: Move backup to root
    for (const item of backupItems) {
      const src = path.join(backupDir, item)
      const dest = path.join(process.cwd(), item)
      fs.renameSync(src, dest)
    }

    // Step 8: Delete .update_temp
    fs.rmSync(updateTemp, { recursive: true, force: true })

    deleteLockFiles()
    await promptInstallDependencies()

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
    console.log('1. Fresh Installation in an empty folder')
    console.log('2. Fresh Installation after using the Template on GitHub')
    console.log('3. Update Template (Preserve Content)')
    console.log('4. View Migration Notes')
    console.log('5. Exit')

    const choice = await askQuestion('\nEnter your choice (1-5): ')

    switch (choice.trim()) {
      case '1':
        await freshInstall(false)
        break
      case '2':
        await freshInstall(true)
        break
      case '3':
        await updateTemplate()
        break
      case '4':
        await viewMigrationNotes()
        break
      case '5':
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
