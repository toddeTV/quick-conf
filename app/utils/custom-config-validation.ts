import type { $ZodError, $ZodIssue } from 'zod/v4/core'

function formatIssuePath(issue: $ZodIssue): string {
  if (issue.path.length === 0) {
    return '(root)'
  }

  let path = ''

  for (const segment of issue.path) {
    if (typeof segment === 'number') {
      path += `[${segment}]`
      continue
    }

    path += path.length > 0 ? `.${String(segment)}` : String(segment)
  }

  return path
}

/**
 * Converts Zod issues into concise and readable lines for console warnings.
 */
export function formatCustomConfigValidationErrors(error: $ZodError): string {
  if (error.issues.length === 0) {
    return 'No validation details were reported by Zod.'
  }

  return error.issues
    .map((issue, index) => `${index + 1}. ${formatIssuePath(issue)}: ${issue.message}`)
    .join('\n')
}
