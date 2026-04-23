import Swiper from 'swiper';
import { Autoplay } from 'swiper/modules';

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.brands-swiper').forEach((el) => {
    new Swiper(el, {
      modules: [Autoplay],
      slidesPerView: 6,
      spaceBetween: 72,
      loop: true,
      speed: 800,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      breakpoints: {
        0:    { slidesPerView: 2, spaceBetween: 30 },
        640:  { slidesPerView: 3, spaceBetween: 40 },
        1024: { slidesPerView: 5, spaceBetween: 60 },
        1280: { slidesPerView: 6, spaceBetween: 72 },
      },
    });
  });
});
