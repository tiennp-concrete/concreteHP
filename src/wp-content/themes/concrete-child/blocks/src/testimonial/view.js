/* Testimonial carousel — native scroll + optional autoplay */
document.querySelectorAll('.t-carousel').forEach((root) => {
  const viewport = root.querySelector('.t-carousel-viewport');
  if (!viewport) return;

  const step = () => viewport.clientWidth;

  root.querySelector('[data-prev]')?.addEventListener('click', () => viewport.scrollBy({ left: -step(), behavior: 'smooth' }));
  root.querySelector('[data-next]')?.addEventListener('click', () => viewport.scrollBy({ left: step(), behavior: 'smooth' }));

  const ms = +root.dataset.autoplay || 0;
  if (ms) setInterval(() => {
    const max = viewport.scrollWidth - viewport.clientWidth;
    viewport.scrollTo({
      left: viewport.scrollLeft >= max - 5 ? 0 : viewport.scrollLeft + step(),
      behavior: 'smooth',
    });
  }, ms);
});
