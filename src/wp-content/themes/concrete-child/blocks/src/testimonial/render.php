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
<section <?php echo get_block_wrapper_attributes(['class' => 'testimonial']); ?>>
  <div class="container">
    <div class="testimonial-grid">
      <div class="testimonial-media">
        <div class="shape-float tm-1 float-ud"><img src="<?php echo esc_url($shape_base . '/team_s7.png'); ?>" alt="" /></div>
        <div class="shape-float tm-2 float-small"><img src="<?php echo esc_url($shape_base . '/team_s8.png'); ?>" alt="" /></div>
        <div class="shape-float tm-3 float-top"><img src="<?php echo esc_url($shape_base . '/team_s5-1.png'); ?>" alt="" /></div>
        <div class="shape-float tm-4 float-circle"><img src="<?php echo esc_url($shape_base . '/team_s6.png'); ?>" alt="" /></div>
        <img class="t-main-image" src="<?php echo esc_url($main_img); ?>" alt="Testimonials" />
      </div>
      <div class="testimonial-text">
        <p class="eyebrow"><?php echo wp_kses_post($attributes['eyebrow'] ?? ''); ?></p>
        <h2 class="section-title"><?php echo wp_kses_post($attributes['heading'] ?? ''); ?></h2>
        <h2 class="section-title"><?php echo wp_kses_post($attributes['headingSub'] ?? ''); ?></h2>
        <div class="t-carousel" data-autoplay="<?php echo esc_attr($autoplay); ?>">
          <div class="t-carousel-viewport">
            <div class="t-carousel-track">
              <?php foreach ($slides as $s) : ?>
                <article class="t-card">
                  <div class="t-quote-icon">&ldquo;</div>
                  <p class="t-quote"><?php echo wp_kses_post($s['quote']); ?></p>
                  <div class="t-author">
                    <img src="<?php echo esc_url($avatar); ?>" alt="" />
                    <div>
                      <p class="t-name"><?php echo wp_kses_post($s['name']); ?></p>
                      <p class="t-role"><?php echo wp_kses_post($s['role']); ?></p>
                    </div>
                  </div>
                </article>
              <?php endforeach; ?>
            </div>
          </div>
          <div class="t-navs">
            <button class="t-nav" data-prev aria-label="Previous">&#8249;</button>
            <button class="t-nav" data-next aria-label="Next">&#8250;</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
