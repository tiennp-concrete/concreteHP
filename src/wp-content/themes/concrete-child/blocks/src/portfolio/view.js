/* Portfolio filter — toggle card visibility by data-category */
document.querySelectorAll('.portfolio').forEach((root) => {
  root.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter');
    if (!btn) return;
    const cat = btn.dataset.filter;
    root.querySelectorAll('.filter').forEach(b => b.classList.toggle('is-active', b === btn));
    root.querySelectorAll('.port-card').forEach(card =>
      card.classList.toggle('is-hidden', cat !== 'all' && card.dataset.category !== cat)
    );
  });
});
