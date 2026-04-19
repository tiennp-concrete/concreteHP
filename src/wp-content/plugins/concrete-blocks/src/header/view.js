/* Header — sticky on scroll-up/scroll-down, plus mobile drawer toggle */
const header = document.querySelector('.zh-header');

if (header) {
  // Sticky behavior
  let lastY = 0;
  window.addEventListener('scroll', () => {
    const y = window.pageYOffset;
    header.classList.toggle('is-sticky', y > 100);
    header.classList.toggle('is-hidden', y > 200 && y > lastY);
    lastY = y;
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
