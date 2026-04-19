# Concrete HP

WordPress block theme (`concrete-child`) + custom blocks plugin (`concrete-blocks`), running in Docker. Home page is a Zahar-style marketing landing built from 11 React blocks.

## Requirements

- Docker + Docker Compose
- Node.js ≥ 20 (plugin build). Use `nvm use` — reads `.nvmrc`.

## Setup

```bash
cp .env.example .env
docker compose up -d                                # WP + MySQL + phpMyAdmin
nvm use
npm run install:all                                  # root + plugin
npm run build                                        # SCSS + blocks
docker exec concrete-hp-web wp plugin activate concrete-blocks --allow-root --path=/var/www/html
```

Open http://localhost:8825

## Dev

```bash
nvm use
npm run dev        # scss + blocks + browser-sync, auto-reloads the page
```

## Structure

```
src/wp-content/
├── plugins/concrete-blocks/
│   ├── src/{block}/          ← block.json · index.js · render.php · view.js?
│   ├── concrete-blocks.php   ← plugin bootstrap (auto-registers from build/)
│   ├── HUONG-DAN-VIET-BLOCK.md  ← Vietnamese block-authoring guide
│   └── build/                ← wp-scripts output (gitignored)
└── themes/concrete-child/
    ├── assets/
    │   ├── scss/
    │   │   ├── _marketing.scss     ← entry: @use each partial below
    │   │   └── marketing/          ← one partial per homepage block
    │   │       ├── _tokens.scss    — colours, font-face, keyframes
    │   │       ├── _base.scss      — wrapper, container, buttons, shapes
    │   │       ├── _header.scss    ·  _hero.scss       ·  _brands.scss
    │   │       ├── _services.scss  ·  _team.scss       ·  _portfolio.scss
    │   │       ├── _pricing.scss   ·  _testimonial.scss ·  _blog.scss
    │   │       ├── _contact.scss   ·  _footer.scss
    │   │       └── _responsive.scss — cross-block breakpoints
    │   └── css/ · fonts/ · images/
    ├── templates/            ← index.html · single.html
    ├── parts/                ← header.html · footer.html
    └── patterns/marketing.php
```

3 pipelines, each independent: **Docker** (WP), **SCSS** (`sass` at root), **Blocks** (`@wordpress/scripts` inside the plugin).

## Blocks (13)

**Home / marketing (11)** — `header` · `marketing-hero` · `brand-slider` · `services-grid` · `team` · `portfolio` · `pricing` · `testimonial` · `blog-grid` · `contact-cta` · `footer`

**Legacy (1, used only by `single.html` post template)** — `footer2`

Each block is a standard Gutenberg dynamic block: `block.json` + React `index.js` (Edit) + `render.php` (server output) + optional `view.js` (frontend JS). Every block.json declares `"example": {}` so the inserter shows a live preview on hover.

### Add a block

Full walkthrough in Vietnamese: [HUONG-DAN-VIET-BLOCK.md](src/wp-content/plugins/concrete-blocks/HUONG-DAN-VIET-BLOCK.md).

Quick version: copy any folder under `src/`, rename, edit `block.json` name + attributes, adjust `index.js` and `render.php`. `npm run build:blocks` picks it up.

Reference patterns in existing code:
- Array items → `blog-grid`, `portfolio`, `pricing`
- Toolbar buttons → `testimonial`, `pricing`, `blog-grid`, `brand-slider`
- Sidebar controls → any block (`TextControl`, `SelectControl`, `ToggleControl`, `RangeControl`)
- Media Library picker → `brand-slider` (`MediaUpload` + inline click-to-replace)
- Click-to-select → `portfolio`, `services-grid`
- Toolbar icons from `@wordpress/icons` → `brand-slider`
- Frontend interactivity (`view.js`) → `testimonial`, `blog-grid`, `portfolio`, `pricing`, `brand-slider`, `header` (sticky + mobile drawer)

### Styling a block

SCSS lives in [`themes/concrete-child/assets/scss/marketing/`](src/wp-content/themes/concrete-child/assets/scss/marketing/) — one file per block. Open the file named after the block, edit, `npm run dev` picks it up. Shared tokens (`$zh-primary`, `$zh-font`, …) come from `_tokens.scss` via `@use 'tokens' as *;` at the top of each partial.

## Commands

```bash
docker compose up -d / stop / logs -f wordpress
npm run install:all      # root + plugin deps in one go
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

**Block missing in editor** — rebuild (`npm run build:blocks`) and confirm the plugin is active.

**Block inserter shows "No preview available"** — the block's `block.json` is missing `"example": {}`. Add it, rebuild.

**Mobile drawer renders inline in Site Editor** — Gutenberg strips `position: fixed` from block children. The marketing-header hides `.zh-nav` + `.zh-header-cta` inside `.block-editor-iframe__body` at `≤ 1024px` so you can still edit at a wider canvas; use the front-end to preview the drawer.

**SCSS not reflected** — check `npm run dev` is running; hard refresh browser (Cmd+Shift+R).

## Related

- [README-docker.md](README-docker.md) — Docker + DB details
- [HUONG-DAN-VIET-BLOCK.md](src/wp-content/plugins/concrete-blocks/HUONG-DAN-VIET-BLOCK.md) — how to build a new block (Vietnamese)
- [Gutenberg block API](https://developer.wordpress.org/block-editor/reference-guides/block-api/)
- [@wordpress/icons](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-icons/) — icon library used in block editor UIs
