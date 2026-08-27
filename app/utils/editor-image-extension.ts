import { mergeAttributes, type Extension } from '@tiptap/core'
import Image from '@tiptap/extension-image'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import ImageNodeView from '~/components/admin/editor/ImageNodeView.vue'
import {
  contentImageClassList,
  isLikelyBrokenContentImageSrc
} from '#shared/content-image'

export const ContentImage = Image.extend({
  inline: false,
  group: 'block',

  addAttributes() {
    return {
      ...this.parent?.(),
      'data-broken': {
        default: null,
        parseHTML: element => element.getAttribute('data-broken'),
        renderHTML: (attributes) => {
          if (!attributes['data-broken']) {
            return {}
          }
          return { 'data-broken': attributes['data-broken'] }
        }
      }
    }
  },

  addNodeView() {
    return VueNodeViewRenderer(ImageNodeView as never)
  },

  renderHTML({ HTMLAttributes }) {
    const { class: _ignored, ...attrs } = HTMLAttributes as Record<string, unknown> & {
      class?: string
      title?: string | null
      src?: string | null
    }
    const src = typeof attrs.src === 'string' ? attrs.src : ''
    const likelyBroken = isLikelyBrokenContentImageSrc(src)

    return [
      'img',
      mergeAttributes(this.options.HTMLAttributes, attrs, {
        class: contentImageClassList(
          typeof attrs.title === 'string' ? attrs.title : null
        ),
        ...(likelyBroken ? { 'data-broken': 'true' } : {})
      })
    ]
  }
}) as Extension
