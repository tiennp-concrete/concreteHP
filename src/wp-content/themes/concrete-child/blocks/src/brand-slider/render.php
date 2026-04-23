<?php
$logos = is_array($attributes['logos'] ?? null) ? $attributes['logos'] : [];
if (empty($logos)) return;
?>
<section <?php echo get_block_wrapper_attributes(['class' => 'brands']); ?>>
  <div class="container">
  <div class="brands-swiper swiper">
    <div class="swiper-wrapper">
      <?php foreach ($logos as $i => $logo) : ?>
        <div class="swiper-slide">
          <img class="brand-logo" src="<?php echo esc_url($logo['image'] ?? ''); ?>" alt="Brand <?php echo intval($i) + 1; ?>" />
        </div>
      <?php endforeach; ?>
    </div>
  </div>
  </div>
</section>
