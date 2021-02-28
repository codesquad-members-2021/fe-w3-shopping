// import { paginationHtml } from "../utils/htmlMaker.js";
// import setCarouselMaterials from "../setters/setCarouselMaterials.js";
import { carouselState, longClickState } from "../utils/states.js";
import Carousel from "../slides/carousel.js";

const setCarouselMaterials = (slideContents, buttonClassName, specifics, startNum) => {
  return new Promise((resolve, reject) => {
    const buttons = document.querySelector(`.${buttonClassName}`);
    const { slideList, slideWidth } = specifics;
    const carouselMaterials = { slideContents, buttons, slideList, slideWidth, startNum };
    resolve(carouselMaterials);
  });
};

const setCarousel = (slideContents, buttonsClassName, spec, startNum) => (transitionTime, isLongClick, needPagination) => {
  setCarouselMaterials(slideContents, buttonsClassName, spec, startNum).then((materials) => {
    const c_state = Object.assign({}, carouselState);
    if (!isLongClick) {
      const carousel = new Carousel(c_state);
      carousel.create(materials, transitionTime, needPagination, isLongClick);
    }
    if (isLongClick) {
      const l_state = Object.assign({}, longClickState);
      const carousel = new Carousel(c_state, l_state);
      carousel.create(materials, transitionTime, needPagination, isLongClick);
    }
  });
};

export { setCarousel };

// const registerBasicCarousel = () => {
//   htmlMaker
//     .paginationHtml(pagination)
//     .then((contents) => setCarouselMaterials(contents, "buttons_pagination", { slideList, slideWidth: 485 }, 0))
//     .then((materials) => {
//       const state = Object.assign({}, carouselState);
//       const topCarousel = new Carousel(state);
//       topCarousel.create(materials, 300, true, false);
//     });
// };

// const registerLongClickCarousel = () => {
//   const slideContents = document.querySelectorAll(".list_hotDeal");
//   const hotdealList = document.querySelector(".content_hotDeal");
//   setCarouselMaterials(slideContents, "buttons_hotDeal", { slideList: hotdealList, slideWidth: 252 }, 5).then((materials) => {
//     const c_state = Object.assign({}, carouselState);
//     const l_state = Object.assign({}, longClickState);
//     const hotdealCarousel = new Carousel(c_state, l_state);
//     hotdealCarousel.create(materials, 300, false, true);
//   });
// };
