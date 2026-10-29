// Local server for the screenshot page. It builds shot.js with esbuild and
// answers the plugin's file requests (readDir, readFileText, readFileDataUrl)
// from this repository, read-only and limited to the repository folder.
// Run: node tools/screenshots/serve.mjs   (needs `npm install` in tools/preview)
import { createServer } from 'node:http'
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join, resolve, sep, extname } from 'node:path'
import { createRequire } from 'node:module'

const here = dirname(fileURLToPath(import.meta.url))
const repo = resolve(here, '..', '..')
const previewModules = join(repo, 'tools', 'preview', 'node_modules')
const { build } = createRequire(join(previewModules, 'x.js'))('esbuild')
export const port = Number(process.env.PORT || 4878)

const MIME = { '.gif': 'image/gif', '.png': 'image/png', '.webp': 'image/webp', '.apng': 'image/apng', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml' }

async function bundle() {
  const out = await build({
    entryPoints: [join(here, 'shot.js')], bundle: true, write: false, format: 'esm',
    nodePaths: [previewModules], alias: { '@hermes/plugin-sdk': join(here, 'sdk.js') }, logLevel: 'error'
  })
  return out.outputFiles[0].text
}

const css = readFileSync(join(repo, 'tools', 'preview', 'live-build.mjs'), 'utf8').match(/<style>([\s\S]*?)<\/style>/)[1]
const page = `<!doctype html><html><head><meta charset="utf-8"><title>Pixel Office Worlds</title><style>${css}#app{height:100%}</style></head><body><div id="app"></div><script type="module" src="shot-bundle.js"></script></body></html>`

function inRepo(rel) {
  const full = resolve(repo, rel || '.')
  if (full !== repo && !full.startsWith(repo + sep)) throw new Error('outside repo')
  return full
}

const json = (res, code, body) => { res.writeHead(code, { 'content-type': 'application/json', 'cache-control': 'no-store' }); res.end(JSON.stringify(body)) }

export function start() {
  let code = null
  const server = createServer(async (req, res) => {
    const url = new URL(req.url, 'http://x')
    try {
      if (url.pathname === '/' || url.pathname === '/shot.html') {
        res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' })
        return res.end(page)
      }
      if (url.pathname === '/shot-bundle.js') {
        code ||= await bundle()
        res.writeHead(200, { 'content-type': 'text/javascript', 'cache-control': 'no-store' })
        return res.end(code)
      }
      const path = inRepo(url.searchParams.get('path'))
      if (url.pathname === '/api/readDir') {
        const entries = readdirSync(path).map(name => ({ name, isDirectory: statSync(join(path, name)).isDirectory() }))
        return json(res, 200, { entries })
      }
      if (url.pathname === '/api/readFileText') return json(res, 200, { text: readFileSync(path, 'utf8') })
      if (url.pathname === '/api/readFileDataUrl') {
        const mime = MIME[extname(path).toLowerCase()] || 'application/octet-stream'
        return json(res, 200, { url: `data:${mime};base64,${readFileSync(path).toString('base64')}` })
      }
      json(res, 404, { error: 'not found' })
    } catch (error) {
      json(res, 404, { error: String(error.message || error) })
    }
  })
  return new Promise(ok => server.listen(port, '127.0.0.1', () => ok(server)))
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await start()
  console.log(`screenshot page on http://localhost:${port}/shot.html?world=animals`)
}
