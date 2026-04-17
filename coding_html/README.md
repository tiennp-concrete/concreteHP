# coding_html — HTML → WordPress Template Markup

Small pipeline that lets you write theme templates as plain HTML in
`coding_html/src/` and auto-generates valid WordPress block markup into the
theme's `templates/` and `parts/` directories.

No external dependencies — pure Node stdlib, runs on any Node 18+.

## Quick Start (from project root)

- Build once: `npm run build:themefiles`
- Watch mode: `npm run watch:themefiles`
- Full theme build (templates + SCSS): `npm run build:theme`

## Source layout

    coding_html/
    ├── assets/scss/           (SCSS sources compiled to theme CSS)
    ├── src/
    │   ├── templates/*.html   → src/.../concrete-child/templates/*.html
    │   └── parts/*.html       → src/.../concrete-child/parts/*.html
    ├── build-theme-files.cjs  (converter)
    └── watch-theme-files.cjs  (file watcher)

## HTML conventions

The converter recognizes these HTML patterns and emits native WP block markup:

| Source                                | Emits                     |
|---------------------------------------|---------------------------|
| `<h1>`–`<h6>`                         | `wp:heading`              |
| `<p>`                                 | `wp:paragraph`            |
| `<ul>` / `<ol>` + `<li>`              | `wp:list` + `wp:list-item`|
| `<hr class="accent-line">`            | `wp:separator`            |
| `<a class="btn">` / `<a class="cta">` | `wp:button`               |
| `<section>` / `<header>` / `<footer>` | `wp:group`                |
| `<div columns="N">`                   | `wp:columns` + `wp:column`|

Plus these inline directives:

| Directive                              | Emits                    |
|----------------------------------------|--------------------------|
| `<!-- @template-part <slug> -->`       | `wp:template-part`       |
| `<!-- @site-title -->`                 | `wp:site-title`          |
| `<!-- @navigation -->`                 | `wp:navigation`          |
| `<!-- @query {"perPage":3,...} -->`    | `wp:query` + post loop   |
| `<!-- @html --> ... <!-- @/html -->`   | `wp:html` (raw passthrough) |
| `<!-- @part <name> -->` (first line)   | Marks file as template-part |

## Theme integration

Generated files are written directly into the theme. WordPress Full Site
Editor reads `templates/` and `parts/` natively — no PHP registration needed.
