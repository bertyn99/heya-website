import { blocksToComark, comarkToBlocks } from '#shared/content/comark-blocks'
import { createPageBlock, getBlockDefinition } from '#shared/content/block-catalog'
import type { BlockType, PageBlock } from '#shared/schemas/blocks'

export interface EditorBlock {
  id: string
  type: BlockType
  props: Record<string, unknown>
  body?: string
}

export type CanvasDevice = 'desktop' | 'tablet' | 'mobile'

export const CANVAS_DEVICE_WIDTH: Record<CanvasDevice, string> = {
  desktop: '100%',
  tablet: '768px',
  mobile: '390px'
}

function newBlockId() {
  return crypto.randomUUID()
}

export function toEditorBlock(block: PageBlock): EditorBlock {
  return {
    id: newBlockId(),
    type: block.type,
    props: { ...(block.props as Record<string, unknown>) },
    ...(block.body ? { body: block.body } : {})
  }
}

export function createEditorBlock(type: BlockType): EditorBlock {
  return toEditorBlock(createPageBlock(type))
}

export function markdownToEditorBlocks(markdown: string): EditorBlock[] {
  return comarkToBlocks(markdown).map(toEditorBlock)
}

export function editorBlocksToPageBlocks(blocks: EditorBlock[]): PageBlock[] {
  return blocks.map((block) => {
    const created = createPageBlock(block.type)
    return {
      type: block.type,
      props: { ...created.props, ...block.props },
      ...(block.body || created.body ? { body: block.body ?? created.body } : {})
    } as PageBlock
  })
}

export function editorBlocksToMarkdown(blocks: EditorBlock[]): string {
  return blocksToComark(editorBlocksToPageBlocks(blocks))
}

export function cloneEditorBlock(block: EditorBlock): EditorBlock {
  return {
    id: newBlockId(),
    type: block.type,
    props: structuredClone(block.props),
    ...(block.body ? { body: block.body } : {})
  }
}

export function blockLabel(type: BlockType) {
  return getBlockDefinition(type).label
}

export function moveEditorBlock(blocks: EditorBlock[], from: number, to: number): EditorBlock[] {
  if (from === to || from < 0 || to < 0 || from >= blocks.length || to >= blocks.length) {
    return blocks
  }

  const next = [...blocks]
  const [item] = next.splice(from, 1)
  if (!item) {
    return blocks
  }
  next.splice(to, 0, item)
  return next
}

export function reorderEditorBlock(
  blocks: EditorBlock[],
  from: number,
  overIndex: number,
  edge: 'before' | 'after'
): EditorBlock[] {
  if (from < 0 || from >= blocks.length || overIndex < 0 || overIndex >= blocks.length) {
    return blocks
  }

  const next = [...blocks]
  const [item] = next.splice(from, 1)
  if (!item) {
    return blocks
  }

  let dest = edge === 'after' ? overIndex + 1 : overIndex
  if (from < dest) {
    dest -= 1
  }

  dest = Math.max(0, Math.min(dest, next.length))
  next.splice(dest, 0, item)
  return next
}
