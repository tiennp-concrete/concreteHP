document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.contact-cta').forEach((section) => {
    const decor = section.querySelector('.contact-decor');
    if (!decor) return;

    let rafId = null;
    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;

    const SPEED = 1; // matches Zahar motion_fx_mousetrack_speed

    function tick() {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      decor.style.transform = `translate(${currentX}px, ${currentY}px)`;
      rafId = requestAnimationFrame(tick);
    }

    section.addEventListener('mouseenter', () => {
      rafId = requestAnimationFrame(tick);
    });

    section.addEventListener('mousemove', (e) => {
      const px = (100 / window.innerWidth) * e.clientX;  // 0–100
      const py = (100 / window.innerHeight) * e.clientY; // 0–100
      targetX = -(px - 50) * SPEED;
      targetY = -(py - 50) * SPEED;
    });

    section.addEventListener('mouseleave', () => {
      targetX = 0;
      targetY = 0;
      // let it ease back, then stop raf when close enough
      const stop = () => {
        if (Math.abs(currentX) < 0.1 && Math.abs(currentY) < 0.1) {
          currentX = currentY = 0;
          decor.style.transform = '';
          cancelAnimationFrame(rafId);
        } else {
          rafId = requestAnimationFrame(stop);
        }
      };
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(stop);
    });
  });
});
