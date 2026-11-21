# Prototype

A single HTML page built from several sources.

| File | Contents |
| --- | --- |
| `app.html` | interface, styles and logic |
| `engine.js` | teaching engine (negamax with alpha-beta), run in a Web Worker |
| `board-prefs.js` | board themes, piece styles and validation of saved preferences |
| `lessons.js`, `puzzles.js`, `notation.js` | sample content (two items each) |
| `build.js` | joins the sources and writes `dist/index.html` |
| `test/` | unit tests (`node:test`) |

## Commands

```bash
npm ci        # install chess.js
npm test      # run the tests
node build.js # build dist/index.html
```

## Full content

`build.js` reads the full content from the folder given in `CONTENT_DIR`, if set. Otherwise it reads the sample files in this folder.

```bash
CONTENT_DIR=/path/to/content node build.js
```

## Deploy (Cloudflare Pages)

- Root directory: `prototipo`
- Build command: `npm ci && node build.js`
- Build output directory: `dist`

Outside claude.ai the AI answers, voice and dictation are not available. The page shows sample texts instead.
