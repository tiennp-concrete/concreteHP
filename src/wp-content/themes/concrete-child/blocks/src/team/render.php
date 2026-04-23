<?php
$shapes = is_array($attributes['shapes'] ?? null) ? $attributes['shapes'] : [];
$iconDot = '/wp-content/themes/concrete-child/assets/images/icon_ani.png';
$iconAnimation = '/wp-content/themes/concrete-child/assets/images/img_animation.png';
$iconShade1 = '/wp-content/themes/concrete-child/assets/images/shade1.png';
?>
<section <?php echo get_block_wrapper_attributes(['class' => 'team']); ?>>

  <!-- Section-level decorative dots (left side), positioned relative to .team section -->
  <div class="shape-float team-dot-1 animation">
    <img src="<?php echo esc_url($iconDot); ?>" alt="circle" />
  </div>
  <div class="shape-float team-dot-2 animation">
    <img src="<?php echo esc_url($iconDot); ?>" alt="circle" />
  </div>
  <div class="shape-float team-dot-3 animation">
    <img src="<?php echo esc_url($iconAnimation); ?>" alt="ani" />
  </div>
  <div class="shape-float team-dot-4 animation">
    <img src="<?php echo esc_url($iconShade1); ?>" alt="Shade" />
  </div>

  <div class="container">
    <div class="team-grid">
      <div class="team-text">
        <p class="eyebrow"><?php echo wp_kses_post($attributes['eyebrow'] ?? ''); ?></p>
        <h2 class="section-title"><?php echo wp_kses_post($attributes['heading'] ?? ''); ?></h2>
        <h2 class="section-title"><?php echo wp_kses_post($attributes['headingSub'] ?? ''); ?></h2>
        <p><?php echo wp_kses_post($attributes['description'] ?? ''); ?></p>
        <a class="btn btn-primary" href="#team-list"><?php echo wp_kses_post($attributes['ctaText'] ?? ''); ?></a>
      </div>
      <div class="team-media">
        <?php foreach ($shapes as $shape) : ?>
          <div class="shape-float <?php echo esc_attr($shape['variant'] ?? ''); ?>">
            <img src="<?php echo esc_url($shape['image'] ?? ''); ?>" alt="" />
          </div>
        <?php endforeach; ?>
        <img class="team-media-main" src="<?php echo esc_url($attributes['heroImage'] ?? ''); ?>" alt="Team" />
      </div>
    </div>
  </div>
</section>
