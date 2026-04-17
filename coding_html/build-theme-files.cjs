#!/usr/bin/env node
/**
 * HTML to WordPress Blocks Converter
 *
 * Dev viet HTML binh thuong trong src/
 * Script nay convert sang native WordPress block markup
 *
 * Usage: node scripts/html-to-blocks.js
 *
 * Conventions trong source HTML:
 *   <h1>...<h6>          -> wp:heading
 *   <p>                  -> wp:paragraph
 *   <hr class="accent-line"> -> wp:separator
 *   <a class="btn">      -> wp:button
 *   <img>                -> wp:image
 *   <section>            -> wp:group (tagName=section)
 *   <div columns="N">    -> wp:columns + wp:column
 *   <!-- @template-part slug -->  -> wp:template-part
 *   <!-- @site-title -->          -> wp:site-title
 *   <!-- @navigation -->          -> wp:navigation
 *   <!-- @query {...} -->         -> wp:query + wp:post-template
 *   <!-- @part name -->           -> marks file as template-part
 */

const fs = require('fs');
const path = require('path');

const THEME_DIR = path.resolve(__dirname, '../src/wp-content/themes/concrete-child');
const SRC_DIR = path.resolve(__dirname, 'src');
const BLOCKS_OUT_DIR = resolveOutputDir();
const BUILD_SCOPE = resolveBuildScope();

function resolveOutputDir() {
    const argIndex = process.argv.indexOf('--out-dir');
    const argValue = argIndex >= 0 ? process.argv[argIndex + 1] : null;
    const envValue = process.env.BLOCKS_OUT_DIR;
    const outValue = argValue || envValue;

    if (!outValue) return THEME_DIR;
    return path.isAbsolute(outValue)
        ? outValue
        : path.resolve(THEME_DIR, outValue);
}

function resolveBuildScope() {
    const argIndex = process.argv.indexOf('--only');
    const argValue = argIndex >= 0 ? process.argv[argIndex + 1] : null;
    const envValue = process.env.BLOCKS_ONLY;
    const rawScope = (argValue || envValue || 'all').toLowerCase();

    if (rawScope === 'parts' || rawScope === 'templates' || rawScope === 'all') {
        return rawScope;
    }

    console.log('  Warning: invalid build scope "' + rawScope + '", fallback to "all"');
    return 'all';
}

// ================================================================
// PARSER
// ================================================================

function parseStyle(styleStr) {
    if (!styleStr) return {};
    const obj = {};
    styleStr.split(';').forEach(function (part) {
        const kv = part.split(':');
        if (kv.length >= 2) {
            const key = kv[0].trim();
            const val = kv.slice(1).join(':').trim();
            if (key && val) obj[key] = val;
        }
    });
    return obj;
}

function styleToString(styleObj) {
    return Object.entries(styleObj)
        .map(function (kv) { return kv[0] + ':' + kv[1]; })
        .join(';');
}

function extractAttrs(tag) {
    const attrs = {};
    const re = /(\w[\w-]*)=(?:"([^"]*)"|'([^']*)')/g;
    var m;
    while ((m = re.exec(tag)) !== null) {
        attrs[m[1]] = m[2] !== undefined ? m[2] : m[3];
    }
    return attrs;
}

function getAlignFromAttrs(attrs) {
    return attrs.align || null;
}

function buildBlockJson(obj) {
    const clean = {};
    Object.keys(obj).forEach(function (k) {
        if (obj[k] !== undefined && obj[k] !== null) clean[k] = obj[k];
    });
    return JSON.stringify(clean);
}

// ================================================================
// CONVERTERS
// ================================================================

