import Swiper from 'swiper';

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.blog-swiper').forEach((el) => {
    const wrap = el.closest('.blog-slider');
    const swiper = new Swiper(el, {
      slidesPerView: 2,
      spaceBetween: 24,
      loop: true,
      speed: 800,
      breakpoints: {
        0:    { slidesPerView: 1, spaceBetween: 16 },
        768:  { slidesPerView: 2, spaceBetween: 20 },
        1024: { slidesPerView: 2, spaceBetween: 24 },
      },
    });
    wrap?.querySelector('[data-blog-prev]')?.addEventListener('click', () => swiper.slidePrev());
    wrap?.querySelector('[data-blog-next]')?.addEventListener('click', () => swiper.slideNext());
  });
});
