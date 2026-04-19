<?php
$logo_url = $attributes['logoUrl'] ?? '';
$brand    = $attributes['brand'] ?? 'Concrete';

$logo_markup = !empty($logo_url)
  ? '<img src="' . esc_url($logo_url) . '" alt="' . esc_attr($brand) . '" />'
  : '<span class="zh-logo-text">' . esc_html($brand) . '</span>';
?>
<header <?php echo get_block_wrapper_attributes(['class' => 'zh-header']); ?> data-zh-header>
  <div class="zh-header-inner">
    <a class="zh-logo" href="/"><?php echo $logo_markup; ?></a>

    <button type="button" class="zh-mobile-toggle" aria-label="Open menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>

    <div class="zh-header-menu">
      <div class="zh-drawer-head">
        <a class="zh-drawer-logo" href="/"><?php echo $logo_markup; ?></a>
        <button type="button" class="zh-drawer-close" aria-label="Close menu">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>
        </button>
      </div>

      <nav class="zh-nav">
        <ul>
          <li><a href="#home"><?php echo wp_kses_post($attributes['navHome'] ?? ''); ?></a></li>
          <li><a href="#about"><?php echo wp_kses_post($attributes['navAbout'] ?? ''); ?></a></li>
          <!-- <li class="zh-has-submenu">
            <a href="#projects"><?php #echo wp_kses_post($attributes['navProjects'] ?? ''); ?></a>
            <ul class="zh-submenu">
              <li><a href="#projects-branding">Branding</a></li>
              <li><a href="#projects-development">Development</a></li>
              <li><a href="#projects-ui">UI Design</a></li>
              <li><a href="#projects-web">Web Design</a></li>
            </ul>
          </li> -->
          <li><a href="#team"><?php echo wp_kses_post($attributes['navTeam'] ?? ''); ?></a></li>
          <li><a href="#news"><?php echo wp_kses_post($attributes['navNews'] ?? ''); ?></a></li>
          <li><a href="#contact"><?php echo wp_kses_post($attributes['navContact'] ?? ''); ?></a></li>
        </ul>
      </nav>

      <div class="zh-header-cta">
        <a class="zh-btn zh-btn-outline" href="#contact"><?php echo wp_kses_post($attributes['ctaText'] ?? ''); ?></a>
      </div>
    </div>
  </div>

  <div class="zh-header-overlay" data-zh-drawer-close></div>
</header>
