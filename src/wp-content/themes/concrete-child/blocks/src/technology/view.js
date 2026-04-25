document.querySelectorAll('.technology').forEach((root) => {
  const tabs      = root.querySelectorAll('.tech-tab');
  const panels    = root.querySelectorAll('.tech-panel');
  const techRight = root.querySelector('.tech-right');

  // Scroll-reveal: add .is-revealed when section enters viewport → triggers CSS animation
  if (techRight) {
    techRight.classList.add('will-animate');
    const reveal = new IntersectionObserver((entries, obs) => {
      if (!entries[0].isIntersecting) return;
      techRight.classList.add('is-revealed');
      obs.unobserve(techRight);
    }, { threshold: 0.15 });
    reveal.observe(techRight);
  }

  // Tab switching: remove → reflow → re-add is-active so techSlideInRight re-fires
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      if (tab.classList.contains('is-active')) return;

      const idx = tab.dataset.tab;

      tabs.forEach(t => t.classList.remove('is-active'));
      tab.classList.add('is-active');

      panels.forEach(p => p.classList.remove('is-active'));
      const next = root.querySelector(`.tech-panel[data-panel="${idx}"]`);
      if (next) {
        void next.offsetHeight; // force reflow between remove and add so animation restarts
        next.classList.add('is-active');
      }
    });
  });
});
