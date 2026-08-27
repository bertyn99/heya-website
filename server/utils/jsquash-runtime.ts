import { init as initJpegDecode } from '@jsquash/jpeg/decode'
import { init as initJpegEncode } from '@jsquash/jpeg/encode'
import { init as initPngDecode } from '@jsquash/png/decode'
import { init as initPngEncode } from '@jsquash/png/encode'
import { initResize } from '@jsquash/resize'
import { init as initWebpDecode } from '@jsquash/webp/decode'
import { init as initWebpEncode } from '@jsquash/webp/encode'
import { simd } from 'wasm-feature-detect'

/**
 * @jsquash loads `.wasm` via `fetch(new URL('…', import.meta.url))`.
 * Node cannot fetch `file://`. Cloudflare Workers also fail to fetch sibling
 * wasm unless Nitro inlines it. Always pass a compiled `WebAssembly.Module`.
 *
 * @see https://github.com/jamsinclair/jSquash/tree/main/examples/cloudflare-worker-esm-format
 */

let ready: Promise<void> | null = null

function isCloudflareWorker() {
  const cachesBinding = (globalThis as { caches?: { default?: unknown } }).caches
  return typeof cachesBinding?.default !== 'undefined'
}

function isNodeRuntime() {
  return typeof process === 'object'
    && process.release?.name === 'node'
    && !isCloudflareWorker()
}

async function loadWasmFromPackage(packagePath: string): Promise<WebAssembly.Module> {
  const { readFile } = await import('node:fs/promises')
  const { createRequire } = await import('node:module')
  const require = createRequire(import.meta.url)
  const filePath = require.resolve(packagePath)
  return WebAssembly.compile(await readFile(filePath))
}

async function importWasmModule(specifier: string): Promise<WebAssembly.Module> {
  const loaded = await import(specifier) as { default?: WebAssembly.Module }
  if (loaded.default) {
    return loaded.default
  }
  return loaded as unknown as WebAssembly.Module
}

const WASM_PATHS = {
  jpegDec: '@jsquash/jpeg/codec/dec/mozjpeg_dec.wasm',
  jpegEnc: '@jsquash/jpeg/codec/enc/mozjpeg_enc.wasm',
  png: '@jsquash/png/codec/pkg/squoosh_png_bg.wasm',
  webpDec: '@jsquash/webp/codec/dec/webp_dec.wasm',
  webpEncSimd: '@jsquash/webp/codec/enc/webp_enc_simd.wasm',
  webpEnc: '@jsquash/webp/codec/enc/webp_enc.wasm',
  resize: '@jsquash/resize/lib/resize/pkg/squoosh_resize_bg.wasm'
} as const

async function loadWasmModules() {
  const load = isNodeRuntime() ? loadWasmFromPackage : importWasmModule

  const [jpegDec, jpegEnc, png, webpDec, webpEncSimd, webpEnc, resize] = await Promise.all([
    load(WASM_PATHS.jpegDec),
    load(WASM_PATHS.jpegEnc),
    load(WASM_PATHS.png),
    load(WASM_PATHS.webpDec),
    load(WASM_PATHS.webpEncSimd),
    load(WASM_PATHS.webpEnc),
    load(WASM_PATHS.resize)
  ])

  return { jpegDec, jpegEnc, png, webpDec, webpEncSimd, webpEnc, resize }
}

export function ensureJsquashRuntime(): Promise<void> {
  if (!ready) {
    ready = (async () => {
      const modules = await loadWasmModules()
      const webpEncModule = (await simd()) ? modules.webpEncSimd : modules.webpEnc

      await Promise.all([
        initJpegDecode(modules.jpegDec),
        initJpegEncode(modules.jpegEnc),
        initPngDecode(modules.png),
        initPngEncode(modules.png),
        initWebpDecode(modules.webpDec),
        initWebpEncode(webpEncModule),
        initResize(modules.resize)
      ])
    })().catch((error) => {
      ready = null
      throw error
    })
  }

  return ready
}
