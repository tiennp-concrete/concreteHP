document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('[data-header]');
  if (!header) return;

  // ── Sticky / hide-on-scroll ──────────────────────────────────────────
  let lastY   = window.scrollY;
  let ticking = false;

  const update = () => {
    const y      = window.scrollY;
    const diff   = y - lastY;
    const sticky = y > 80;

    header.classList.toggle('is-sticky', sticky);
    header.classList.toggle('is-hidden', sticky && diff > 0 && y > 200);

    lastY   = y;
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  }, { passive: true });

  // ── Mobile drawer ────────────────────────────────────────────────────
  const toggle  = header.querySelector('.mobile-toggle');
  const overlay = header.querySelector('[data-drawer-close]');
  const openCls = 'is-menu-open';

  const open  = () => {
    header.classList.add(openCls);
    toggle?.setAttribute('aria-expanded', 'true');
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  };
  const close = () => {
    header.classList.remove(openCls);
    toggle?.setAttribute('aria-expanded', 'false');
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
  };

  toggle?.addEventListener('click', open);
  overlay?.addEventListener('click', close);
  header.querySelector('.drawer-close')?.addEventListener('click', close);

  // ── Mobile submenu toggle ────────────────────────────────────────────
  header.querySelectorAll('.menu-item-has-children > a').forEach(link => {
    link.addEventListener('click', e => {
      if (window.innerWidth > 1024) return;
      e.preventDefault();
      const li = link.closest('.menu-item-has-children');
      li.classList.toggle('is-open');
    });
  });
});