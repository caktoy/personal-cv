// One-off: renders public/og-image.png (1200x630) for link previews. Run: node scripts/og.mjs
import sharp from 'sharp'

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#0b111a"/>
  <rect x="80" y="96" width="76" height="76" rx="20" fill="#7c96ff"/>
  <text x="118" y="149" font-family="Arial, Helvetica, sans-serif" font-weight="800" font-size="40" text-anchor="middle" fill="#0b111a">TH</text>
  <text x="80" y="330" font-family="Arial, Helvetica, sans-serif" font-weight="800" font-size="112" fill="#e8edf5">Thony</text>
  <text x="80" y="450" font-family="Arial, Helvetica, sans-serif" font-weight="800" font-size="112" fill="#7c96ff">Hermawan</text>
  <text x="84" y="528" font-family="Courier New, monospace" font-size="34" fill="#93a0b4">&gt; Software Engineer · Web · Mobile · Fullstack</text>
  <text x="84" y="580" font-family="Courier New, monospace" font-size="26" fill="#566378">caktoy.github.io</text>
</svg>`

await sharp(Buffer.from(svg)).png().toFile('public/og-image.png')
console.log('wrote public/og-image.png')
