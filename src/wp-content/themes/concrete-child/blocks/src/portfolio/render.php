<?php
$projects    = is_array($attributes['projects'] ?? null) ? $attributes['projects'] : [];
$decor_image = $attributes['decorImage'] ?? '';
?>
<section id="projects" <?php echo get_block_wrapper_attributes(['class' => 'portfolio']); ?>>
  <?php if (!empty($decor_image)) : ?>
    <div class="portfolio-decor"><img src="<?php echo esc_url($decor_image); ?>" alt="" /></div>
  <?php endif; ?>

  <div class="container">
    <div class="portfolio-head">
      <p class="eyebrow animated" data-animation="fadeInUp"><?php echo wp_kses_post($attributes['eyebrow'] ?? ''); ?></p>
      <h2 class="section-title animated" data-animation="fadeInUp" ><?php echo wp_kses_post($attributes['heading'] ?? ''); ?></h2>
      <h2 class="section-title animated" data-animation="fadeInUp" data-animation-delay="200"><?php echo wp_kses_post($attributes['headingSub'] ?? ''); ?></h2>
    </div>

    <div class="portfolio-filters">
      <ul class="port-nav">
        <div class="port-magic-line"></div>
        <li><a href="#" class="filter is-active" data-filter="all">All Projects</a></li>
        <li><a href="#" class="filter" data-filter="branding">Branding</a></li>
        <li><a href="#" class="filter" data-filter="development">Development</a></li>
        <li><a href="#" class="filter" data-filter="ui">UI Design</a></li>
        <li><a href="#" class="filter" data-filter="web">Web Design</a></li>
      </ul>
    </div>
  </div>

  <div class="portfolio-grid">
    <?php foreach ($projects as $p) :
      $is_wide = ($p['size'] ?? '') === 'wide';
    ?>
      <div class="port-card<?php echo $is_wide ? ' port-wide' : ''; ?>"
           data-category="<?php echo esc_attr($p['category'] ?? ''); ?>">
        <div class="port-image">
          <a class="port-overlay" href="#"></a>
          <img src="<?php echo esc_url($p['image'] ?? ''); ?>"
               alt="<?php echo esc_attr($p['title'] ?? ''); ?>" />
        </div>
        <div class="port-meta">
          <div class="port-meta-inner">
            <div class="port-tag"><?php echo wp_kses_post($p['tag'] ?? ''); ?></div>
            <h3 class="port-title"><?php echo wp_kses_post($p['title'] ?? ''); ?></h3>
            <a href="#" class="port-arrow"><span>&#8594;</span></a>
          </div>
        </div>
      </div>
    <?php endforeach; ?>
  </div>
</section>