function convertHeading(tag, inner, attrs) {
    var level = parseInt(tag.charAt(1), 10);
    var styleObj = parseStyle(attrs.style);
    var blockAttrs = { level: level };

    if (styleObj['text-align']) blockAttrs.textAlign = styleObj['text-align'];
    if (styleObj.color) blockAttrs.style = { color: { text: styleObj.color } };
    if (styleObj['font-size']) {
        blockAttrs.style = blockAttrs.style || {};
        blockAttrs.style.typography = blockAttrs.style.typography || {};
        blockAttrs.style.typography.fontSize = styleObj['font-size'];
    }
    if (styleObj['font-weight']) {
        blockAttrs.style = blockAttrs.style || {};
        blockAttrs.style.typography = blockAttrs.style.typography || {};
        blockAttrs.style.typography.fontWeight = styleObj['font-weight'];
    }
    if (attrs.class) blockAttrs.className = attrs.class;
        var id = attrs.id || '';

    // Build inline style for the HTML element
    var htmlStyle = '';
    var styleParts = [];
    if (styleObj.color) styleParts.push('color:' + styleObj.color);
    if (styleObj['font-size']) styleParts.push('font-size:' + styleObj['font-size']);
    if (styleObj['font-weight']) styleParts.push('font-weight:' + styleObj['font-weight']);
    if (styleParts.length) htmlStyle = ' style="' + styleParts.join(';') + '"';

    var classes = ['wp-block-heading'];
    if (blockAttrs.textAlign) classes.push('has-text-align-' + blockAttrs.textAlign);
    if (attrs.class) classes.push(attrs.class);
        var idAttr = id ? ' id="' + id + '"' : '';

    return '<!-- wp:heading ' + buildBlockJson(blockAttrs) + ' -->\n' +
            '<' + tag + ' class="' + classes.join(' ') + '"' + idAttr + htmlStyle + '>' + inner + '</' + tag + '>\n' +
        '<!-- /wp:heading -->';
}

function convertParagraph(inner, attrs) {
    var styleObj = parseStyle(attrs.style);
    var blockAttrs = {};

    if (styleObj['text-align']) blockAttrs.align = styleObj['text-align'];
    if (styleObj.color) blockAttrs.style = { color: { text: styleObj.color } };
    if (styleObj['font-size']) {
        blockAttrs.style = blockAttrs.style || {};
        blockAttrs.style.typography = blockAttrs.style.typography || {};
        blockAttrs.style.typography.fontSize = styleObj['font-size'];
    }
    if (styleObj['font-weight']) {
        blockAttrs.style = blockAttrs.style || {};
        blockAttrs.style.typography = blockAttrs.style.typography || {};
        blockAttrs.style.typography.fontWeight = styleObj['font-weight'];
    }
    if (styleObj['text-transform']) {
        blockAttrs.style = blockAttrs.style || {};
        blockAttrs.style.typography = blockAttrs.style.typography || {};
        blockAttrs.style.typography.textTransform = styleObj['text-transform'];
    }
    if (styleObj['letter-spacing']) {
        blockAttrs.style = blockAttrs.style || {};
        blockAttrs.style.typography = blockAttrs.style.typography || {};
        blockAttrs.style.typography.letterSpacing = styleObj['letter-spacing'];
    }
    if (attrs.class) blockAttrs.className = attrs.class;
        var id = attrs.id || '';

    var classes = [];
    if (blockAttrs.align) classes.push('has-text-align-' + blockAttrs.align);
    if (attrs.class) classes.push(attrs.class);
    var classStr = classes.length ? ' class="' + classes.join(' ') + '"' : '';

    // Rebuild style without text-align (handled by class)
    var htmlStyleParts = [];
    Object.keys(styleObj).forEach(function (k) {
        if (k !== 'text-align') htmlStyleParts.push(k + ':' + styleObj[k]);
    });
    var htmlStyle = htmlStyleParts.length ? ' style="' + htmlStyleParts.join(';') + '"' : '';
        var idAttr = id ? ' id="' + id + '"' : '';

    return '<!-- wp:paragraph ' + buildBlockJson(blockAttrs) + ' -->\n' +
            '<p' + classStr + idAttr + htmlStyle + '>' + inner.trim() + '</p>\n' +
        '<!-- /wp:paragraph -->';
}

