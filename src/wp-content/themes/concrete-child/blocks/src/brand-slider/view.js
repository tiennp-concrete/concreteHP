/* Brand slider — pause CSS marquee on hover */
document.querySelectorAll('.zh-brands-viewport').forEach((viewport) => {
  const track = viewport.querySelector('.zh-brands-track');
  if (!track) return;
  viewport.addEventListener('mouseenter', () => track.style.animationPlayState = 'paused');
  viewport.addEventListener('mouseleave', () => track.style.animationPlayState = 'running');
});
