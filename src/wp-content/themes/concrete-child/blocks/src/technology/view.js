document.querySelectorAll('.technology').forEach((root) => {
  const tabs   = root.querySelectorAll('.tech-tab');
  const panels = root.querySelectorAll('.tech-panel');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      if (tab.classList.contains('is-active')) return;

      const idx = tab.dataset.tab;

      tabs.forEach(t => t.classList.remove('is-active'));
      tab.classList.add('is-active');

      panels.forEach(p => p.classList.remove('is-active'));
      const next = root.querySelector(`.tech-panel[data-panel="${idx}"]`);
      if (next) {
        // Reset animation on cards so techSlideInRight re-fires each tab switch
        next.querySelectorAll('.tech-card').forEach((card) => {
          card.style.animation = 'none';
          void card.offsetHeight; // force reflow
          card.style.animation = '';
        });
        requestAnimationFrame(() => next.classList.add('is-active'));
      }
    });
  });
});
