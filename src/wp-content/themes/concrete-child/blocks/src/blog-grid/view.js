/* Blog slider — native horizontal scroll */
document.querySelectorAll('[data-blog-slider]').forEach((root) => {
  const track = root.querySelector('.blog-track');
  if (!track?.children.length) return;

  const step = () => {
    const card = track.children[0];
    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    return card.getBoundingClientRect().width + gap;
  };

  root.querySelector('[data-blog-prev]')?.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));
  root.querySelector('[data-blog-next]')?.addEventListener('click', () => track.scrollBy({ left: step(), behavior: 'smooth' }));
});
