# 🎨 Gulp + SCSS Setup Guide

This theme uses **SCSS** (Sass) for styling with **Gulp** as the task runner to compile SCSS to CSS automatically.

## 📦 Installation

### 1. Install Node Packages

From the project root directory:

```bash
npm install
```

This installs all dependencies defined in `package.json`:
- gulp (task runner)
- gulp-sass (SCSS compiler)
- gulp-autoprefixer (add vendor prefixes)
- gulp-clean-css (minify CSS)
- gulp-notify (desktop notifications)
- sass (Dart Sass compiler)
- and more...

## 🚀 Usage

### Start Development Mode (Recommended)

```bash
npm start
```

This runs the default Gulp task which:
1. Compiles **all SCSS files** to CSS
2. Starts **watching** for file changes
3. Auto-compiles when you save `.scss` files
4. Shows success notifications

**Keep this running while you develop!**

### Build Only (No Watch)

```bash
npm run build
```

Compiles SCSS once without watching.

### Watch Only

```bash
npm run watch
```

Watches SCSS files without initial compilation.

## 📁 SCSS Structure

```
assets/
├── scss/
│   ├── main.scss                # 📌 Main entry point (imports all)
│   ├── _variables.scss          # Colors, spacing, typography, mixins
│   ├── _base.scss               # HTML/body reset, base styles
│   ├── _hero.scss               # Hero section + CTA buttons
│   ├── _sections.scss           # Services + Projects sections
│   ├── _culture-team.scss       # Culture + Team sections
│   ├── _footer.scss             # Footer styles
│   ├── _navigation.scss         # Header, menu, utilities, posts
│   └── _responsive.scss         # Media queries for all breakpoints
└── css/
    ├── main.css                 # 📌 Compiled output (enqueued in WordPress)
    └── main.css.map             # Source map for debugging
```

## 🎨 How It Works

1. **You edit SCSS files** in `assets/scss/`
2. **Gulp watches** for changes
3. **SCSS compiles → CSS** in real-time
4. **Browser reloads** and shows your changes
5. **Desktop notification** confirms compilation

## 📝 Writing SCSS

### Use Variables

```scss
// In _variables.scss (already defined):
$color-primary-dark: #001f3f;
$color-accent-orange: #ff6b35;
$spacing-lg: 24px;

// Use them:
.my-component {
  color: $color-primary-dark;
  padding: $spacing-lg;
}
```

### Use Mixins

```scss
// Flexbox center
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

// Use it:
.hero-content {
  @include flex-center;
  flex-direction: column;
}
```

### Nesting

```scss
.main-navigation {
  padding: 0;

  a {
    color: $color-text-dark;
    
    &:hover {
      color: $color-accent-orange;
    }
  }

  &.active {
    background: $color-bg-light;
  }
}
```

### Media Queries

```scss
@media (max-width: $breakpoint-md) {
  .service-card {
    padding: $spacing-md;
    font-size: $font-size-sm;
  }
}
```

## 🔧 Customization

### Change Global Colors

Edit `assets/scss/_variables.scss`:

```scss
$color-primary-dark: #001f3f;    // Your color
$color-accent-orange: #ff6b35;   // Your color
$color-accent-teal: #00bcd4;     // Your color
```

Save and Gulp auto-compiles. No need to restart anything!

### Add New Sections

1. Create `assets/scss/_mynewsection.scss`
2. Write your styles with SCSS
3. Import in `assets/scss/main.scss`:
   ```scss
   @import 'mynewsection';
   ```
4. Save and it compiles automatically

## 🐛 Troubleshooting

### Gulp not running?
```bash
npm start
```

### CSS not updating in browser?
- Hard refresh: **Ctrl+Shift+R** (Windows) or **Cmd+Shift+R** (Mac)
- Check browser console for errors
- Verify `assets/css/main.css` has been updated

### Compilation errors?
- Check terminal output for error messages
- Verify SCSS syntax is correct
- Check for undefined variables or mixins

### Module not found?
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📚 Documentation

- [Sass Documentation](https://sass-lang.com/documentation)
- [SCSS vs CSS](https://sass-lang.com/guide)
- [Gulp Documentation](https://gulpjs.com/docs/en/getting-started/quick-start)

## ✨ Tips

- **Keep `npm start` running** while developing
- **Use variables** for consistency
- **Use mixins** to avoid repetition
- **Organize styles** in separate SCSS files
- **Comment your SCSS** for team collaboration

## 🎯 What Gets Compiled

**Input**: `assets/scss/**/*.scss`  
↓  
**Process**: Sass → CSS → Autoprefixer → Minify  
↓  
**Output**: `assets/css/main.css` (used by WordPress)

---

**Happy styling with SCSS!** 🚀

