<?php
$dot_img = '/wp-content/themes/concrete-child/assets/images/img_animation.png';
$stats   = is_array($attributes['stats'] ?? null) ? $attributes['stats'] : [];
?>
<section <?php echo get_block_wrapper_attributes(['class' => 'about']); ?>>
  <div class="container about-grid">

    <div class="about-media">
      <div class="about-dot ad-1"><img src="<?php echo esc_url($dot_img); ?>" alt="" /></div>
      <div class="about-dot ad-2"><img src="<?php echo esc_url($dot_img); ?>" alt="" /></div>
      <div class="about-dot ad-3"><img src="<?php echo esc_url($dot_img); ?>" alt="" /></div>
      <img src="<?php echo esc_url($attributes['image'] ?? ''); ?>" alt="About us" />
    </div>

    <div class="about-text">
      <p class="about-eyebrow"><?php echo wp_kses_post($attributes['eyebrow'] ?? ''); ?></p>
      <h2 class="about-heading"><?php echo wp_kses_post($attributes['heading'] ?? ''); ?></h2>
      <h2 class="about-heading-sub"><?php echo wp_kses_post($attributes['headingSub'] ?? ''); ?></h2>
      <p class="about-desc"><?php echo wp_kses_post($attributes['description'] ?? ''); ?></p>

      <?php if (!empty($stats)) : ?>
        <div class="about-stats">
          <?php foreach ($stats as $stat) : ?>
            <div class="about-stat">
              <span class="about-stat-number"><?php echo wp_kses_post($stat['number'] ?? ''); ?></span>
              <span class="about-stat-label"><?php echo wp_kses_post($stat['label'] ?? ''); ?></span>
            </div>
          <?php endforeach; ?>
        </div>
      <?php endif; ?>

      <a class="btn btn-primary" href="<?php echo esc_url($attributes['ctaUrl'] ?? '#'); ?>">
        <?php echo wp_kses_post($attributes['ctaText'] ?? ''); ?>
      </a>
    </div>

  </div>
</section>
