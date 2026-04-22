<?php
$projects    = is_array($attributes['projects'] ?? null) ? $attributes['projects'] : [];
$decor_image = $attributes['decorImage'] ?? '';
?>
<section id="projects" <?php echo get_block_wrapper_attributes(['class' => 'portfolio']); ?>>
  <div class="container">
    <div class="portfolio-head">
      <p class="eyebrow"><?php echo wp_kses_post($attributes['eyebrow'] ?? ''); ?></p>
      <h2 class="section-title"><?php echo wp_kses_post($attributes['heading'] ?? ''); ?></h2>
      <h2 class="section-title"><?php echo wp_kses_post($attributes['headingSub'] ?? ''); ?></h2>
    </div>

    <?php if (!empty($decor_image)) : ?>
      <div class="portfolio-decor"><img src="<?php echo esc_url($decor_image); ?>" alt="" /></div>
    <?php endif; ?>

    <div class="portfolio-filters" data-filter-group>
      <button class="filter is-active" data-filter="all">All Projects</button>
      <button class="filter" data-filter="branding">Branding</button>
      <button class="filter" data-filter="development">Development</button>
      <button class="filter" data-filter="ui">UI Design</button>
      <button class="filter" data-filter="web">Web Design</button>
    </div>

    <div class="portfolio-grid">
      <?php foreach ($projects as $p) :
        $classes = 'port-card';
        if (($p['size'] ?? '') === 'wide') {
          $classes .= ' port-wide';
        }
      ?>
        <a class="<?php echo esc_attr($classes); ?>" data-category="<?php echo esc_attr($p['category'] ?? ''); ?>" href="#">
          <img src="<?php echo esc_url($p['image'] ?? ''); ?>" alt="<?php echo esc_attr($p['title'] ?? ''); ?>" />
          <div class="port-meta">
            <span class="port-tag"><?php echo wp_kses_post($p['tag'] ?? ''); ?></span>
            <h3><?php echo wp_kses_post($p['title'] ?? ''); ?></h3>
          </div>
        </a>
      <?php endforeach; ?>
    </div>
  </div>
</section>
