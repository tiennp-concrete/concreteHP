/* Header — sticky on scroll-up/scroll-down, plus mobile drawer toggle */
const header = document.querySelector('.zh-header');

if (header) {
  // Sticky + hide-on-scroll-down behaviour
  const STICKY_AT = 100;   // px — switch to fixed + background
  const HIDE_AT   = 300;   // px — header stays visible until here
  const MIN_DELTA = 6;     // px — ignore tiny scroll jitter

  let lastY   = window.pageYOffset;
  let ticking = false;

  const update = () => {
    const y     = window.pageYOffset;
    const delta = y - lastY;

    if (Math.abs(delta) >= MIN_DELTA) {
      header.classList.toggle('is-sticky', y > STICKY_AT);

      if (y > HIDE_AT && delta > 0) {
        header.classList.add('is-hidden');
      } else if (delta < 0 || y <= HIDE_AT) {
        header.classList.remove('is-hidden');
      }

      lastY = y;
    }
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });

  // Mobile drawer
  const toggle  = header.querySelector('.zh-mobile-toggle');
  const openCls = 'is-menu-open';
  const open    = () => {
    header.classList.add(openCls);
    toggle?.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };
  const close   = () => {
    header.classList.remove(openCls);
    toggle?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  toggle?.addEventListener('click', () => {
    header.classList.contains(openCls) ? close() : open();
  });

  // Any element flagged with data-zh-drawer-close closes (X button, overlay)
  header.querySelectorAll('[data-zh-drawer-close], .zh-drawer-close').forEach((el) => {
    el.addEventListener('click', close);
  });

  // Close on any nav link click (so anchor jumps feel natural)
  header.querySelectorAll('.zh-nav a').forEach((a) => {
    a.addEventListener('click', close);
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && header.classList.contains(openCls)) close();
  });
}
