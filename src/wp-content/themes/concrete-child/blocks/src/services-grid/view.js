document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.service-card');
  if (!cards.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const card = entry.target;
          const delay = parseInt(card.dataset.animDelay ?? 0);
          setTimeout(() => card.classList.add('is-visible'), delay);
          observer.unobserve(card);
        }
      });
    },
    { threshold: 0.15 }
  );

  cards.forEach((card, i) => {
    card.dataset.animDelay = i * 200;
    card.classList.add('will-animate');
    observer.observe(card);
  });
});
