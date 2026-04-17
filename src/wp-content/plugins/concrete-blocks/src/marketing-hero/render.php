<?php
$shapes = is_array($attributes['shapes'] ?? null) ? $attributes['shapes'] : [];
?>
<section <?php echo get_block_wrapper_attributes(['class' => 'zh-hero']); ?>>
  <?php foreach ($shapes as $shape) : ?>
    <div class="zh-shape-float <?php echo esc_attr($shape['variant'] ?? ''); ?>">
      <img src="<?php echo esc_url($shape['image'] ?? ''); ?>" alt="" />
    </div>
  <?php endforeach; ?>

  <div class="zh-container zh-hero-grid">
    <div class="zh-hero-text">
      <p class="zh-eyebrow"><?php echo wp_kses_post($attributes['eyebrow'] ?? ''); ?></p>
      <h1 class="zh-hero-title"><?php echo wp_kses_post($attributes['title'] ?? ''); ?></h1>
      <h2 class="zh-hero-title-sub"><?php echo wp_kses_post($attributes['titleSub'] ?? ''); ?></h2>
      <p class="zh-hero-sub"><?php echo wp_kses_post($attributes['subtitle'] ?? ''); ?></p>
      <div class="zh-hero-ctas">
        <a class="zh-btn zh-btn-primary" href="#contact"><?php echo wp_kses_post($attributes['primaryCta'] ?? ''); ?></a>
        <a class="zh-hero-video" href="<?php echo esc_url($attributes['videoUrl'] ?? '#'); ?>" target="_blank" rel="noopener">
          <span class="zh-play-icon">
            <svg viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg"><path d="M2 1.3v11.4a.6.6 0 00.9.5l9.6-5.7a.6.6 0 000-1L2.9.8a.6.6 0 00-.9.5z"/></svg>
          </span>
          <span><?php echo wp_kses_post($attributes['videoLabel'] ?? ''); ?></span>
        </a>
      </div>
    </div>
    <div class="zh-hero-media">
      <img src="<?php echo esc_url($attributes['heroImage'] ?? ''); ?>" alt="Our team" />
    </div>
  </div>
</section>
