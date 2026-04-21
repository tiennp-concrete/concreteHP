<?php
$shapes = is_array($attributes['shapes'] ?? null) ? $attributes['shapes'] : [];
?>
<section <?php echo get_block_wrapper_attributes(['class' => 'hero']); ?>>
  <?php foreach ($shapes as $shape) : ?>
    <div class="shape-float <?php echo esc_attr($shape['variant'] ?? ''); ?>">
      <img src="<?php echo esc_url($shape['image'] ?? ''); ?>" alt="" />
    </div>
  <?php endforeach; ?>

  <div class="container hero-grid">
    <div class="hero-text">
      <p class="eyebrow animated" data-animation="fadeInUp"><?php echo wp_kses_post($attributes['eyebrow'] ?? ''); ?></p>
      <h1 class="hero-title animated" data-animation="fadeInUp" data-animation-delay="200"><?php echo wp_kses_post($attributes['title'] ?? ''); ?></h1>
      <h2 class="hero-title-sub animated" data-animation="fadeInUp" data-animation-delay="300"><?php echo wp_kses_post($attributes['titleSub'] ?? ''); ?></h2>
      <p class="hero-sub animated" data-animation="fadeInUp" data-animation-delay="400"><?php echo wp_kses_post($attributes['subtitle'] ?? ''); ?></p>
      <div class="hero-ctas animated" data-animation="fadeInRight" data-animation-delay="600">
        <a class="btn btn-primary" href="#contact"><?php echo wp_kses_post($attributes['primaryCta'] ?? ''); ?></a>
        <a class="hero-video" href="<?php echo esc_url($attributes['videoUrl'] ?? '#'); ?>" target="_blank" rel="noopener">
          <span class="play-icon">
            <svg viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg"><path d="M2 1.3v11.4a.6.6 0 00.9.5l9.6-5.7a.6.6 0 000-1L2.9.8a.6.6 0 00-.9.5z"/></svg>
          </span>
          <span><?php echo wp_kses_post($attributes['videoLabel'] ?? ''); ?></span>
        </a>
      </div>
    </div>
    <div class="hero-media">
      <img src="<?php echo esc_url($attributes['heroImage'] ?? ''); ?>" alt="Our team" />
    </div>
  </div>
</section>
