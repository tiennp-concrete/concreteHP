<?php
$logos = is_array($attributes['logos'] ?? null) ? $attributes['logos'] : [];
?>
<section <?php echo get_block_wrapper_attributes(['class' => 'brands']); ?>>
  <div class="container">
    <div class="brands-viewport">
      <div class="brands-track">
        <?php foreach ($logos as $i => $logo) : ?>
          <img class="brand-logo" src="<?php echo esc_url($logo['image'] ?? ''); ?>" alt="Brand <?php echo intval($i) + 1; ?>" />
        <?php endforeach; ?>
      </div>
    </div>
  </div>
</section>
