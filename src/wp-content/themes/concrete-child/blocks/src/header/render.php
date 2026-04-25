<?php
$logo_url = $attributes['logoUrl'] ?? '';
$brand    = $attributes['brand'] ?? 'Concrete';
$cta_text = $attributes['ctaText'] ?? 'Start a project';

$logo_markup = !empty($logo_url)
  ? '<img src="' . esc_url($logo_url) . '" alt="' . esc_attr($brand) . '" />'
  : '<span class="logo-text">' . esc_html($brand) . '</span>';
?>
<header <?php echo get_block_wrapper_attributes(['class' => 'header']); ?> data-header>
  <div class="header-inner">
    <a class="logo" href="<?php echo esc_url(home_url('/')); ?>"><?php echo $logo_markup; ?></a>

    <button type="button" class="mobile-toggle" aria-label="Open menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>

    <div class="header-menu">
      <div class="drawer-head">
        <a class="drawer-logo" href="<?php echo esc_url(home_url('/')); ?>"><?php echo $logo_markup; ?></a>
        <button type="button" class="drawer-close" aria-label="Close menu">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <path d="M6 6l12 12M18 6L6 18"/>
          </svg>
        </button>
      </div>

      <nav class="nav">
        <?php
        wp_nav_menu([
          'theme_location' => 'primary',
          'menu_class'     => '',
          'container'      => false,
          'fallback_cb'    => function() {
            // Hiển thị tất cả pages nếu chưa assign menu (fallback an toàn)
            wp_page_menu(['show_home' => true, 'menu_class' => '']);
          },
        ]);
        ?>
      </nav>

      <?php
      $langs = function_exists('pll_the_languages')
        ? pll_the_languages(['raw' => 1, 'hide_current' => 1])
        : [];
      if (!empty($langs)) : ?>
      <div class="lang-switcher">
        <button class="lang-trigger" type="button" aria-label="Select language" aria-expanded="false">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10"/>
            <line x1="2" y1="12" x2="22" y2="12"/>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
          </svg>
          <svg class="lang-chevron" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </button>
        <ul class="lang-dropdown" role="menu">
          <?php foreach ($langs as $lang) : ?>
            <li role="none">
              <a href="<?php echo esc_url($lang['url']); ?>" role="menuitem" hreflang="<?php echo esc_attr($lang['slug']); ?>">
                <?php if (!empty($lang['flag'])) : ?>
                  <img src="<?php echo esc_url($lang['flag']); ?>" alt="" width="18" />
                <?php endif; ?>
                <span><?php echo esc_html($lang['name']); ?></span>
              </a>
            </li>
          <?php endforeach; ?>
        </ul>
      </div>
      <?php endif; ?>

      <div class="header-cta">
        <a class="btn btn-outline" href="#contact"><?php echo esc_html($cta_text); ?></a>
      </div>
    </div>

    <div class="header-overlay" data-drawer-close></div>
  </div>
</header>