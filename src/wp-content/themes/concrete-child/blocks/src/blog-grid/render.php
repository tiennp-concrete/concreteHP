<?php
$posts = is_array($attributes['posts'] ?? null) ? $attributes['posts'] : [];
?>
<section id="news" <?php echo get_block_wrapper_attributes(['class' => 'blog']); ?>>
  <div class="container">
    <div class="blog-grid-wrap">

      <div class="blog-intro">
        <p class="eyebrow" ><?php echo wp_kses_post($attributes['eyebrow'] ?? ''); ?></p>
        <h2 class="section-title" ><?php echo wp_kses_post($attributes['heading'] ?? ''); ?></h2>
        <h2 class="section-title"><?php echo wp_kses_post($attributes['headingSub'] ?? ''); ?></h2>
        <p><?php echo wp_kses_post($attributes['description'] ?? ''); ?></p>
        <a class="btn btn-primary" href="#all-posts"><?php echo wp_kses_post($attributes['ctaText'] ?? ''); ?></a>
      </div>

      <div class="blog-slider">
        <div class="blog-swiper swiper">
          <div class="swiper-wrapper">
            <?php foreach ($posts as $p) : ?>
            <div class="swiper-slide">
              <article class="post-card">
                <div class="post-image">
                  <img src="<?php echo esc_url($p['image'] ?? ''); ?>" alt="<?php echo esc_attr($p['title'] ?? ''); ?>" loading="lazy" />
                </div>
                <div class="post-content">
                  <span class="entry-date"><?php echo wp_kses_post($p['date'] ?? ''); ?></span>
                  <h3 class="entry-title"><a href="#"><?php echo wp_kses_post($p['title'] ?? ''); ?></a></h3>
                  <div class="post-meta">
                    <div class="meta-left">
                      <span class="post-author">By <a href="#"><?php echo wp_kses_post($p['author'] ?? ''); ?></a></span>
                      <span class="post-cat"> &mdash; in <a href="#"><?php echo wp_kses_post($p['cat'] ?? ''); ?></a></span>
                    </div>
                    <div class="meta-right">
                      <span class="entry-comment"><?php echo intval($p['comments'] ?? 0); ?></span>
                    </div>
                  </div>
                </div>
              </article>
            </div>
            <?php endforeach; ?>
          </div>
        </div>
        <div class="blog-navs">
          <button class="blog-nav" data-blog-prev aria-label="Previous">&#8592;</button>
          <button class="blog-nav" data-blog-next aria-label="Next">&#8594;</button>
        </div>
      </div>

    </div>
  </div>
</section>
