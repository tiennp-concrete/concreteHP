<?php
$services = is_array($attributes['services'] ?? null) ? $attributes['services'] : [];
?>
<section <?php echo get_block_wrapper_attributes(['class' => 'zh-services']); ?>>
  <div class="zh-container">
    <div class="zh-services-head">
      <p class="zh-eyebrow"><?php echo wp_kses_post($attributes['eyebrow'] ?? ''); ?></p>
      <h2 class="zh-section-title"><?php echo wp_kses_post($attributes['heading'] ?? ''); ?></h2>
      <p class="zh-services-subtitle"><?php echo wp_kses_post($attributes['headingSub'] ?? ''); ?></p>
    </div>
    <div class="zh-services-grid">
      <?php foreach ($services as $svc) : ?>
        <article class="zh-service-card">
          <div class="zh-service-icon">
            <?php if (!empty($svc['icon'])) : ?>
              <img src="<?php echo esc_url($svc['icon']); ?>" alt="" />
            <?php endif; ?>
          </div>
          <h3><?php echo wp_kses_post($svc['title'] ?? ''); ?></h3>
          <p><?php echo wp_kses_post($svc['text'] ?? ''); ?></p>
          <a class="zh-service-arrow" href="#" aria-label="Read more">→</a>
        </article>
      <?php endforeach; ?>
    </div>
    <?php if (!empty($attributes['footerText'])) : ?>
      <p class="zh-services-footer"><?php echo wp_kses_post($attributes['footerText']); ?></p>
    <?php endif; ?>
  </div>
</section>
