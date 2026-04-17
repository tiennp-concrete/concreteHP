# Concrete HP

WordPress block theme (`concrete-child`) + custom Gutenberg blocks plugin (`concrete-blocks`), running in Docker.

## Prerequisites

| Tool | Version |
|---|---|
| Docker + Docker Compose | latest |
| Node.js | **≥ 20** (required for the plugin; root can use any version) |
| nvm (recommended) | to auto-switch Node via `.nvmrc` |

## First-time setup

```bash
# 1. Copy env
cp .env.example .env

# 2. Start containers (WP + MySQL + phpMyAdmin)
docker compose up -d

# 3. Install root deps (sass only)
npm install

# 4. Install plugin deps — requires Node 20
(cd src/wp-content/plugins/concrete-blocks && nvm use && npm install)

# 5. Build (SCSS + blocks)
npm run build

# 6. Activate plugin (one-time)
docker exec concrete-hp-web wp plugin activate concrete-blocks --allow-root --path=/var/www/html
```

Visit: `http://localhost:8825`

## Dev workflow (watch + live reload)

One command at root watches everything **and auto-reloads `localhost:8825`**:

```bash
nvm use        # Node 20 (reads .nvmrc)
npm run dev    # → scss + blocks + browser-sync concurrently
```

Open **`http://localhost:8825`** as usual:
- CSS changes → hot-injected, no refresh
- PHP / HTML / JS changes → full page reload

BrowserSync is wired in via [functions.php](src/wp-content/themes/concrete-child/functions.php) (injects its client when `WP_DEBUG=true`). When `npm run dev` isn't running, pages still load — the script tag just 404s silently.

Sources you edit:
- [assets/scss/](src/wp-content/themes/concrete-child/assets/scss/) — theme styles
- [plugins/concrete-blocks/src/{block}/index.html](src/wp-content/plugins/concrete-blocks/src/) — block markup
- [patterns/homepage.php](src/wp-content/themes/concrete-child/patterns/homepage.php) — homepage composition

Alternatives: `npm run watch` (no live reload), `npm run watch:scss` / `watch:blocks` (single pipeline).

## Architecture

```
concreteHp/
├── src/                              ← WordPress install (docker mount)
│   └── wp-content/
│       ├── plugins/concrete-blocks/  ← Custom blocks plugin
│       │   ├── src/{block}/index.html   ← Authoring HTML (committed)
│       │   ├── generated-blocks/        ← Intermediate (gitignored)
│       │   └── build/                   ← Final bundle loaded by WP (gitignored)
│       └── themes/concrete-child/    ← Block theme
│           ├── assets/{scss,css}/
│           ├── templates/{index,single}.html
│           ├── parts/{header,footer}.html    ← wrapper → concrete/* block
│           └── patterns/homepage.php         ← composes 6 section blocks
├── config/                           ← php.ini
├── db-data/                          ← MySQL init SQL
├── docker-compose.yml
├── package.json                      ← root (sass only)
└── README.md
```

### 3 independent pipelines
1. **Docker** — WP + MySQL + phpMyAdmin (see [README-docker.md](README-docker.md))
2. **SCSS** — `sass` CLI at root, compiles SCSS → theme CSS
3. **Blocks** — webpack + `@jverneaut/html-to-gutenberg` inside the plugin, HTML → Gutenberg block

## Common commands

```bash
# Docker
docker compose up -d              # start
docker compose stop               # stop
docker compose logs -f wordpress  # logs

# Build
npm run build       # SCSS + blocks
npm run build:scss  # SCSS only
npm run build:blocks # blocks only

# WP-CLI (via container)
docker exec concrete-hp-web wp <command> --allow-root --path=/var/www/html

# Flush pattern cache after adding/editing a pattern
docker exec concrete-hp-web wp eval 'wp_get_theme()->delete_pattern_cache();' --allow-root --path=/var/www/html
```

## Troubleshooting

### Edits to a template/pattern file don't appear on the site
→ WP DB override is cached; delete the DB copy so it falls back to the file
```bash
docker exec concrete-hp-web wp post delete \
  $(docker exec concrete-hp-web wp post list --post_type=wp_template --format=ids --allow-root --path=/var/www/html) \
  --force --allow-root --path=/var/www/html
```

### Inline HTML editing in Site Editor doesn't work
→ The field needs `data-bind="fieldName"` in the source HTML. Add it → build → reload editor.

## Adding a new block

1. Create folder + file:
   ```bash
   mkdir src/wp-content/plugins/concrete-blocks/src/my-block
   echo '<section data-name="concrete/my-block" data-title="My Block" data-category="theme"><h2 data-bind="heading">Title</h2></section>' \
     > src/wp-content/plugins/concrete-blocks/src/my-block/index.html
   ```
2. Build: `cd src/wp-content/plugins/concrete-blocks && npm run build`
3. The block auto-registers via `wp_register_block_types_from_metadata_collection`
4. Add it to [patterns/homepage.php](src/wp-content/themes/concrete-child/patterns/homepage.php) if you want it on the homepage:
   ```html
   <!-- wp:concrete/my-block /-->
   ```

## Related docs

- [README-docker.md](README-docker.md) — Docker + DB details
- [@jverneaut/html-to-gutenberg docs](https://html-to-gutenberg.com/)