function convertButton(inner, attrs) {
    var styleObj = parseStyle(attrs.style);
    var href = attrs.href || '#';

    var styleParts = [];
    if (styleObj['border-radius']) styleParts.push('border-radius:' + styleObj['border-radius']);
    if (styleObj.padding) styleParts.push('padding:' + styleObj.padding);
    if (styleObj['font-size']) styleParts.push('font-size:' + styleObj['font-size']);
    if (styleObj['font-weight']) styleParts.push('font-weight:' + styleObj['font-weight']);
    if (styleObj['letter-spacing']) styleParts.push('letter-spacing:' + styleObj['letter-spacing']);
    if (styleObj['text-transform']) styleParts.push('text-transform:' + styleObj['text-transform']);

    var linkClasses = 'wp-block-button__link';
    if (styleObj['background-color']) linkClasses += ' has-background';
    linkClasses += ' wp-element-button';

    var linkStyle = styleParts.length ? ' style="' + styleParts.join(';') + '"' : '';

    return '<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->\n' +
        '<div class="wp-block-buttons">\n' +
        '<!-- wp:button -->\n' +
        '<div class="wp-block-button"><a class="' + linkClasses + '" href="' + href + '"' + linkStyle + '>' + inner.trim() + '</a></div>\n' +
        '<!-- /wp:button -->\n' +
        '</div>\n' +
        '<!-- /wp:buttons -->';
}

function convertSeparator(attrs) {
    var cls = attrs.class || '';
    var blockAttrs = {};
    if (cls.indexOf('accent-line') >= 0) {
        blockAttrs.className = 'is-style-wide accent-line';
        blockAttrs.backgroundColor = 'accent-red';
    }
    return '<!-- wp:separator ' + buildBlockJson(blockAttrs) + ' -->\n' +
        '<hr class="wp-block-separator has-alpha-channel-opacity' + (cls ? ' ' + cls : '') + '"/>\n' +
        '<!-- /wp:separator -->';
}

function convertQuery(jsonStr) {
    var opts = {};
    try { opts = JSON.parse(jsonStr); } catch (e) {}
    var perPage = opts.perPage || '3';
    var postType = opts.postType || 'post';
    var columns = opts.columns || 3;

    return '<!-- wp:query {"query":{"perPage":"' + perPage + '","postType":"' + postType + '","order":"desc","orderBy":"date"},"align":"full","className":"projects-query"} -->\n' +
        '<div class="wp-block-query alignfull projects-query">\n' +
        '<!-- wp:post-template {"layout":{"type":"grid","columnCount":' + columns + '}} -->\n' +
        '<!-- wp:group {"className":"project-card-block"} -->\n' +
        '<div class="wp-block-group project-card-block">\n' +
        '<!-- wp:post-featured-image {"isLink":true,"sizeSlug":"medium_large"} /-->\n' +
        '<!-- wp:group {"style":{"spacing":{"padding":{"top":"24px","bottom":"24px","left":"24px","right":"24px"}}}} -->\n' +
        '<div class="wp-block-group" style="padding-top:24px;padding-right:24px;padding-bottom:24px;padding-left:24px">\n' +
        '<!-- wp:post-title {"level":3,"isLink":true,"style":{"typography":{"fontSize":"18px","fontWeight":"700"}}} /-->\n' +
        '<!-- wp:post-excerpt {"excerptLength":20,"style":{"typography":{"fontSize":"14px"}}} /-->\n' +
        '</div>\n<!-- /wp:group -->\n' +
        '</div>\n<!-- /wp:group -->\n' +
        '<!-- /wp:post-template -->\n' +
        '</div>\n' +
        '<!-- /wp:query -->';
}

// ================================================================
// MAIN CONVERTER
// ================================================================

