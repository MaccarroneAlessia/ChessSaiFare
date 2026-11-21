// Builds dist/index.html by inlining the sources into app.html.
// Full content comes from CONTENT_DIR (or ../contenuti); otherwise the sample files here are used.
const fs = require('fs');
const path = require('path');

const here = __dirname;
const contentDir = process.env.CONTENT_DIR || path.join(here, '..', 'contenuti');
const contentFile = (name) => {
  const p = path.join(contentDir, name);
  return fs.existsSync(p) ? p : path.join(here, name);
};

let html = fs.readFileSync(path.join(here, 'app.html'), 'utf8');
const inline = (key, file) => {
  const src = fs.readFileSync(file, 'utf8');
  if (src.includes('</script')) throw new Error(`${file} contains </script`);
  html = html.replace(`/*${key}*/`, () => src);
};

inline('CHESS', path.join(here, 'node_modules', 'chess.js', 'chess.js'));
inline('ENGINE', path.join(here, 'engine.js'));
inline('LESSONS', contentFile('lessons.js'));
inline('PUZZLES', contentFile('puzzles.js'));
inline('NOTATION', contentFile('notation.js'));
inline('BOARDPREFS', path.join(here, 'board-prefs.js'));

const outDir = path.join(here, 'dist');
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'index.html'), html);
console.log(html.length);
