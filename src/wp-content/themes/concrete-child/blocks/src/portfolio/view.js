document.querySelectorAll('.portfolio').forEach((root) => {
  const filters   = root.querySelectorAll('.filter');
  const cards     = root.querySelectorAll('.port-card');
  const magicLine = root.querySelector('.port-magic-line');

  function moveMagicLine(link) {
    if (!magicLine || !link) return;
    const navRect  = magicLine.parentElement.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();
    magicLine.style.width = linkRect.width + 'px';
    magicLine.style.left  = (linkRect.left - navRect.left) + 'px';
  }

  function filterCards(cat) {
    // Instantly reset all cards to hidden — bypass the fade-out transition so
    // cards start at opacity:0 and the fade-in always plays on first click.
    cards.forEach((card) => {
      card.style.transitionDuration = '0s';
      card.style.transitionDelay = '';
      card.classList.remove('is-visible');
      const match = cat === 'all' || card.dataset.category === cat;
      if (!match) {
        card.classList.add('is-hidden');
      } else {
        card.classList.remove('is-hidden');
      }
    });

    // Force reflow so the instant-hide is committed before we restore transitions
    void document.body.offsetHeight;

    // Restore transitions and stagger fade-in matching cards
    let visibleIdx = 0;
    cards.forEach((card) => {
      if (card.classList.contains('is-hidden')) return;
      card.style.transitionDuration = '';
      const delay = visibleIdx * 70;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          card.style.transitionDelay = delay + 'ms';
          card.classList.add('is-visible');
        });
      });
      visibleIdx++;
    });

    const totalDuration = visibleIdx * 70 + 500;
    setTimeout(() => {
      cards.forEach(c => (c.style.transitionDelay = ''));
    }, totalDuration);
  }

  // Init: show all cards with stagger on load
  cards.forEach((card, i) => {
    card.style.transitionDelay = i * 60 + 'ms';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => card.classList.add('is-visible'));
    });
  });

  const activeLink = root.querySelector('.filter.is-active');
  if (activeLink) moveMagicLine(activeLink);

  root.addEventListener('click', (e) => {
    const link = e.target.closest('.filter');
    if (!link) return;
    e.preventDefault();

    filters.forEach(f => f.classList.remove('is-active'));
    link.classList.add('is-active');
    moveMagicLine(link);
    filterCards(link.dataset.filter);
  });
});
