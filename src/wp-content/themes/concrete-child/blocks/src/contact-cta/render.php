<?php
$hero_image  = $attributes['heroImage'] ?? '';
$decor_image = $attributes['decorImage'] ?? '';
$phone_tel   = preg_replace('/[^0-9+]/', '', $attributes['phone'] ?? '');
?>
<section id="contact" <?php echo get_block_wrapper_attributes(['class' => 'contact-cta']); ?>>
  <div class="container">
    <div class="contact-grid">
      <div class="contact-media">
        <?php if (!empty($hero_image)) : ?>
          <img class="contact-decor" src="<?php echo esc_url($hero_image); ?>" alt="" />
        <?php endif; ?>
        <form class="contact-form" action="#" method="post" onsubmit="return false;">
          <input type="text"  name="name"    placeholder="<?php echo esc_attr($attributes['namePlaceholder'] ?? ''); ?>" required />
          <input type="email" name="email"   placeholder="<?php echo esc_attr($attributes['emailPlaceholder'] ?? ''); ?>" required />
          <input type="text"  name="subject" placeholder="<?php echo esc_attr($attributes['subjectPlaceholder'] ?? ''); ?>" required />
          <textarea name="message" placeholder="<?php echo esc_attr($attributes['messagePlaceholder'] ?? ''); ?>"></textarea>
          <button class="btn btn-primary" type="submit"><?php echo wp_kses_post($attributes['submitText'] ?? 'Send request'); ?></button>
        </form>
      </div>

      <div class="contact-text">
        <p class="eyebrow"><?php echo wp_kses_post($attributes['eyebrow'] ?? ''); ?></p>
        <?php if (!empty($decor_image)) : ?>
          <img class="contact-decor-inline" src="<?php echo esc_url($decor_image); ?>" alt="" />
        <?php endif; ?>
        <h2 class="section-title"><?php echo wp_kses_post($attributes['heading'] ?? ''); ?></h2>
        <h2 class="section-title"><?php echo wp_kses_post($attributes['headingSub'] ?? ''); ?></h2>
        <p><?php echo wp_kses_post($attributes['description'] ?? ''); ?></p>
        <p class="contact-phone-label"><?php echo wp_kses_post($attributes['phoneLabel'] ?? ''); ?></p>
        <a class="contact-phone" href="tel:<?php echo esc_attr($phone_tel); ?>">
          <span class="phone-icon">&#128222;</span>
          <?php echo wp_kses_post($attributes['phone'] ?? ''); ?>
        </a>
      </div>
    </div>
  </div>
</section>
