// Screenshot page: the real plugin with a stand-in for Hermes Desktop's file API,
// so the character worlds in characters/ load exactly as they do in the app.
// URL: shot.html?world=<set id>&mode=sprites|icons|avatars
import { createRoot } from 'react-dom/client'

const params = new URLSearchParams(location.search)
const ROOT = '/plugins'
const DIR = `${ROOT}/office`
const rel = path => String(path).replace(/\\/g, '/').replace(DIR, '').replace(/^\/+/, '')
const api = (kind, path) => fetch(`/api/${kind}?path=${encodeURIComponent(rel(path))}`).then(r => (r.ok ? r.json() : Promise.reject(new Error(`${kind} ${path}`))))

window.hermesDesktop = {
  desktopPluginsRoot: async () => ROOT,
  readDir: async path => {
    if (path === ROOT) return { entries: [{ name: 'office', isDirectory: true, path: DIR }] }
    const { entries } = await api('readDir', path)
    // Load only the shown world: loading every set takes a long time.
    const shown = rel(path) === 'characters' && params.get('world') ? entries.filter(e => e.name === params.get('world')) : entries
    return { entries: shown.map(e => ({ ...e, path: `${path}/${e.name}` })) }
  },
  readFileText: path => api('readFileText', path),
  readFileDataUrl: path => api('readFileDataUrl', path).then(r => r.url)
}

const prefs = {
  spriteMode: params.get('mode') || 'sprites',
  spriteWorld: params.get('world') || '',
  spriteAssign: {},
  hintStage: 'done'
}
const storage = new Map(Object.entries(prefs))

const { default: plugin } = await import('../../plugin.js')
plugin.register({
  storage: { get: (key, fallback) => (storage.has(key) ? storage.get(key) : fallback), set: (key, value) => storage.set(key, value) },
  register: entry => { if (entry.area === 'route') createRoot(document.querySelector('#app')).render(entry.render()) },
  onDispose: () => {}
})
if (params.get('theme') === 'dark') document.documentElement.classList.add('dark')
