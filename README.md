# caktoy-cv

CV / personal site for Thony Hermawan. React + Vite + TypeScript, built to a static site.

## Develop

```bash
npm install
npm run dev
```

## Build and deploy

```bash
npm run build
```

Copy the contents of `dist/` (not the folder itself) into the root of the `caktoy.github.io` repo, replacing the old files, then commit and push. The build uses a relative base, so it works at the repo root.

## Edit content

All CV text (ID and EN) lives in `src/data/cv.ts`. Styling is in `src/styles.css`.
