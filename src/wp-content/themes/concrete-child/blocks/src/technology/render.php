<?php
$eyebrow      = $attributes['eyebrow']      ?? '';
$heading      = $attributes['heading']      ?? '';
$headingSub   = $attributes['headingSub']   ?? '';
$introBullets = is_array($attributes['introBullets'] ?? null) ? $attributes['introBullets'] : [];
$categories   = is_array($attributes['categories']   ?? null) ? $attributes['categories']   : [];
?>
<section <?php echo get_block_wrapper_attributes(['class' => 'technology']); ?>>
  <div class="container">
    <div class="tech-wrap">

      <div class="tech-left">
        <p class="eyebrow"><?php echo wp_kses_post($eyebrow); ?></p>
        <h2 class="section-title"><?php echo wp_kses_post($heading); ?></h2>
        <h2 class="section-title"><?php echo wp_kses_post($headingSub); ?></h2>

        <?php if (!empty($introBullets)) : ?>
          <ul class="tech-bullets">
            <?php foreach ($introBullets as $i => $bullet) : ?>
              <li class="tech-bullet-item">
                <span class="tech-bullet-num">0<?php echo $i + 1; ?></span>
                <span class="tech-bullet-text"><?php echo wp_kses_post($bullet['text'] ?? ''); ?></span>
              </li>
            <?php endforeach; ?>
          </ul>
        <?php endif; ?>
      </div>

      <div class="tech-right">
        <div class="tech-grid">
          <?php foreach ($categories as $cat) : ?>
            <div class="tech-card">
              <div class="tech-card-header">
                <h3><?php echo wp_kses_post($cat['name'] ?? ''); ?></h3>
              </div>
              <div class="tech-card-body">
                <div class="tech-icons">
                  <?php foreach (($cat['icons'] ?? []) as $icon) :
                    if (empty($icon['src'])) continue;
                  ?>
                    <img src="<?php echo esc_url($icon['src']); ?>"
                         alt="<?php echo esc_attr($icon['alt'] ?? ''); ?>"
                         loading="lazy" />
                  <?php endforeach; ?>
                </div>
              </div>
            </div>
          <?php endforeach; ?>
        </div>
      </div>

    </div>
  </div>
</section>
