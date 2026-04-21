# Concrete HP

WordPress block theme (`concrete-child`) with custom Gutenberg blocks, running in Docker. Home page is a Zahar-style marketing landing built from 11 React blocks.

## Requirements

- Docker + Docker Compose
- Node.js ≥ 20 (block build). Use `nvm use` — reads `.nvmrc`.

## Setup

```bash
cp .env.example .env
docker compose up -d                                # WP + MySQL + phpMyAdmin
nvm use
npm run install:all                                  # root + theme
npm run build                                        # SCSS + blocks
```

Open http://localhost:8825

## Dev

```bash
nvm use
npm run dev        # scss + blocks + browser-sync, auto-reloads the page
```

`npm run dev` runs 3 watchers concurrently:

| Watcher | Watches | Writes to | Purpose |
|---|---|---|---|
| `sass --watch` | `assets/scss/**` | `assets/css/main.css` | Compile SCSS |
| `wp-scripts start` | `blocks/src/**/*.{js,jsx,css,scss,json,php}` | `blocks/build/` | Bundle JS/CSS, copy block.json/render.php, regenerate `blocks-manifest.php` |
| `browser-sync` | css + `**/*.{html,php,js}` + `blocks/build/**` | — | Push reload to the browser |

## Structure

```
src/wp-content/themes/concrete-child/
├── blocks/
│   ├── src/{block}/          ← block.json · index.js · render.php · view.js?
│   ├── build/                ← wp-scripts output (gitignored)
│   └── HUONG-DAN-VIET-BLOCK.md   ← Vietnamese block-authoring guide
├── assets/
│   ├── scss/
│   │   ├── main.scss           ← sass entry → main.css
│   │   ├── _variables.scss · _base.scss · _navigation.scss
│   │   ├── _animations.scss · _blocks.scss · _responsive.scss
│   │   ├── _homepage.scss      ← @use each homepage/* partial below
│   │   └── homepage/           ← one partial per homepage block
│   │       ├── _variables.scss  — colours, radii, font-face, keyframes
│   │       ├── _base.scss       — wrapper, container, buttons, shapes
│   │       ├── _header.scss    ·  _hero.scss       ·  _brands.scss
│   │       ├── _services.scss  ·  _team.scss       ·  _portfolio.scss
│   │       ├── _pricing.scss   ·  _testimonial.scss ·  _blog.scss
│   │       ├── _contact.scss   ·  _footer.scss
│   │       └── _responsive.scss — cross-block breakpoints
│   └── css/ · fonts/ · images/
├── templates/                ← index.html · single.html
├── parts/                    ← header.html · footer.html
├── patterns/homepage.php
├── functions.php             ← enqueues + registers blocks from blocks/build/
└── package.json              ← @wordpress/scripts build for blocks
```

3 pipelines, each independent: **Docker** (WP), **SCSS** (`sass` at root), **Blocks** (`@wordpress/scripts` inside the theme).

## Blocks (13)

**Home / marketing (11)** — `header` · `marketing-hero` · `brand-slider` · `services-grid` · `team` · `portfolio` · `pricing` · `testimonial` · `blog-grid` · `contact-cta` · `footer`

**Legacy (1, used only by `single.html` post template)** — `footer2`

Each block is a standard Gutenberg dynamic block: `block.json` + React `index.js` (Edit) + `render.php` (server output) + optional `view.js` (frontend JS). Every block.json declares `"example": {}` so the inserter shows a live preview on hover.

### Add a block

Full walkthrough in Vietnamese: [HUONG-DAN-VIET-BLOCK.md](src/wp-content/themes/concrete-child/blocks/HUONG-DAN-VIET-BLOCK.md).

Quick version: copy any folder under `blocks/src/`, rename, edit `block.json` name + attributes, adjust `index.js` and `render.php`. `npm run build:blocks` picks it up.

Reference patterns in existing code:
- Array items → `blog-grid`, `portfolio`, `pricing`
- Toolbar buttons → `testimonial`, `pricing`, `blog-grid`, `brand-slider`
- Sidebar controls → any block (`TextControl`, `SelectControl`, `ToggleControl`, `RangeControl`)
- Media Library picker → `brand-slider` (`MediaUpload` + inline click-to-replace)
- Click-to-select → `portfolio`, `services-grid`
- Toolbar icons from `@wordpress/icons` → `brand-slider`
- Frontend interactivity (`view.js`) → `testimonial`, `blog-grid`, `portfolio`, `pricing`, `brand-slider`, `header` (sticky + mobile drawer)

### Styling a block

SCSS lives in [`themes/concrete-child/assets/scss/homepage/`](src/wp-content/themes/concrete-child/assets/scss/homepage/) — one file per block. Open the file named after the block, edit, `npm run dev` picks it up. Shared tokens (`$zh-primary`, `$zh-font`, …) come from `homepage/_variables.scss` via `@use 'variables' as *;` at the top of each partial.

## Commands

```bash
docker compose up -d / stop / logs -f wordpress
npm run install:all      # root + theme deps in one go
npm run build            # SCSS + blocks
npm run build:scss
npm run build:blocks
npm run dev              # watch: SCSS + blocks + browser-sync reload
docker exec concrete-hp-web wp <command> --allow-root --path=/var/www/html
```

## Troubleshooting

**Template edits on disk don't show** — WP caches the template in the DB when edited via Site Editor. Delete the DB copy:

```bash
docker exec concrete-hp-web wp post list --post_type=wp_template \
  --format=csv --fields=ID,post_name --allow-root --path=/var/www/html
docker exec concrete-hp-web wp post delete <ID> --force --allow-root --path=/var/www/html
docker exec concrete-hp-web wp cache flush --allow-root --path=/var/www/html
```

**Block missing in editor** — rebuild (`npm run build:blocks`) and confirm the `concrete-child` theme is active.

**Block inserter shows "No preview available"** — the block's `block.json` is missing `"example": {}`. Add it, rebuild.

**Mobile drawer renders inline in Site Editor** — Gutenberg strips `position: fixed` from block children. The marketing-header hides `.zh-nav` + `.zh-header-cta` inside `.block-editor-iframe__body` at `≤ 1024px` so you can still edit at a wider canvas; use the front-end to preview the drawer.

**SCSS not reflected** — check `npm run dev` is running; hard refresh browser (Cmd+Shift+R).

**Edits to `block.json` default values don't show on existing blocks** — `default` only applies to freshly inserted blocks. Existing instances have their attribute values serialised in `post_content`; the stored value wins. To see a new default, delete the block in the editor and re-insert it.

**Two `npm run dev` processes collide** — only one BrowserSync can own port 3000. If you restructure folders mid-session, kill stale dev processes before starting a new one:
```bash
ps aux | grep -E "wp-scripts|browser-sync|sync-watch" | grep -v grep
kill <old-pids>
```

## Related

- [README-docker.md](README-docker.md) — Docker + DB details
- [HUONG-DAN-VIET-BLOCK.md](src/wp-content/themes/concrete-child/blocks/HUONG-DAN-VIET-BLOCK.md) — how to build a new block (Vietnamese)
- [Gutenberg block API](https://developer.wordpress.org/block-editor/reference-guides/block-api/)
- [@wordpress/icons](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-icons/) — icon library used in block editor UIs
