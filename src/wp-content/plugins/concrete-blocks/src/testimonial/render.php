<?php
$images_base = get_stylesheet_directory_uri() . '/assets/images';
$shape_base  = $images_base;
$avatar      = $images_base . '/testimonial_s1.jpg';
$main_img    = $images_base . '/shape5.png';
$autoplay    = intval($attributes['autoplay'] ?? 0);

$slides = [
  ['quote' => $attributes['quote1'] ?? '', 'name' => $attributes['name1'] ?? '', 'role' => $attributes['role1'] ?? ''],
  ['quote' => $attributes['quote2'] ?? '', 'name' => $attributes['name2'] ?? '', 'role' => $attributes['role2'] ?? ''],
];
?>
<section <?php echo get_block_wrapper_attributes(['class' => 'zh-testimonial']); ?>>
  <div class="zh-container">
    <div class="zh-testimonial-grid">
      <div class="zh-testimonial-media">
        <div class="zh-shape-float zh-tm-1 zh-float-ud"><img src="<?php echo esc_url($shape_base . '/team_s7.png'); ?>" alt="" /></div>
        <div class="zh-shape-float zh-tm-2 zh-float-small"><img src="<?php echo esc_url($shape_base . '/team_s8.png'); ?>" alt="" /></div>
        <div class="zh-shape-float zh-tm-3 zh-float-top"><img src="<?php echo esc_url($shape_base . '/team_s5-1.png'); ?>" alt="" /></div>
        <div class="zh-shape-float zh-tm-4 zh-float-circle"><img src="<?php echo esc_url($shape_base . '/team_s6.png'); ?>" alt="" /></div>
        <img class="zh-t-main-image" src="<?php echo esc_url($main_img); ?>" alt="Testimonials" />
      </div>
      <div class="zh-testimonial-text">
        <p class="zh-eyebrow"><?php echo wp_kses_post($attributes['eyebrow'] ?? ''); ?></p>
        <h2 class="zh-section-title"><?php echo wp_kses_post($attributes['heading'] ?? ''); ?></h2>
        <h2 class="zh-section-title"><?php echo wp_kses_post($attributes['headingSub'] ?? ''); ?></h2>
        <div class="zh-t-carousel" data-autoplay="<?php echo esc_attr($autoplay); ?>">
          <div class="zh-t-carousel-viewport">
            <div class="zh-t-carousel-track">
              <?php foreach ($slides as $s) : ?>
                <article class="zh-t-card">
                  <div class="zh-t-quote-icon">&ldquo;</div>
                  <p class="zh-t-quote"><?php echo wp_kses_post($s['quote']); ?></p>
                  <div class="zh-t-author">
                    <img src="<?php echo esc_url($avatar); ?>" alt="" />
                    <div>
                      <p class="zh-t-name"><?php echo wp_kses_post($s['name']); ?></p>
                      <p class="zh-t-role"><?php echo wp_kses_post($s['role']); ?></p>
                    </div>
                  </div>
                </article>
              <?php endforeach; ?>
            </div>
          </div>
          <div class="zh-t-navs">
            <button class="zh-t-nav" data-prev aria-label="Previous">&#8249;</button>
            <button class="zh-t-nav" data-next aria-label="Next">&#8250;</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
