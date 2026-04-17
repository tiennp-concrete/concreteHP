<?php
$projects    = is_array($attributes['projects'] ?? null) ? $attributes['projects'] : [];
$decor_image = $attributes['decorImage'] ?? '';
?>
<section id="projects" <?php echo get_block_wrapper_attributes(['class' => 'zh-portfolio']); ?>>
  <div class="zh-container">
    <div class="zh-portfolio-head">
      <p class="zh-eyebrow"><?php echo wp_kses_post($attributes['eyebrow'] ?? ''); ?></p>
      <h2 class="zh-section-title"><?php echo wp_kses_post($attributes['heading'] ?? ''); ?></h2>
      <h2 class="zh-section-title"><?php echo wp_kses_post($attributes['headingSub'] ?? ''); ?></h2>
    </div>

    <?php if (!empty($decor_image)) : ?>
      <div class="zh-portfolio-decor"><img src="<?php echo esc_url($decor_image); ?>" alt="" /></div>
    <?php endif; ?>

    <div class="zh-portfolio-filters" data-filter-group>
      <button class="zh-filter is-active" data-filter="all">All Projects</button>
      <button class="zh-filter" data-filter="branding">Branding</button>
      <button class="zh-filter" data-filter="development">Development</button>
      <button class="zh-filter" data-filter="ui">UI Design</button>
      <button class="zh-filter" data-filter="web">Web Design</button>
    </div>

    <div class="zh-portfolio-grid">
      <?php foreach ($projects as $p) :
        $classes = 'zh-port-card';
        if (($p['size'] ?? '') === 'wide') {
          $classes .= ' zh-port-wide';
        }
      ?>
        <a class="<?php echo esc_attr($classes); ?>" data-category="<?php echo esc_attr($p['category'] ?? ''); ?>" href="#">
          <img src="<?php echo esc_url($p['image'] ?? ''); ?>" alt="<?php echo esc_attr($p['title'] ?? ''); ?>" />
          <div class="zh-port-meta">
            <span class="zh-port-tag"><?php echo wp_kses_post($p['tag'] ?? ''); ?></span>
            <h3><?php echo wp_kses_post($p['title'] ?? ''); ?></h3>
          </div>
        </a>
      <?php endforeach; ?>
    </div>
  </div>
</section>
