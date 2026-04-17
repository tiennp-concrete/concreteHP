<div <?php echo get_block_wrapper_attributes(['class' => 'site-header-wrap']); ?>>
  <header class="site-header bg-transparent" id="site-header">
    <nav class="main-navigation">
      <div class="nav-container">
        <div class="logo">
          <a href="/" class="site-title" aria-label="ConcreteHP homepage">
            <span class="logo-mark"><?php echo wp_kses_post($attributes['logoMark'] ?? ''); ?></span>
            <span class="logo-subtitle"><?php echo wp_kses_post($attributes['logoSubtitle'] ?? ''); ?></span>
          </a>
        </div>
        <div class="nav-right">
          <ul id="primary-menu">
            <li><a href="/#business"><?php echo wp_kses_post($attributes['menuBusiness'] ?? ''); ?></a></li>
            <li><a href="/#projects"><?php echo wp_kses_post($attributes['menuProjects'] ?? ''); ?></a></li>
            <li><a href="/#environment"><?php echo wp_kses_post($attributes['menuEnvironment'] ?? ''); ?></a></li>
            <li><a href="/#news"><?php echo wp_kses_post($attributes['menuNews'] ?? ''); ?></a></li>
            <li><a href="/careers"><?php echo wp_kses_post($attributes['menuCareers'] ?? ''); ?></a></li>
          </ul>
          <div class="language-switcher">
            <a href="/" class="active"><?php echo wp_kses_post($attributes['langVi'] ?? ''); ?></a>
            <span class="separator">|</span>
            <a href="/en/"><?php echo wp_kses_post($attributes['langEn'] ?? ''); ?></a>
          </div>
          <a class="header-action" href="/careers"><?php echo wp_kses_post($attributes['ctaText'] ?? ''); ?></a>
          <button class="menu-toggle" aria-label="Menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>
  </header>
  <section class="mobile-menu-overlay" id="mobile-menu">
    <button class="mobile-menu-close" aria-label="Close menu">&times;</button>
    <ul>
      <li><a href="/#business"><?php echo wp_kses_post($attributes['menuBusiness'] ?? ''); ?></a></li>
      <li><a href="/#projects"><?php echo wp_kses_post($attributes['menuProjects'] ?? ''); ?></a></li>
      <li><a href="/#environment"><?php echo wp_kses_post($attributes['menuEnvironment'] ?? ''); ?></a></li>
      <li><a href="/#news"><?php echo wp_kses_post($attributes['menuNews'] ?? ''); ?></a></li>
      <li><a href="/careers"><?php echo wp_kses_post($attributes['menuCareers'] ?? ''); ?></a></li>
    </ul>
    <div class="mobile-lang-switcher">
      <a href="/" class="active"><?php echo wp_kses_post($attributes['langVi'] ?? ''); ?></a>
      <a href="/en/"><?php echo wp_kses_post($attributes['langEn'] ?? ''); ?></a>
    </div>
  </section>
</div>
