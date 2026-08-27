import { joinURL } from 'ufo'
import { createOperationsGenerator, defineProvider } from '@nuxt/image/runtime'
import { toMediaAssetPath } from '#shared/media-url'

/**
 * Nuxt Image provider → IPX modifier URLs handled by jSquash (`/api/media/w_800,f_webp/…`).
 * Sharp / IPX do not run on Cloudflare Workers.
 * @see https://github.com/unjs/ipx
 */
const operationsGenerator = createOperationsGenerator({
  keyMap: {
    width: 'w',
    height: 'h',
    resize: 's',
    fit: 'fit',
    format: 'f',
    quality: 'q',
    enlarge: 'enlarge'
  },
  joinWith: ',',
  formatter: (key: string, value: string) => {
    if (key === 'enlarge' && (value === '' || value === 'true')) {
      return 'enlarge'
    }

    return `${key}_${value}`
  }
})

export default defineProvider<{ baseURL?: string }>({
  getImage(src, { modifiers, baseURL = '/api/media/' }) {
    const operations = operationsGenerator(modifiers)
    const publicKey = toMediaAssetPath(src)

    if (!operations) {
      return { url: joinURL(baseURL, publicKey) }
    }

    return {
      url: joinURL(baseURL, operations, publicKey)
    }
  }
})
