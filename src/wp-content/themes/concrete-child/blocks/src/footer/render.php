<?php
$logo_url        = $attributes['logoUrl'] ?? '';
$company_items   = is_array($attributes['companyItems']   ?? null) ? $attributes['companyItems']   : [];
$resources_items = is_array($attributes['resourcesItems'] ?? null) ? $attributes['resourcesItems'] : [];

$socials = [
  ['label' => 'Facebook',  'svg' => '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>'],
  ['label' => 'Twitter',   'svg' => '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>'],
  ['label' => 'LinkedIn',  'svg' => '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>'],
  ['label' => 'Instagram', 'svg' => '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/></svg>'],
  ['label' => 'RSS',       'svg' => '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M4 11a9 9 0 0 1 9 9M4 4a16 16 0 0 1 16 16"/><circle cx="5" cy="19" r="2"/></svg>'],
];
?>
<footer <?php echo get_block_wrapper_attributes(['class' => 'footer']); ?>>
  <div class="footer-shade" aria-hidden="true">
    <img class="fs-1" src="/wp-content/themes/concrete-child/assets/images/img_animation.png" alt="" />
    <img class="fs-2" src="/wp-content/themes/concrete-child/assets/images/img_animation.png" alt="" />
    <img class="fs-3" src="/wp-content/themes/concrete-child/assets/images/icon_ani.png" alt="" />
    <img class="fs-4" src="/wp-content/themes/concrete-child/assets/images/shade1.png" alt="" />
  </div>
  <div class="container footer-grid">
    <div class="footer-brand">
      <a class="logo" href="/">
        <?php if (!empty($logo_url)) : ?>
          <img src="<?php echo esc_url($logo_url); ?>" alt="<?php echo esc_attr($attributes['brand'] ?? ''); ?>" />
        <?php else : ?>
          <span class="logo-text"><?php echo esc_html($attributes['brand'] ?? ''); ?></span>
        <?php endif; ?>
      </a>
      <p class="footer-tag"><?php echo wp_kses_post($attributes['tagline'] ?? ''); ?></p>
      <div class="footer-social">
        <?php foreach ($socials as $s) : ?>
          <a href="#" aria-label="<?php echo esc_attr($s['label']); ?>"><?php echo $s['svg']; ?></a>
        <?php endforeach; ?>
      </div>
      <p class="footer-copyright"><?php echo wp_kses_post($attributes['copyright'] ?? ''); ?></p>
    </div>

    <div class="footer-col">
      <h4><?php echo wp_kses_post($attributes['colCompanyHeading'] ?? ''); ?></h4>
      <ul>
        <?php foreach ($company_items as $item) : ?>
          <li><a href="<?php echo esc_url($item['url'] ?? '#'); ?>"><?php echo wp_kses_post($item['text'] ?? ''); ?></a></li>
        <?php endforeach; ?>
      </ul>
    </div>

    <div class="footer-col">
      <h4><?php echo wp_kses_post($attributes['colResourcesHeading'] ?? ''); ?></h4>
      <ul>
        <?php foreach ($resources_items as $item) : ?>
          <li><a href="<?php echo esc_url($item['url'] ?? '#'); ?>"><?php echo wp_kses_post($item['text'] ?? ''); ?></a></li>
        <?php endforeach; ?>
      </ul>
    </div>

    <div class="footer-col footer-newsletter">
      <h4><?php echo wp_kses_post($attributes['newsletterHeading'] ?? ''); ?></h4>
      <p><?php echo wp_kses_post($attributes['newsletterText'] ?? ''); ?></p>
      <form class="newsletter-form" onsubmit="return false;">
        <input type="email" placeholder="Enter your email" aria-label="Email" />
        <button type="submit" aria-label="Subscribe">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
        </button>
      </form>
      <ul class="footer-contact">
        <li>
          <i>&#128222;</i>
          <span><?php echo wp_kses_post($attributes['phone'] ?? ''); ?></span>
        </li>
        <li>
          <i>&#9993;</i>
          <a href="mailto:<?php echo esc_attr($attributes['email'] ?? ''); ?>"><?php echo wp_kses_post($attributes['email'] ?? ''); ?></a>
        </li>
      </ul>
    </div>
  </div>
</footer>
<a href="#" class="back-to-top" aria-label="Back to top">
  <svg class="btt-ring" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle class="btt-ring__track" cx="27" cy="27" r="24"/>
    <circle class="btt-ring__fill"  cx="27" cy="27" r="24"/>
  </svg>
  <svg class="btt-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
    <polyline points="18 15 12 9 6 15"/>
  </svg>
</a>
