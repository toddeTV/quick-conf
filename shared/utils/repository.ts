import type { RepositoryConfig } from '~/schemas/customConfigPlain'

interface RepositoryDetailsType {
  url: string
  icon: string
  label: string
}

/**
 * Returns all repository details (url, icon, label) based on the provider.
 * Supports GitHub and GitLab currently.
 *
 * @param config Repository configuration object
 * @returns An object containing url, icon, and label
 */
export function getRepositoryDetails(config: RepositoryConfig): RepositoryDetailsType {
  const { provider, owner, repo } = config

  const result: RepositoryDetailsType = {
    url: '#',
    icon: '',
    label: '',
  }

  if (!provider || !owner || !repo) {
    console.warn(`[getRepositoryDetails] Invalid repository config: provider, owner or repo is missing.`)
    return result
  }

  if (provider === 'github') {
    result.url = `https://github.com/${owner}/${repo}`
    result.icon = 'i-simple-icons-github'
    result.label = 'GitHub'
  }
  else if (provider === 'gitlab') {
    result.url = `https://gitlab.com/${owner}/${repo}`
    result.icon = 'i-simple-icons-gitlab'
    result.label = 'GitLab'
  }
  else {
    console.warn(`[getRepositoryDetails] Unsupported provider: ${provider} for repository ${owner}/${repo}`)
  }

  return result
}
