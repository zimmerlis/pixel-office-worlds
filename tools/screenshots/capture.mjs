// Takes the README screenshots: one picture of the office per character world.
// Run from the repo root:
//   npm install --prefix tools/preview
//   node tools/screenshots/capture.mjs [world ...]
// Without arguments every world in characters/ is captured. Pictures land in
// assets/screenshots/<world>.png. Needs Chrome or Edge (set CHROME=<path> otherwise).
import { existsSync, mkdirSync, readdirSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { start, port } from './serve.mjs'

const here = dirname(fileURLToPath(import.meta.url))
const repo = resolve(here, '..', '..')
const puppeteer = createRequire(join(repo, 'tools', 'preview', 'node_modules', 'x.js'))('puppeteer-core')
const out = join(repo, 'assets', 'screenshots')
mkdirSync(out, { recursive: true })

const browsers = [
  process.env.CHROME,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome'
].filter(Boolean)
const executablePath = browsers.find(path => existsSync(path))
if (!executablePath) throw new Error('No Chrome or Edge found. Set CHROME=<path to the browser>.')

const all = readdirSync(join(repo, 'characters'), { withFileTypes: true })
  .filter(e => e.isDirectory() && !/^[._]/.test(e.name) && existsSync(join(repo, 'characters', e.name, 'sprites.json')))
  .map(e => e.name)
const worlds = process.argv.slice(2).length ? process.argv.slice(2) : all

const server = await start()
const browser = await puppeteer.launch({ executablePath, headless: true, args: ['--hide-scrollbars'] })
try {
  for (const world of worlds) {
    const page = await browser.newPage()
    await page.setViewport({ width: 1180, height: 1400, deviceScaleFactor: 2 })
    await page.goto(`http://localhost:${port}/shot.html?world=${encodeURIComponent(world)}`)
    // Wait until the desks show sprites (or the world has none) and every image has decoded.
    await page.waitForFunction(() => {
      const room = document.querySelector('.office-room')
      if (!room) return false
      const images = [...room.querySelectorAll('img')]
      return images.length > 0 && images.every(img => img.complete && img.naturalWidth > 0)
    }, { timeout: 60000 }).catch(() => console.warn(`${world}: sprites did not finish loading`))
    // Show the whole room instead of its scroll window, without the selected-desk button.
    await page.addStyleTag({ content: '.office-room{max-height:none!important;overflow:visible!important;flex:none!important}.office-home{display:none!important}' })
    await new Promise(ok => setTimeout(ok, 2500))
    const room = await page.$('.office-room')
    const file = join(out, `${world}.png`)
    await room.screenshot({ path: file })
    console.log(`saved ${file}`)
    await page.close()
  }
} finally {
  await browser.close()
  server.closeAllConnections()
  server.close()
}
