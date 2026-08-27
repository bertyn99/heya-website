import {
  blockSchemas,
  type BlockType,
  type PageBlock
} from '../schemas/blocks'
import { BLOCK_CATALOG } from './block-catalog'

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

function parseFlatYaml(raw: string): Record<string, unknown> {
  const out: Record<string, unknown> = {}

  for (const line of raw.split('\n')) {
    const match = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/)
    if (!match) {
      continue
    }

    let value = match[2]!.trim()
    if (
      (value.startsWith('"') && value.endsWith('"'))
      || (value.startsWith('\'') && value.endsWith('\''))
    ) {
      value = value.slice(1, -1)
    }

    out[match[1]!] = value
  }

  return out
}

function parsePropsObject(raw: string): Record<string, unknown> {
  if (!raw) {
    return {}
  }

  if (raw.startsWith('{')) {
    const parsed: unknown = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      throw new Error('Les props de bloc doivent être un objet JSON')
    }
    return parsed as Record<string, unknown>
  }

  return parseFlatYaml(raw)
}

function parseFenceBody(inner: string, strict: boolean): { props: Record<string, unknown>, body: string } {
  const trimmed = inner.trim()

  if (!trimmed.startsWith('---')) {
    return { props: {}, body: trimmed }
  }

  const afterOpen = trimmed.slice(3).replace(/^\s*\n/, '')
  const close = afterOpen.search(/\n---\s*(?:\n|$)/)

  if (close < 0) {
    if (strict) {
      throw new Error('Frontmatter de bloc non fermé (---)')
    }
    return { props: {}, body: trimmed }
  }

  const raw = afterOpen.slice(0, close).trim()
  const rest = afterOpen.slice(close).replace(/^\n---\s*/, '').trim()

  if (!raw) {
    return { props: {}, body: rest }
  }

  try {
    return { props: parsePropsObject(raw), body: rest }
  } catch (error) {
    if (strict) {
      throw error
    }
    return { props: {}, body: rest }
  }
}

export function comarkToBlocks(markdown: string, options?: { strict?: boolean }): PageBlock[] {
  const strict = options?.strict ?? false
  const source = markdown.replace(/\r\n/g, '\n').trim()

  if (!source) {
    return []
  }

  const blocks: PageBlock[] = []

  for (const match of source.matchAll(BLOCK_RE)) {
    const name = match[1]!
    const inner = match[2] ?? ''

    if (!isBlockType(name)) {
      if (strict) {
        throw new Error(`Bloc Comark inconnu: ${name}`)
      }
      continue
    }

    let parsedInner: { props: Record<string, unknown>, body: string }
    try {
      parsedInner = parseFenceBody(inner, strict)
    } catch (error) {
      if (strict) {
        throw error
      }
      continue
    }

    const parsedProps = blockSchemas[name].safeParse({
      ...BLOCK_CATALOG[name].defaults,
      ...parsedInner.props
    })

    if (!parsedProps.success) {
      if (strict) {
        throw parsedProps.error
      }
      continue
    }

    blocks.push({
      type: name,
      props: parsedProps.data,
      ...(parsedInner.body ? { body: parsedInner.body } : {})
    } as PageBlock)
  }

  if (strict && source && blocks.length === 0) {
    throw new Error('Aucun bloc Comark (::nom … ::) trouvé')
  }

  return blocks
}
