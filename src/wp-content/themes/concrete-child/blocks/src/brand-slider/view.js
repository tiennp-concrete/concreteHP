/* Brand slider — pause CSS marquee on hover */
document.querySelectorAll('.brands-viewport').forEach((viewport) => {
  const track = viewport.querySelector('.brands-track');
  if (!track) return;
  viewport.addEventListener('mouseenter', () => track.style.animationPlayState = 'paused');
  viewport.addEventListener('mouseleave', () => track.style.animationPlayState = 'running');
});
