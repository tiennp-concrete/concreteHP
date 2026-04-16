# Concrete HP Block-Based Theme - Setup Instructions

## Theme Structure

### Directories Created:
- `/wordpress/wp-content/themes/concrete-child/` - Main theme folder
- `/wordpress/wp-content/themes/concrete-child/patterns/` - Block patterns
- `/wordpress/wp-content/themes/concrete-child/blocks/` - Custom blocks (ready for expansion)
- `/wordpress/wp-content/themes/concrete-child/templates/` - Block templates
- `/wordpress/wp-content/themes/concrete-child/parts/` - Template parts (header, footer)

### Key Files:
1. **theme.json** - WordPress 6.5 block theme configuration
   - Color palette (8 colors)
   - Typography settings (8 font sizes)
   - Spacing presets (7 sizes)
   - Gradient presets (2 gradients)

2. **Block Patterns** (in `/patterns/`):
   - `hero.php` - Hero section with title, subtitle, CTA
   - `services.php` - 3-column services showcase
   - `culture.php` - Culture section with image and content
   - `footer.php` - Multi-column footer

3. **Templates** (in `/templates/`):
   - `index.html` - Homepage block template
   - `single.html` - Single post/page template

4. **Template Parts** (in `/parts/`):
   - `header.html` - Site header with navigation
   - `footer.html` - Site footer

5. **Functions & Styles**:
   - `functions.php` - Pattern registration, block support
   - `editor-style.css` - Block editor styles
   - `style.css` - Front-end styles, theme metadata

## WordPress Setup

### Docker Services (Running):
- **WordPress**: http://localhost:8825
- **phpMyAdmin**: http://localhost:8081
- **Database**: MySQL 5.7 (credentials in .env)

### Theme Status:
✅ Standalone block-based theme (no parent dependency)
✅ WordPress 6.9.4 support
✅ 4 block patterns registered
✅ Block editor styling configured
✅ Header and footer template parts created

## Next Steps

### 1. Activate Theme in WordPress Admin
```
1. Go to http://localhost:8825/wp-admin/
2. Navigate to Appearance → Themes
3. Find "Concrete HP Child" theme
4. Click "Activate"
```

### 2. Test Block Patterns
```
1. Create a new post/page
2. Go to Patterns tab in Gutenberg Editor
3. Look for "Concrete" category
4. Insert hero, services, culture, or footer patterns
```

### 3. Customize Colors & Typography
Edit `theme.json` to adjust:
- Color palette
- Font sizes
- Spacing scales
- Gradients

### 4. Add Custom Blocks (Optional)
Create block definitions in `/blocks/` with:
- `block.json` - Block metadata
- `render.php` - Block output

To register blocks, update `functions.php` with:
```php
register_block_type( __DIR__ . '/blocks/your-block' );
```

## SCSS Development

### Compile CSS:
```bash
cd /Users/apple/Documents/Concrete/concreteHp
npm run sass
```

### Watch for changes:
```bash
npm run sass:watch
```

### Output:
CSS compiles to `/assets/css/main.css` (15 KB minified)

## Theme Features

### Supported:
- Block templates
- Editor styles
- Wide templates
- Custom colors (8 presets)
- Custom spacing (7 presets)
- Custom typography (8 font sizes)
- Block patterns
- Theme.json configuration
- Responsive design

### Color Palette:
- **Primary Dark**: #1a1a2e (main brand color)
- **Primary Light**: #e8f0f5 (light background)
- **Accent Orange**: #ff9f43 (CTA buttons)
- **Text Dark**: #333333 (main text)
- **Text Light**: #999999 (secondary text)
- **BG Light**: #f8f9fa (backgrounds)
- **Success**: #26de81 (success states)
- **Error**: #fc5c65 (error states)

### Typography:
- System font stack (SF Pro, Segoe UI, etc.)
- 8 responsive font sizes
- 1.2-1.6 line heights for readability

## Testing the Theme

### WordPress Admin:
1. Login: http://localhost:8825/wp-admin/
2. Username: (check wp database)
3. Default pass: wordpress (if fresh install)

### Front-end:
- Homepage: http://localhost:8825/
- Check pattern layouts rendering correctly
- Test responsive design on mobile/tablet

### Block Editor:
- Create new page
- Insert patterns from "Concrete" category
- Edit pattern content
- Verify color/typography presets applied

## Theme Directory Structure

```
concrete-child/
├── assets/
│   └── css/
│       └── main.css (10 KB compiled from SCSS)
├── patterns/
│   ├── hero.php
│   ├── services.php
│   ├── culture.php
│   └── footer.php
├── blocks/
│   └── (custom blocks go here)
├── templates/
│   ├── index.html
│   └── single.html
├── parts/
│   ├── header.html
│   └── footer.html
├── style.css (theme metadata)
├── theme.json (WordPress 6.5 config)
├── functions.php (PHP setup & hooks)
├── editor-style.css (block editor styles)
├── header.php (legacy template, can be removed)
├── footer.php (legacy template, can be removed)
├── index.php (legacy template, can be removed)
└── theme.js (frontend JavaScript)
```

## File Changes Summary

### Modified Files:
- `functions.php` - Added pattern registration, editor styles, block support
- `style.css` - Added block-based theme metadata

### New Files Created:
- `theme.json` - Block theme configuration
- `editor-style.css` - Block editor styling
- `patterns/hero.php`
- `patterns/services.php`
- `patterns/culture.php`
- `patterns/footer.php`
- `templates/index.html`
- `templates/single.html`
- `parts/header.html`
- `parts/footer.html`

### Legacy Files (Can be removed or kept):
- `header.php`
- `footer.php`
- `index.php`
- `single.php`

These traditional templates are not used by block-based theme but can serve as fallback.

---

**Theme by**: Concrete Design Studio  
**WordPress Version**: 6.9.4  
**Block Theme**: Yes (WordPress 6.5+)  
**License**: GPL v2 or later
