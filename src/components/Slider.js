import Swiper, { Pagination, Autoplay } from 'swiper';

const swiper = new Swiper('.swiper', {
  modules: [Pagination, Autoplay],
  // Optional parameters
  direction: 'horizontal',
  loop: true,

  autoplay: {
    delay: 5000,
  },

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },
});

export default swiper