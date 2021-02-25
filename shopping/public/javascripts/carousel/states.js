const carouselState = {
  slideList: null,
  currIndex: 0,
  currSlide: null,
  currDot: null,
  slidePagination: null,
  pageDots: null,
};

const longClickState = {
  isPressed: false,
  timer: {
    next: null,
    prev: null,
  },
  isMoved: {
    next: false,
    prev: false,
  },
};

export { carouselState, longClickState };
