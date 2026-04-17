<?php
$services = is_array($attributes['services'] ?? null) ? $attributes['services'] : [];
$company  = is_array($attributes['company']  ?? null) ? $attributes['company']  : [];
$offices  = is_array($attributes['offices']  ?? null) ? $attributes['offices']  : [];

$socials = [
  ['label' => 'Facebook', 'url' => 'https://www.facebook.com/', 'svg' => '<svg viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>'],
  ['label' => 'YouTube',  'url' => 'https://www.youtube.com/', 'svg' => '<svg viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>'],
  ['label' => 'LinkedIn', 'url' => 'https://www.linkedin.com/', 'svg' => '<svg viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>'],
];
?>
<footer id="colophon" <?php echo get_block_wrapper_attributes(['class' => 'site-footer']); ?>>
  <div class="footer-main">
    <div class="footer-brand">
      <div class="footer-logo">
        <a href="/"><?php echo wp_kses_post($attributes['brandLogo'] ?? ''); ?></a>
      </div>
      <p><?php echo wp_kses_post($attributes['brandDescription'] ?? ''); ?></p>
      <div class="footer-social">
        <?php foreach ($socials as $s) : ?>
          <a href="<?php echo esc_url($s['url']); ?>" target="_blank" rel="noopener noreferrer" aria-label="<?php echo esc_attr($s['label']); ?>"><?php echo $s['svg']; ?></a>
        <?php endforeach; ?>
      </div>
    </div>

    <div class="footer-column">
      <h3><?php echo wp_kses_post($attributes['servicesHeading'] ?? ''); ?></h3>
      <ul>
        <?php foreach ($services as $item) : ?>
          <li><a href="<?php echo esc_url($item['url'] ?? '#'); ?>"><?php echo wp_kses_post($item['text'] ?? ''); ?></a></li>
        <?php endforeach; ?>
      </ul>
    </div>

    <div class="footer-column">
      <h3><?php echo wp_kses_post($attributes['companyHeading'] ?? ''); ?></h3>
      <ul>
        <?php foreach ($company as $item) : ?>
          <li><a href="<?php echo esc_url($item['url'] ?? '#'); ?>"><?php echo wp_kses_post($item['text'] ?? ''); ?></a></li>
        <?php endforeach; ?>
      </ul>
    </div>
  </div>

  <div class="footer-offices">
    <h3><?php echo wp_kses_post($attributes['officesHeading'] ?? ''); ?></h3>
    <div class="offices-grid">
      <?php foreach ($offices as $office) : ?>
        <div class="office-item">
          <div class="office-city"><?php echo wp_kses_post($office['city'] ?? ''); ?></div>
          <div class="office-address"><?php echo wp_kses_post($office['address'] ?? ''); ?></div>
        </div>
      <?php endforeach; ?>
    </div>
  </div>

  <div class="footer-bottom">
    <p><?php echo wp_kses_post($attributes['copyright'] ?? ''); ?></p>
    <div class="footer-bottom-links">
      <a href="#"><?php echo wp_kses_post($attributes['privacyLink'] ?? ''); ?></a>
      <a href="#"><?php echo wp_kses_post($attributes['termsLink'] ?? ''); ?></a>
    </div>
  </div>
</footer>