function convertHtml(html, options) {
    options = options || {};
    var output = html;

    // --- Special comments ---
    output = output.replace(/<!--\s*@template-part\s+(\w+)\s*-->/g, function (_, slug) {
        return '<!-- wp:template-part {"slug":"' + slug + '","theme":"concrete-child"} /-->';
    });

    output = output.replace(/<!--\s*@site-title\s*-->/g,
        '<!-- wp:site-title {"style":{"typography":{"fontSize":"24px","fontWeight":"900"},"elements":{"link":{"color":{"text":"#ffffff"}}}},"textColor":"white"} /-->');

    output = output.replace(/<!--\s*@navigation\s*-->/g,
        '<!-- wp:navigation {"style":{"typography":{"fontSize":"14px","fontWeight":"500","textTransform":"uppercase"}},"textColor":"white","layout":{"type":"flex"}} /-->');

    // --- <hr> ---
    output = output.replace(/<hr\s*([^>]*)\/?>/gi, function (_, attrStr) {
        return convertSeparator(extractAttrs(attrStr));
    });

    // --- <a class="btn"> or button-like classes -> wp:button ---
    output = output.replace(/<a\s+class="([a-z\-]*(?:btn|cta)[a-z\-]*)"([^>]*)>([\s\S]*?)<\/a>/gi, function (_, className, attrStr, inner) {
        var attrs = extractAttrs('class="' + className + '"' + attrStr);
        return convertButton(inner, attrs);
    });

    // --- Headings <h1>-<h6> ---
    output = output.replace(/<(h[1-6])(\s[^>]*)?>(((?!<\/h[1-6]>)[\s\S])*)<\/h[1-6]>/gi, function (match, tag, attrStr, inner) {
        var attrs = extractAttrs(attrStr || '');
        return convertHeading(tag.toLowerCase(), inner, attrs);
    });

    // --- <p> (but not inside already converted blocks) ---
    output = output.replace(/<p(\s[^>]*)?>(((?!<\/p>)[\s\S])*)<\/p>/gi, function (match, attrStr, inner) {
        // Skip if already inside a wp: comment block
        if (inner.indexOf('wp:') >= 0) return match;
        var attrs = extractAttrs(attrStr || '');
        return convertParagraph(inner, attrs);
    });

    // --- <div columns="N"> -> wp:columns ---
    output = output.replace(/<div\s+([^>]*columns="(\d+)"[^>]*)>([\s\S]*?)<\/div>\s*(?=(?:<!--[\s\S]*?-->\s*)*<\/section>)/gi, function (_, attrStr, colCount, inner) {
        var attrs = extractAttrs(attrStr);
        var styleObj = parseStyle(attrs.style);
        var blockStyle = {};
        if (styleObj['margin-top']) blockStyle.spacing = { margin: { top: styleObj['margin-top'] } };
        if (styleObj['margin-bottom']) blockStyle.spacing = Object.assign(blockStyle.spacing || {}, { margin: Object.assign((blockStyle.spacing || {}).margin || {}, { bottom: styleObj['margin-bottom'] }) });

        var blockAttrs = {};
        if (attrs.class) blockAttrs.className = attrs.class;
        if (Object.keys(blockStyle).length) blockAttrs.style = blockStyle;

        // Split direct child <div> into columns safely (supports nested divs).
        var childDivs = extractTopLevelDivChildren(inner);
        if (!childDivs.length) {
            return '<div ' + attrStr + '>' + inner + '</div>';
        }

        var columnsInner = '';
        childDivs.forEach(function (child) {
            var childAttrs = extractAttrs(child.attrs);
            var colBlockAttrs = {};
            if (childAttrs.class) colBlockAttrs.className = childAttrs.class;

            columnsInner += '\n<!-- wp:column ' + buildBlockJson(colBlockAttrs) + ' -->\n' +
                '<div class="wp-block-column' + (childAttrs.class ? ' ' + childAttrs.class : '') + '">\n' +
                child.content +
                '\n</div>\n<!-- /wp:column -->\n';
        });

        var htmlStyle = '';
        var cssParts = [];
        if (styleObj['margin-top']) cssParts.push('margin-top:' + styleObj['margin-top']);
        if (styleObj['margin-bottom']) cssParts.push('margin-bottom:' + styleObj['margin-bottom']);
        if (cssParts.length) htmlStyle = ' style="' + cssParts.join(';') + '"';

        return '<!-- wp:columns ' + buildBlockJson(blockAttrs) + ' -->\n' +
            '<div class="wp-block-columns' + (attrs.class ? ' ' + attrs.class : '') + '"' + htmlStyle + '>' +
            columnsInner +
            '</div>\n<!-- /wp:columns -->';
    });

    // --- <section|header|footer> -> wp:group ---
    output = output.replace(/<(section|header|footer)(\s[^>]*)>([\s\S]*?)<\/\1>/gi, function (_, tagName, attrStr, inner) {
        var attrs = extractAttrs(attrStr || '');
        var styleObj = parseStyle(attrs.style);
        var blockAttrs = { tagName: tagName.toLowerCase() };

        if (attrs.class) blockAttrs.className = attrs.class;
        if (attrs.align === 'full') blockAttrs.align = 'full';
            if (attrs.id) blockAttrs.anchor = attrs.id;

        // Extract style for block
        var blockStyle = {};
        if (styleObj.padding) blockStyle.spacing = { padding: parsePadding(styleObj.padding) };
        if (styleObj['padding-top']) {
            blockStyle.spacing = blockStyle.spacing || {};
            blockStyle.spacing.padding = blockStyle.spacing.padding || {};
            blockStyle.spacing.padding.top = styleObj['padding-top'];
        }
        if (styleObj.background) blockStyle.color = { gradient: styleObj.background };
        else if (styleObj['background-color']) blockStyle.color = { background: styleObj['background-color'] };
        if (styleObj['min-height']) blockStyle.dimensions = { minHeight: styleObj['min-height'] };
        if (Object.keys(blockStyle).length) blockAttrs.style = blockStyle;

        // Build HTML classes
        var classes = ['wp-block-group'];
        if (attrs.class) classes.push(attrs.class);
        if (blockAttrs.align) classes.push('align' + blockAttrs.align);
            var idAttr = attrs.id ? ' id="' + attrs.id + '"' : '';

        // Build HTML style (only layout-relevant)
        var htmlStyleParts = [];
        if (styleObj.background) htmlStyleParts.push('background:' + styleObj.background);
        else if (styleObj['background-color']) htmlStyleParts.push('background-color:' + styleObj['background-color']);
        if (styleObj['min-height']) htmlStyleParts.push('min-height:' + styleObj['min-height']);
        if (styleObj.padding) htmlStyleParts.push('padding:' + styleObj.padding);
        ['padding-top', 'padding-bottom', 'padding-left', 'padding-right'].forEach(function (k) {
            if (styleObj[k]) htmlStyleParts.push(k + ':' + styleObj[k]);
        });

        var htmlStyle = htmlStyleParts.length ? ' style="' + htmlStyleParts.join(';') + '"' : '';

        var htmlTag = tagName.toLowerCase();

        return '<!-- wp:group ' + buildBlockJson(blockAttrs) + ' -->\n' +
                '<' + htmlTag + ' class="' + classes.join(' ') + '"' + idAttr + htmlStyle + '>\n' +
            inner +
            '\n</' + htmlTag + '>\n<!-- /wp:group -->';
    });

    // Convert query placeholder after structural transforms to avoid
    // injecting wp:query markup into columns parsing.
    output = output.replace(/<!--\s*@query\s+(\{[^}]+\})\s*-->/g, function (_, json) {
        return '\n' + convertQuery(json);
    });

    // For template-parts, convert remaining generic div wrappers into
    // wp:group blocks so output is closer to native block markup.
    if (options.isPart) {
        output = convertGenericDivGroups(output);
    }

    // Remove plain HTML comments from final output to avoid showing
    // section labels in Site Editor, but keep WordPress block comments.
    output = output.replace(/<!--(?!\s*\/?wp:)[\s\S]*?-->/g, '');

    // Normalize excessive blank lines created after comment stripping.
    output = output.replace(/\n{3,}/g, '\n\n');

    return output;
}

