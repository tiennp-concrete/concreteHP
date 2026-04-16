# Concrete HP Child Theme

A modern, responsive WordPress child theme inspired by **Sun Asterisk** digital creative studio design.

## 🎨 Design Features

### Sections Included

1. **Hero Section**
   - Full-width hero with gradient background
   - Main title, subtitle, and dual CTA buttons
   - Smooth animations and hover effects

2. **Services Section**
   - 3-column grid of service cards (Creative Design, Engineering, Innovation)
   - Icon indicators and hover animations
   - Color gradient accents

3. **Projects Section**
   - Dynamic project showcase with featured image support
   - Pull posts automatically from WordPress
   - Responsive grid layout with hover effects

4. **Culture Section**
   - Dark gradient background with glassmorphism effect
   - 3 core values: #ActiveChallenge, #ActiveLearn, #ActiveJoy
   - Semi-transparent cards with backdrop blur

5. **Team Section**
   - Circular member avatars
   - Position titles and descriptions
   - Responsive grid layout

6. **Footer**
   - Multi-column footer with quick links
   - Contact information
   - Social media links
   - Copyright section

### Colors & Typography

```css
Primary Dark:   #001f3f
Primary Blue:   #003d7a
Accent Orange:  #ff6b35
Accent Teal:    #00bcd4
Text Dark:      #1a1a1a
Text Light:     #666666
Background:     #f5f7fa
```

**Font:** System font stack for optimal performance
- `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`

## 📁 File Structure

```
concrete-child/
├── style.css              # Main theme styles (700+ lines)
├── functions.php          # PHP functions & WordPress integration
├── header.php             # Navigation header template
├── footer.php             # Footer template with links
├── index.php              # Homepage with all sections
├── single.php             # Single post/page template
├── navigation.css         # Navigation & responsive styles
├── theme.js              # Mobile menu & smooth scroll
└── README.md             # This file
```

## ⚙️ Features

- **Responsive Design**: Mobile-first, works on all devices
- **Smooth Animations**: CSS transitions and hover effects
- **Modern Navigation**: Sticky header with mobile hamburger menu
- **Dynamic Posts**: Auto-pulls recent posts for projects section
- **Custom Colors**: Easy to customize via CSS variables
- **Accessibility**: Semantic HTML and proper ARIA labels
- **Performance**: Optimized CSS and lightweight JavaScript
- **WP Integration**: Full WordPress template hierarchy support

## 🚀 Getting Started

### 1. Activate Theme

1. Log in to WordPress Admin
2. Go to **Appearance** → **Themes**
3. Find "Concrete HP Child" and click **Activate**

### 2. Configure Site Settings

1. Go to **Settings** → **General**
2. Set Site Title: `Concrete HP`
3. Set Tagline: Your company tagline
4. Save changes

### 3. Set Up Navigation

1. Go to **Appearance** → **Menus**
2. Create a new menu (e.g., "Main Menu")
3. Add pages/links:
   - Home
   - About
   - Services
   - Projects
   - Contact
4. Set as "Primary Menu" under **Display Location**

### 4. Create Content

1. **Go to Posts** → **Add New**
2. Write your first project/article
3. Add a featured image
4. Publish

Projects will automatically appear in the Projects section on homepage.

## 🎯 Customization

### Change Colors

Edit `style.css` and update the CSS variables:

```css
:root {
    --primary-dark: #001f3f;    /* Change this */
    --accent-orange: #ff6b35;   /* And this */
    --accent-teal: #00bcd4;     /* And this */
}
```

Then save and refresh the page.

### Update Hero Content

Edit `index.php` and change the hero section HTML.

### Modify Services

Update the three service cards in the services section of `index.php`.

### Add/Remove Sections

All main sections are in `index.php`. Simply add/remove `<section>` blocks as needed.

## 📱 Responsive Breakpoints

- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px

Layouts automatically adjust for optimal viewing on all devices.

## 🔧 Advanced Customization

### Add Custom Fonts

Add to `functions.php`:

```php
function concrete_child_custom_fonts() {
    wp_enqueue_style(
        'google-fonts',
        'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap'
    );
}
add_action('wp_enqueue_scripts', 'concrete_child_custom_fonts');
```

Then use in `style.css`:
```css
body {
    font-family: 'Poppins', sans-serif;
}
```

### Create Custom Page Templates

Copy `index.php` → `page-custom.php` and customize as needed.

## 🐛 Troubleshooting

**Styles not loading?**
- Hard refresh browser (Cmd+Shift+R on Mac)
- Check WordPress is seeing the theme

**Mobile menu not working?**
- Verify `theme.js` is enqueued in functions.php
- Check browser console for errors

**Posts not showing?**
- Publish at least one post
- Check the WP_Query in index.php is correct

## 📚 Resources

- [WordPress Theme Handbook](https://developer.wordpress.org/themes/)
- [CSS Guide](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [PHP Basics](https://www.php.net/manual/en/language.basics.php)

## 📄 License

GPL v2 or later - WordPress theme license

## 👨‍💻 Credits

Designed and developed as a child theme inspired by modern corporate design patterns.

---

**Have questions?** Check the WordPress admin dashboard or customize in `index.php`, `style.css`, and `functions.php`.

Happy designing! 🎉
