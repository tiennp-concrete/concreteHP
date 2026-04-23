<?php
$services = is_array($attributes['services'] ?? null) ? $attributes['services'] : [];
?>
<section <?php echo get_block_wrapper_attributes(['class' => 'services']); ?>>
  <div class="container">
    <div class="services-head">
      <p class="eyebrow"><?php echo wp_kses_post($attributes['eyebrow'] ?? ''); ?></p>
      <h2 class="section-title"><?php echo wp_kses_post($attributes['heading'] ?? ''); ?></h2>
      <p class="services-subtitle"><?php echo wp_kses_post($attributes['headingSub'] ?? ''); ?></p>
    </div>
    <div class="services-grid">
      <?php foreach ($services as $svc) : ?>
        <article class="service-card">
          <div class="service-icon">
            <?php if (!empty($svc['icon'])) : ?>
              <img src="<?php echo esc_url($svc['icon']); ?>" alt="" />
            <?php endif; ?>
          </div>
          <h3><?php echo wp_kses_post($svc['title'] ?? ''); ?></h3>
          <p><?php echo wp_kses_post($svc['text'] ?? ''); ?></p>
          <div class="service-link-wrap">
            <a class="service-arrow" href="<?php echo esc_url($svc['url'] ?? '#'); ?>" aria-label="Read more">
              <span>&#8594;</span>
            </a>
          </div>
        </article>
      <?php endforeach; ?>
    </div>
    <?php if (!empty($attributes['footerText'])) : ?>
      <p class="services-footer"><?php echo wp_kses_post($attributes['footerText']); ?></p>
    <?php endif; ?>
  </div>
</section>
