<?php
$shapes = is_array($attributes['shapes'] ?? null) ? $attributes['shapes'] : [];
?>
<section <?php echo get_block_wrapper_attributes(['class' => 'zh-team']); ?>>
  <div class="zh-container">
    <div class="zh-team-grid">
      <div class="zh-team-text">
        <p class="zh-eyebrow"><?php echo wp_kses_post($attributes['eyebrow'] ?? ''); ?></p>
        <h2 class="zh-section-title"><?php echo wp_kses_post($attributes['heading'] ?? ''); ?></h2>
        <h2 class="zh-section-title"><?php echo wp_kses_post($attributes['headingSub'] ?? ''); ?></h2>
        <p><?php echo wp_kses_post($attributes['description'] ?? ''); ?></p>
        <a class="zh-btn zh-btn-primary" href="#team-list"><?php echo wp_kses_post($attributes['ctaText'] ?? ''); ?></a>
      </div>
      <div class="zh-team-media">
        <?php foreach ($shapes as $shape) : ?>
          <div class="zh-shape-float <?php echo esc_attr($shape['variant'] ?? ''); ?>">
            <img src="<?php echo esc_url($shape['image'] ?? ''); ?>" alt="" />
          </div>
        <?php endforeach; ?>
        <img class="zh-team-media-main" src="<?php echo esc_url($attributes['heroImage'] ?? ''); ?>" alt="Team" />
      </div>
    </div>
  </div>
</section>
