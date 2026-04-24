document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;

  const fill = btn.querySelector('.btt-ring__fill');

  // Init progress ring
  if (fill) {
    const r = 24; // matches r="24" in SVG
    const circumference = 2 * Math.PI * r;
    fill.style.strokeDasharray = circumference;
    fill.style.strokeDashoffset = circumference;
  }

  const onScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    btn.classList.toggle('totop-show', scrollTop > 300);

    if (fill && docHeight > 0) {
      const r = 24;
      const circumference = 2 * Math.PI * r;
      const progress = scrollTop / docHeight;
      fill.style.strokeDashoffset = circumference * (1 - progress);
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