function convertGenericDivGroups(markup) {
    var output = markup;
    var changed = true;
    var innerMostDiv = /<div(\s[^>]*)?>((?:(?!<div\b|<\/div>)[\s\S])*)<\/div>/gi;

    while (changed) {
        changed = false;

        output = output.replace(innerMostDiv, function (match, attrStr, inner) {
            var attrs = extractAttrs(attrStr || '');
            var cls = attrs.class || '';

            // Skip if this div is already a block container.
            if (/\bwp-block-/.test(cls)) return match;

            var blockAttrs = {};
            if (cls) blockAttrs.className = cls;

            var classes = ['wp-block-group'];
            if (cls) classes.push(cls);

            changed = true;
            return '<!-- wp:group ' + buildBlockJson(blockAttrs) + ' -->\n' +
                '<div class="' + classes.join(' ') + '">\n' +
                inner +
                '\n</div>\n<!-- /wp:group -->';
        });
    }

    return output;
}

function extractTopLevelDivChildren(inner) {
    var matches = [];
    var tokenRe = /<\/?div\b[^>]*>/gi;
    var depth = 0;
    var start = -1;
    var m;

    while ((m = tokenRe.exec(inner)) !== null) {
        var token = m[0];
        var isClose = token.indexOf('</div') === 0;

        if (!isClose) {
            if (depth === 0) start = m.index;
            depth += 1;
        } else {
            depth -= 1;

            if (depth === 0 && start >= 0) {
                var end = tokenRe.lastIndex;
                var chunk = inner.slice(start, end);
                var parsed = chunk.match(/^<div\s*([^>]*)>([\s\S]*)<\/div>$/i);
                if (parsed) {
                    matches.push({ attrs: parsed[1], content: parsed[2] });
                }
                start = -1;
            }
        }
    }

    return matches;
}

