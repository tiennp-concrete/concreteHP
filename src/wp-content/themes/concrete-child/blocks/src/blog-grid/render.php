<?php
$posts = is_array($attributes['posts'] ?? null) ? $attributes['posts'] : [];
?>
<section id="news" <?php echo get_block_wrapper_attributes(['class' => 'blog']); ?>>
  <div class="container">
    <div class="blog-grid-wrap">
      <div class="blog-intro">
        <p class="eyebrow"><?php echo wp_kses_post($attributes['eyebrow'] ?? ''); ?></p>
        <h2 class="section-title"><?php echo wp_kses_post($attributes['heading'] ?? ''); ?></h2>
        <h2 class="section-title"><?php echo wp_kses_post($attributes['headingSub'] ?? ''); ?></h2>
        <p><?php echo wp_kses_post($attributes['description'] ?? ''); ?></p>
        <a class="btn btn-primary" href="#all-posts"><?php echo wp_kses_post($attributes['ctaText'] ?? ''); ?></a>
      </div>
      <div class="blog-slider" data-blog-slider>
        <div class="blog-track">
          <?php foreach ($posts as $p) : ?>
            <article class="post-card">
              <a class="post-thumb" href="#">
                <img src="<?php echo esc_url($p['image'] ?? ''); ?>" alt="<?php echo esc_attr($p['title'] ?? ''); ?>" />
              </a>
              <div class="post-body">
                <span class="post-date"><?php echo wp_kses_post($p['date'] ?? ''); ?></span>
                <h3><a href="#"><?php echo wp_kses_post($p['title'] ?? ''); ?></a></h3>
                <div class="post-meta">
                  <span class="post-author">By <?php echo wp_kses_post($p['author'] ?? ''); ?></span>
                  <span class="post-cat"><a href="#"><?php echo wp_kses_post($p['cat'] ?? ''); ?></a></span>
                </div>
              </div>
            </article>
          <?php endforeach; ?>
        </div>
        <div class="blog-navs">
          <button class="t-nav" data-blog-prev aria-label="Previous">&#8249;</button>
          <button class="t-nav" data-blog-next aria-label="Next">&#8250;</button>
        </div>
      </div>
    </div>
  </div>
</section>
