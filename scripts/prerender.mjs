// Runs after the client + SSR builds: injects the rendered app into dist/index.html
// so crawlers see the full content without executing JavaScript.
import { readFileSync, writeFileSync, rmSync } from 'node:fs'
import { pathToFileURL } from 'node:url'
import { resolve } from 'node:path'

const { render } = await import(pathToFileURL(resolve('dist-ssr/entry-server.js')).href)
const indexPath = resolve('dist/index.html')
const html = readFileSync(indexPath, 'utf8')
const marker = '<div id="root"></div>'
if (!html.includes(marker)) throw new Error('prerender: root marker not found in dist/index.html')
writeFileSync(indexPath, html.replace(marker, `<div id="root">${render()}</div>`))

const today = new Date().toISOString().slice(0, 10)
writeFileSync(
  resolve('dist/sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>https://caktoy.github.io/</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>1.0</priority>\n  </url>\n</urlset>\n`,
)
rmSync(resolve('dist-ssr'), { recursive: true, force: true })
console.log('prerendered dist/index.html + sitemap.xml')
