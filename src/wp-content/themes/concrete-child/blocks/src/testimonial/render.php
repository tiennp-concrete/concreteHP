<?php
$img  = get_stylesheet_directory_uri() . '/assets/images';
$avatar   = $img . '/testimonial_s1.jpg';
$main_img = $img . '/shape5.png';
$quote = $img . '/quote.svg';
$autoplay = intval($attributes['autoplay'] ?? 0);

$slides = [
  ['quote' => $attributes['quote1'] ?? '', 'name' => $attributes['name1'] ?? '', 'role' => $attributes['role1'] ?? ''],
  ['quote' => $attributes['quote2'] ?? '', 'name' => $attributes['name2'] ?? '', 'role' => $attributes['role2'] ?? ''],
];
?>
<section <?php echo get_block_wrapper_attributes(['class' => 'testimonial']); ?>>
        <!-- Background decor — MoveTop slow -->
        <div class="shade_animation">
          <div class="shade_wrap_inner">
            <img class="tm-shape4" src="<?php echo esc_url($img . '/Shape-4.svg'); ?>" alt="shape4" />
          </div>
        </div>
  <div class="container">
    <div class="testimonial-grid">

      <!-- Left: floating avatars around shape5 blob -->
      <div class="testimonial-media">
        <!-- Avatars — positions matching  shade_animation -->
        <img class="tm-float tm-1 animation" src="<?php echo esc_url($img . '/team_s7.png'); ?>"   alt="" />
        <img class="tm-float tm-2 animation" src="<?php echo esc_url($img . '/team_s8.png'); ?>"   alt="" />
        <img class="tm-float tm-3 animation" src="<?php echo esc_url($img . '/team_s5-1.png'); ?>" alt="" />
        <img class="tm-float tm-4 animation"            src="<?php echo esc_url($img . '/team_s6.png'); ?>"   alt="" />
        <img class="tm-float tm-5"            src="<?php echo esc_url($img . '/team_s9.png'); ?>"   alt="" />
        <img class="tm-float tm-6"            src="<?php echo esc_url($img . '/ani_s2.png'); ?>"    alt="" />
        <!-- Main blob -->
         <div class="t-main-image-wrap">
          <img class="t-main-image" src="<?php echo esc_url($main_img); ?>" alt="" />
        </div>
      </div>

      <!-- Right: text + carousel -->
      <div class="testimonial-text">
        <p class="eyebrow"><?php echo wp_kses_post($attributes['eyebrow'] ?? ''); ?></p>
        <h2 class="section-title"><?php echo wp_kses_post($attributes['heading'] ?? ''); ?></h2>
        <h2 class="section-title"><?php echo wp_kses_post($attributes['headingSub'] ?? ''); ?></h2>

        <div class="t-carousel" data-autoplay="<?php echo esc_attr($autoplay); ?>">
          <div class="t-carousel-viewport">
            <div class="t-carousel-track">
              <?php foreach ($slides as $s) : ?>
                <article class="t-card">
                  <div class="t-quote-icon"><img src="<?php echo esc_url($quote); ?>" alt="quote" /></div>
                  <p class="t-quote"><?php echo wp_kses_post($s['quote']); ?></p>
                  <div class="t-author">
                    <img src="<?php echo esc_url($avatar); ?>" alt="" />
                    <div class="t-info">
                      <p class="t-name"><?php echo wp_kses_post($s['name']); ?></p>
                      <p class="t-role"><?php echo wp_kses_post($s['role']); ?></p>
                    </div>
                  </div>
                </article>
              <?php endforeach; ?>
            </div>
          </div>
          <div class="t-navs">
            <button class="t-nav" data-prev aria-label="Previous">&#8592;</button>
            <button class="t-nav" data-next aria-label="Next">&#8594;</button>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>
