document.querySelectorAll('.t-carousel').forEach((root) => {
  const track = root.querySelector('.t-carousel-track');
  if (!track) return;

  let current = 0;
  const total = track.children.length;

  function goTo(idx) {
    current = (idx + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
  }

  root.querySelector('[data-prev]')?.addEventListener('click', () => goTo(current - 1));
  root.querySelector('[data-next]')?.addEventListener('click', () => goTo(current + 1));

  const ms = +root.dataset.autoplay || 0;
  if (ms) setInterval(() => goTo(current + 1), ms);
});
