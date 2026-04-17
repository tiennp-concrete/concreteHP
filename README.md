# Concrete HP

WordPress block theme (`concrete-child`) + custom blocks plugin (`concrete-blocks`), running in Docker. Home page is a Zahar-style marketing landing built from 13 React blocks.

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
│   ├── webpack.config.js     ← 1 line: re-export wp-scripts default
│   ├── concrete-blocks.php   ← plugin bootstrap (auto-registers from build/)
│   └── build/                ← webpack output (gitignored)
└── themes/concrete-child/
    ├── assets/{scss,css,fonts}/
    ├── templates/            ← index.html · single.html
    ├── parts/                ← header.html · footer.html
    └── patterns/marketing.php
```

3 pipelines, each independent: **Docker** (WP), **SCSS** (`sass` at root), **Blocks** (`@wordpress/scripts` in the plugin).

## Blocks (13)

**Home / marketing (11)** — `marketing-header` · `marketing-hero` · `brand-slider` · `services-grid` · `team` · `portfolio` · `pricing` · `testimonial` · `blog-grid` · `contact-cta` · `marketing-footer`

**Legacy (2, used only by `single.html` post template)** — `header` · `footer`

Each block is a standard Gutenberg dynamic block: `block.json` + React `index.js` (Edit) + `render.php` (server output) + optional `view.js` (frontend JS).

### Add a block

Copy any existing folder under `src/`, rename, edit `block.json` name + attributes, adjust `index.js` and `render.php`. Build picks it up automatically.

Reference patterns in existing code:
- Array items → `blog-grid`, `portfolio`, `pricing`
- Toolbar buttons → `testimonial`, `pricing`
- Sidebar controls → any block (`TextControl`, `SelectControl`, `ToggleControl`, `RangeControl`)
- Click-to-select → `portfolio`, `services-grid`
- Frontend interactivity (`view.js`) → `testimonial`, `blog-grid`, `portfolio`, `pricing`, `brand-slider`, `marketing-header`

## Commands

```bash
docker compose up -d / stop / logs -f wordpress
npm run build            # SCSS + blocks
npm run build:scss
npm run build:blocks
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

**SCSS not reflected** — check `npm run dev` is running; hard refresh browser (Cmd+Shift+R).

## Related

- [README-docker.md](README-docker.md) — Docker + DB details
- [Gutenberg block API](https://developer.wordpress.org/block-editor/reference-guides/block-api/)
