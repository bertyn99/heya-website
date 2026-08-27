import { mergeAttributes, Node } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import GridColumnNodeView from '~/components/admin/editor/GridColumnNodeView.vue'

export const ContentGridColumn = Node.create({
  name: 'gridColumn',
  group: 'gridColumn',
  content: 'block+',
  defining: true,
  isolating: true,
  draggable: true,

  parseHTML() {
    return [{ tag: 'div[data-type="grid-column"]' }]
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      mergeAttributes({ 'data-type': 'grid-column' }, HTMLAttributes),
      0
    ]
  },

  addNodeView() {
    return VueNodeViewRenderer(GridColumnNodeView)
  },

  renderMarkdown: (node, h) => h.renderChildren(node.content || [], '\n\n')
})
