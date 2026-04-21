/* Pricing — monthly / annual toggle */
document.querySelectorAll('[data-pricing-toggle]').forEach((group) => {
  group.addEventListener('click', (e) => {
    const btn = e.target.closest('.zh-pt-btn');
    if (!btn) return;
    group.querySelectorAll('.zh-pt-btn').forEach(b => b.classList.toggle('is-active', b === btn));
    group.closest('.zh-pricing')
      ?.querySelector('[data-period-target]')
      ?.setAttribute('data-period-target', btn.dataset.period);
  });
});
