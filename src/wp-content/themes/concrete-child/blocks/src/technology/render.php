<?php
$eyebrow    = $attributes['eyebrow']    ?? '';
$heading    = $attributes['heading']    ?? '';
$headingSub = $attributes['headingSub'] ?? '';
$tabs       = is_array($attributes['tabs'] ?? null) ? $attributes['tabs'] : [];

$bgVas     = '/wp-content/themes/concrete-child/assets/images/pricing_bg_vas.png';
$decor     = '/wp-content/themes/concrete-child/assets/images/pricing_bgbefore.png';
$cardIcons = [
  '/wp-content/themes/concrete-child/assets/images/tech-icon-1.svg',
  '/wp-content/themes/concrete-child/assets/images/tech-icon-2.svg',
];
?>
<section <?php echo get_block_wrapper_attributes(['class' => 'technology']); ?>>
  <div class="container">
    <div class="tech-wrap">

      <div class="tech-left">
        <p class="eyebrow " ><?php echo wp_kses_post($eyebrow); ?></p>
        <h2 class="section-title "><?php echo wp_kses_post($heading); ?></h2>
        <h2 class="section-title " ><?php echo wp_kses_post($headingSub); ?></h2>

        <ul class="tech-tab-nav">
          <?php foreach ($tabs as $i => $tab) : ?>
            <li class="tech-tab<?php echo $i === 0 ? ' is-active' : ''; ?>"
                data-tab="<?php echo $i; ?>">
              <span class="tech-tab-num"><?php echo esc_html($tab['num'] ?? '0' . ($i + 1)); ?></span>
              <span class="tech-tab-label"><?php echo wp_kses_post($tab['label'] ?? ''); ?></span>
            </li>
          <?php endforeach; ?>
        </ul>
      </div>

      <div class="tech-right">
        <?php foreach ($tabs as $i => $tab) :
          $cats = is_array($tab['categories'] ?? null) ? $tab['categories'] : [];
        ?>
          <div class="tech-panel<?php echo $i === 0 ? ' is-active' : ''; ?>"
               data-panel="<?php echo $i; ?>">

            <?php foreach ($cats as $ci => $cat) :
              $heroSrc = $cardIcons[$ci % count($cardIcons)];
            ?>
              <article class="tech-card"
                       style="background-image: url('<?php echo esc_url($bgVas); ?>');">
                <img class="tech-card-decor" src="<?php echo esc_url($decor); ?>" alt="" />

                <div class="tech-card-inner">
                  <div class="tech-card-top">
                    <h3 class="tech-card-name"><?php echo wp_kses_post($cat['name'] ?? ''); ?></h3>
                    <div class="tech-card-hero">
                      <img src="<?php echo esc_url($heroSrc); ?>" alt="" />
                    </div>
                  </div>

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
              </article>
            <?php endforeach; ?>

          </div>
        <?php endforeach; ?>
      </div>

    </div>
  </div>
</section>
