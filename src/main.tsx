import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/bricolage-grotesque'
import '@fontsource-variable/instrument-sans'
import '@fontsource-variable/jetbrains-mono'
import './styles.css'
import App from './App'

console.log(
  '%c> hello, fellow dev.%c\n  Curious how this was built? React + Vite + TypeScript. Say hi: thony.her@gmail.com',
  'color:#7c96ff;font:600 14px monospace',
  'font:12px monospace',
)

// The build ships prerendered HTML for crawlers; the client mounts over it.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
