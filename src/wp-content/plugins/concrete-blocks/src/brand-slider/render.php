<?php
$logos = is_array($attributes['logos'] ?? null) ? $attributes['logos'] : [];
?>
<section <?php echo get_block_wrapper_attributes(['class' => 'zh-brands']); ?>>
  <div class="zh-container">
    <div class="zh-brands-viewport">
      <div class="zh-brands-track">
        <?php foreach ($logos as $i => $logo) : ?>
          <img class="zh-brand-logo" src="<?php echo esc_url($logo['image'] ?? ''); ?>" alt="Brand <?php echo intval($i) + 1; ?>" />
        <?php endforeach; ?>
      </div>
    </div>
  </div>
</section>