function convertHtmlInner(html) {
    // Convert inner elements (headings, paragraphs, etc.)
    var out = html;
    out = out.replace(/<(h[1-6])(\s[^>]*)?>(((?!<\/h[1-6]>)[\s\S])*)<\/h[1-6]>/gi, function (_, tag, attrStr, inner) {
        return convertHeading(tag.toLowerCase(), inner, extractAttrs(attrStr || ''));
    });
    out = out.replace(/<p(\s[^>]*)?>(((?!<\/p>)[\s\S])*)<\/p>/gi, function (_, attrStr, inner) {
        if (inner.indexOf('wp:') >= 0) return _;
        return convertParagraph(inner, extractAttrs(attrStr || ''));
    });
    out = out.replace(/<hr\s*([^>]*)\/?>/gi, function (_, attrStr) {
        return convertSeparator(extractAttrs(attrStr));
    });
    out = out.replace(/<a\s+class="([a-z\-]*(?:btn|cta)[a-z\-]*)"([^>]*)>([\s\S]*?)<\/a>/gi, function (_, className, attrStr, inner) {
        return convertButton(inner, extractAttrs('class="' + className + '"' + attrStr));
    });
    return out;
}

function parsePadding(paddingStr) {
    var parts = paddingStr.trim().split(/\s+/);
    if (parts.length === 1) return { top: parts[0], right: parts[0], bottom: parts[0], left: parts[0] };
    if (parts.length === 2) return { top: parts[0], right: parts[1], bottom: parts[0], left: parts[1] };
    if (parts.length === 4) return { top: parts[0], right: parts[1], bottom: parts[2], left: parts[3] };
    return {};
}

// ================================================================
// FILE PROCESSING
// ================================================================

function processFile(srcPath, destPath) {
    console.log('  Converting: ' + path.relative(THEME_DIR, srcPath));
    var html = fs.readFileSync(srcPath, 'utf-8');

    // Remove @part directive (only for template-parts)
    html = html.replace(/<!--\s*@part\s+\w+\s*-->\n?/, '');

    var blockMarkup = convertHtml(html, {
        isPart: srcPath.indexOf(path.join(SRC_DIR, 'parts')) === 0,
    });

    fs.mkdirSync(path.dirname(destPath), { recursive: true });
    fs.writeFileSync(destPath, blockMarkup, 'utf-8');
    console.log('  Output:     ' + path.relative(BLOCKS_OUT_DIR, destPath));
}

function main() {
    console.log('\n=== HTML to WordPress Blocks Converter ===\n');
    console.log('  Source: ' + path.relative(THEME_DIR, SRC_DIR));
    console.log('  Output root: ' + path.relative(THEME_DIR, BLOCKS_OUT_DIR) + '\n');
    console.log('  Build scope: ' + BUILD_SCOPE + '\n');

    var templatesDir = path.join(SRC_DIR, 'templates');
    var partsDir = path.join(SRC_DIR, 'parts');
    var outPartsDir = path.join(BLOCKS_OUT_DIR, 'parts');
    var outTemplatesDir = path.join(BLOCKS_OUT_DIR, 'templates');

    fs.mkdirSync(outPartsDir, { recursive: true });
    fs.mkdirSync(outTemplatesDir, { recursive: true });

    // Process parts first so template inlining always uses latest output.
    if (BUILD_SCOPE !== 'templates' && fs.existsSync(partsDir)) {
        fs.readdirSync(partsDir).forEach(function (file) {
            if (file.endsWith('.html')) {
                processFile(
                    path.join(partsDir, file),
                    path.join(outPartsDir, file)
                );
            }
        });
    }

    if (BUILD_SCOPE !== 'parts' && fs.existsSync(templatesDir)) {
        fs.readdirSync(templatesDir).forEach(function (file) {
            if (file.endsWith('.html')) {
                processFile(
                    path.join(templatesDir, file),
                    path.join(outTemplatesDir, file)
                );
            }
        });
    }

    console.log('\nDone!\n');
}

main();
