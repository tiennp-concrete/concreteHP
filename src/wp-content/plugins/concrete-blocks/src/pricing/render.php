<?php
$plans = is_array($attributes['plans'] ?? null) ? $attributes['plans'] : [];

// Hardcoded SVG icons, keyed by plan index. Keep in sync with index.js ICONS.
$icons = [
  '<svg viewBox="0 0 480 480" fill="currentColor"><path d="M240 112c-26.5 0-48 21.5-48 48s21.5 48 48 48 48-21.5 48-48-21.5-48-48-48zm0 80c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z"/><path d="M325.8 229.2c-2.7-2.7-5.5-5.1-8.4-7.5l.1-.2c26.4-81.4-3.1-170.5-72.9-220-2.8-2-6.5-2-9.3 0-69.7 49.6-99.2 138.6-72.9 220l.1.2c-44 35.3-51 99.6-15.7 143.6 2.3 2.9 4.8 5.7 7.5 8.3a8 8 0 0 0 13.6-4.5l6-42.3c.6-3.9 4-6.9 7.9-6.9h24.4l-6.1 30.4a8 8 0 0 0 7.8 9.6h64a8 8 0 0 0 7.8-9.6l-6.1-30.4h24.4c4 0 7.4 2.9 7.9 6.9l6 42.3a8 8 0 0 0 13.6 4.5c39.8-39.9 39.9-104.6 0-144.4zM240 17.9a180 180 0 0 1 47.3 54H192.7A180 180 0 0 1 240 17.9z"/></svg>',
  '<svg viewBox="0 0 480 480" fill="currentColor"><path d="M429.7 50.3c-7.3-7.3-19.9-7.2-38.1.2a31.8 31.8 0 0 0-44.8-2.8 31.8 31.8 0 0 0-9 34.2c-5.2 3.6-10.4 7.4-15.9 11.5-80.8-45.4-183.1-16.6-228.4 64.2a151.6 151.6 0 0 0 0 164.4c-41.2 56.7-55.5 92.7-41.4 106.8a20 20 0 0 0 14.6 5.2c21.9 0 57.6-21.9 92-47.6a152 152 0 0 0 228.6-63.7 151.6 151.6 0 0 0 .2-164.5c41-56.8 67.5-102.7 50.3-119.9zM368 56a16 16 0 1 1 0 32 16 16 0 0 1 0-32zM240 88a152 152 0 0 1 152 152 152 152 0 0 1-216.8 137.6A600 600 0 0 0 316 240c-13.3-14-44-47.2-72.5-83.3A151.4 151.4 0 0 1 240 88z"/></svg>',
];
?>
<section <?php echo get_block_wrapper_attributes(['class' => 'zh-pricing']); ?>>
  <div class="zh-container">
    <div class="zh-pricing-grid-wrap">
      <div class="zh-pricing-head">
        <p class="zh-eyebrow"><?php echo wp_kses_post($attributes['eyebrow'] ?? ''); ?></p>
        <h2 class="zh-section-title"><?php echo wp_kses_post($attributes['heading'] ?? ''); ?></h2>
        <h2 class="zh-section-title"><?php echo wp_kses_post($attributes['headingSub1'] ?? ''); ?></h2>
        <h2 class="zh-section-title"><?php echo wp_kses_post($attributes['headingSub2'] ?? ''); ?></h2>
      </div>
      <div class="zh-pricing-panel">
        <div class="zh-pricing-toggle" data-pricing-toggle>
          <button class="zh-pt-btn is-active" data-period="monthly">Monthly</button>
          <button class="zh-pt-btn" data-period="annual">Annual</button>
        </div>
        <div class="zh-pricing-cards" data-period-target="monthly">
          <?php foreach ($plans as $i => $plan) : ?>
            <article class="zh-price-card">
              <div class="zh-price-header">
                <div>
                  <h3><?php echo wp_kses_post($plan['title'] ?? ''); ?></h3>
                  <p class="zh-price-amount">
                    <span class="zh-price-monthly"><?php echo wp_kses_post($plan['monthlyPrice'] ?? ''); ?><span class="zh-price-unit"><?php echo wp_kses_post($plan['monthlyUnit'] ?? ''); ?></span></span>
                    <span class="zh-price-annual"><?php echo wp_kses_post($plan['annualPrice'] ?? ''); ?><span class="zh-price-unit"><?php echo wp_kses_post($plan['annualUnit'] ?? ''); ?></span></span>
                  </p>
                </div>
                <div class="zh-price-icon"><?php echo $icons[$i] ?? $icons[0]; ?></div>
              </div>
              <ul class="zh-price-features">
                <?php foreach (($plan['features'] ?? []) as $feat) : ?>
                  <li><?php echo wp_kses_post($feat); ?></li>
                <?php endforeach; ?>
              </ul>
              <a class="zh-btn zh-btn-outline-dark" href="#"><?php echo wp_kses_post($plan['ctaText'] ?? ''); ?></a>
            </article>
          <?php endforeach; ?>
        </div>
      </div>
    </div>
  </div>
</section>
