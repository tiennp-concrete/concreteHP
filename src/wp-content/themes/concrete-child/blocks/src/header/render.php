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
          'theme_location' => 'primary',   // tên menu location
          'menu_class'     => '',
          'container'      => false,
          'fallback_cb'    => false,
        ]);
        ?>
      </nav>

      <div class="header-cta">
        <a class="btn btn-outline" href="#contact"><?php echo esc_html($cta_text); ?></a>
      </div>
    </div>

    <div class="header-overlay" data-drawer-close></div>
  </div>
</header>