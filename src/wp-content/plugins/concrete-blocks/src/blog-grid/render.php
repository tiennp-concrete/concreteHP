<?php
$posts = is_array($attributes['posts'] ?? null) ? $attributes['posts'] : [];
?>
<section id="news" <?php echo get_block_wrapper_attributes(['class' => 'zh-blog']); ?>>
  <div class="zh-container">
    <div class="zh-blog-grid-wrap">
      <div class="zh-blog-intro">
        <p class="zh-eyebrow"><?php echo wp_kses_post($attributes['eyebrow'] ?? ''); ?></p>
        <h2 class="zh-section-title"><?php echo wp_kses_post($attributes['heading'] ?? ''); ?></h2>
        <h2 class="zh-section-title"><?php echo wp_kses_post($attributes['headingSub'] ?? ''); ?></h2>
        <p><?php echo wp_kses_post($attributes['description'] ?? ''); ?></p>
        <a class="zh-btn zh-btn-primary" href="#all-posts"><?php echo wp_kses_post($attributes['ctaText'] ?? ''); ?></a>
      </div>
      <div class="zh-blog-slider" data-zh-blog-slider>
        <div class="zh-blog-track">
          <?php foreach ($posts as $p) : ?>
            <article class="zh-post-card">
              <a class="zh-post-thumb" href="#">
                <img src="<?php echo esc_url($p['image'] ?? ''); ?>" alt="<?php echo esc_attr($p['title'] ?? ''); ?>" />
              </a>
              <div class="zh-post-body">
                <span class="zh-post-date"><?php echo wp_kses_post($p['date'] ?? ''); ?></span>
                <h3><a href="#"><?php echo wp_kses_post($p['title'] ?? ''); ?></a></h3>
                <div class="zh-post-meta">
                  <span class="zh-post-author">By <?php echo wp_kses_post($p['author'] ?? ''); ?></span>
                  <span class="zh-post-cat"><a href="#"><?php echo wp_kses_post($p['cat'] ?? ''); ?></a></span>
                </div>
              </div>
            </article>
          <?php endforeach; ?>
        </div>
        <div class="zh-blog-navs">
          <button class="zh-t-nav" data-blog-prev aria-label="Previous">&#8249;</button>
          <button class="zh-t-nav" data-blog-next aria-label="Next">&#8250;</button>
        </div>
      </div>
    </div>
  </div>
</section>
