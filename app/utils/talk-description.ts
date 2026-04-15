interface TalkBodyNode {
  children?: TalkBodyNode[]
  tag?: string
  type?: string
  value?: string
}

function flattenText(node?: TalkBodyNode): string {
  if (!node) {
    return ''
  }

  if (node.type === 'text' && typeof node.value === 'string') {
    return node.value
  }

  return (node.children ?? []).map(flattenText).join(' ')
}

function findFirstParagraph(node?: TalkBodyNode): TalkBodyNode | undefined {
  if (!node) {
    return undefined
  }

  if (node.type === 'element' && node.tag === 'p') {
    return node
  }

  for (const child of node.children ?? []) {
    const paragraph = findFirstParagraph(child)
    if (paragraph) {
      return paragraph
    }
  }

  return undefined
}

export function extractTalkDescription(body: unknown): string {
  if (!body || typeof body !== 'object') {
    return 'No description available.'
  }

  const rootNode = body as TalkBodyNode
  const paragraph = findFirstParagraph(rootNode)
  const text = flattenText(paragraph).replace(/\s+/g, ' ').trim()

  if (text) {
    return text
  }

  const fallbackText = flattenText(rootNode).replace(/\s+/g, ' ').trim()

  if (!fallbackText) {
    return 'No description available.'
  }

  return fallbackText
}
