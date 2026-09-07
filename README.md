# 3lwan.github.io

My CV, told as a scrolling story. Seven pinned full-screen scenes run backwards
through time — Eurowings Digital, Flaschenpost, INVERS, Conze Informatik, then
education, languages and contact — with a hand-drawn vehicle carrying each one.

Live at **[3lwan.github.io](https://3lwan.github.io)**.

## Two ways in

| Route | What it is |
| --- | --- |
| `/` | The scroll story. |
| `/#/cv` | The same CV as a plain document, for anyone who would rather read than scroll, and for printing. |

Hash routing, not path routing, on purpose: GitHub Pages serves static files
with no rewrite rules, so `/cv` would 404 on a refresh or a shared link. See
`src/hooks/useHashRoute.js`.

`prefers-reduced-motion: reduce` always gets the document view, whatever the
route says (`src/App.jsx`). Both views render from one `LinearCV` component, so
they cannot drift apart.

## Scripts

```sh
npm run dev       # Vite dev server
npm test          # Vitest, single run
npm run test:watch
npm run build     # production build into dist/
npm run preview   # serve the built output
npm run deploy    # builds, then publishes dist/ to the gh-pages branch
```

Stack: Vite + React 18 + Tailwind. Migrated off Create React App; the CRA
scripts (`npm start`, a `build/` folder) are gone.

## The design contract

Later work must not break these — they are what make the scene hand-offs work.

- **One shared ground line.** `--ground` in `src/index.css` positions every
  vehicle. Ground contact is `y=350` for the aircraft (gear down) and `y=392`
  for the van, both inside a `0 0 1200 460` viewBox, nose pointing **right**.
  The plane lands so it and the van share a ground line — that is why no
  shape-morphing is needed between scenes.
- **Heights in `svh`, never `vh`.** A mobile URL bar makes `vh` overflow and
  the ground line jump mid-scroll.
- **Phones split the screen** below 600px: illustration in the top band, copy
  in the ground band beneath it, rather than the desktop composition's overlay.
  One `--ground` for every phone scene — never per-scene, or the hand-off
  breaks. Landscape phones (max-height 520px) split the other way, copy left.
- **Brand palettes come from the companies' own sites**, not guesswork:
  Eurowings Digital `#871C54` `#AF1E65` `#00A6CE`, Flaschenpost `#A50A50`
  `#82BE3C`, INVERS `#00469C` `#00C8AA`, Conze `#15779B`.
- **Illustrations are drawn at full detail**, with real curves and correct
  layering — every part visibly overlaps whatever it attaches to. Drawing
  quality is never traded for animation convenience; change the choreography
  instead.

## Content

`src/data/career.js` is the single source of truth for every word on the site.
Skills resolve through one `SKILLS` table, so a technology cannot end up
spelled or rated two different ways.

## Assets

The `ME` monogram is `public/icon.svg`. It is one ligature in two strokes: the
M runs up the stem, down to the vertex and up to the right, where it stops —
its right leg is also the top arm of the E — and the E is a Z of top arm, spine
and bottom arm parallel to it. Every diagonal is 3:2, every stroke one width,
so the three arms step evenly. `tools/monogram.py` generates the outlines;
re-run it and paste the paths in if the construction changes.

`brand/` holds the mark on its own: `me-mark.svg` (transparent, takes
`currentColor`) and `me-icon-light.svg` (dark mark on a light rounded tile, for
anywhere the site's paper ground would be wrong).

The favicon and app icons are generated from `public/icon.svg`:

```sh
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
"$CHROME" --headless --disable-gpu --hide-scrollbars --window-size=512,512 \
  --screenshot=public/icon-512.png "file://$PWD/public/icon.svg"
for s in 16 24 32 64; do magick public/icon-512.png -filter Lanczos -resize ${s}x${s} /tmp/i$s.png; done
magick /tmp/i16.png /tmp/i24.png /tmp/i32.png /tmp/i64.png public/favicon.ico
magick public/icon-512.png -filter Lanczos -resize 180x180 public/apple-touch-icon.png
magick public/icon-512.png -filter Lanczos -resize 192x192 public/icon-192.png
```

Render once at 512 and downscale — headless Chrome *crops* an SVG that carries
`width`/`height` attributes to the viewport rather than fitting it, so asking
for a 16×16 window yields a blank top-left corner. ImageMagick cannot rasterise
these SVGs itself (no Ghostscript delegate, and it drops stroked paths), which
is why Chrome does the rendering.

The 1200×630 share card (`public/share-card.png`) is generated from
`tools/share-card.html`; that file carries its command in its header comment.
