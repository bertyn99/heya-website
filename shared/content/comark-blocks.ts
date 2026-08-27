import {
  blockSchemas,
  type BlockType,
  type PageBlock
} from '../schemas/blocks'

const BLOCK_RE = /^::([a-z0-9-]+)\s*\n([\s\S]*?)^::$/gm

function isBlockType(name: string): name is BlockType {
  return name in blockSchemas
}

function stringifyProps(props: Record<string, unknown>) {
  const serializable = Object.fromEntries(
    Object.entries(props).filter(([, value]) => value !== undefined)
  )

  if (Object.keys(serializable).length === 0) {
    return ''
  }

  return `---\n${JSON.stringify(serializable, null, 2)}\n---\n`
}

export function blocksToComark(blocks: PageBlock[]) {
  return blocks.map((block) => {
    const props = { ...block.props } as Record<string, unknown>
    const yaml = stringifyProps(props)
    const body = (block.body ?? '').trim()

    if (body) {
      return `::${block.type}\n${yaml}${body}\n::`
    }

    return `::${block.type}\n${yaml}::`
  }).join('\n\n')
}

function parseFenceBody(inner: string): { props: Record<string, unknown>, body: string } {
  const trimmed = inner.trim()

  if (!trimmed.startsWith('---')) {
    return { props: {}, body: trimmed }
  }

  const afterOpen = trimmed.slice(3).replace(/^\s*\n/, '')
  const close = afterOpen.search(/\n---\s*(?:\n|$)/)

  if (close < 0) {
    throw new Error('Frontmatter de bloc non fermé (---)')
  }

  const raw = afterOpen.slice(0, close).trim()
  const rest = afterOpen.slice(close).replace(/^\n---\s*/, '').trim()

  if (!raw) {
    return { props: {}, body: rest }
  }

  const parsed: unknown = JSON.parse(raw)

  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    throw new Error('Les props de bloc doivent être un objet JSON')
  }

  return { props: parsed as Record<string, unknown>, body: rest }
}

export function comarkToBlocks(markdown: string): PageBlock[] {
  const source = markdown.replace(/\r\n/g, '\n').trim()

  if (!source) {
    return []
  }

  const blocks: PageBlock[] = []

  for (const match of source.matchAll(BLOCK_RE)) {
    const name = match[1]!
    const inner = match[2] ?? ''

    if (!isBlockType(name)) {
      throw new Error(`Bloc Comark inconnu: ${name}`)
    }

    const { props, body } = parseFenceBody(inner)
    const parsedProps = blockSchemas[name].parse(props)

    blocks.push({
      type: name,
      props: parsedProps,
      ...(body ? { body } : {})
    } as PageBlock)
  }

  if (blocks.length === 0) {
    throw new Error('Aucun bloc Comark (::nom … ::) trouvé')
  }

  return blocks
}
