export default class Slide {
  constructor(carouselState, longClickState = undefined) {
    this.carouselState = carouselState;
    this.longClickState = longClickState;
  }

  initCarouselState(startNum, slideContents) {
    this.carouselState.currIndex = startNum;
    this.carouselState.currSlide = slideContents[this.carouselState.currIndex];
    this.carouselState.currSlide.classList.add("slide_active");
  }

  setTotalWidth(slideWidth, slideLen) {
    this.carouselState.slideList.style.width = `${slideWidth * (slideLen + 2)}px`;
  }

  cloneChildren(slideList) {
    return new Promise((resolve, reject) => {
      const firstChild = slideList.firstElementChild;
      const lastChild = slideList.lastElementChild;
      const clonedFirst = firstChild.cloneNode(true);
      const clonedLast = lastChild.cloneNode(true);
      resolve({ clonedFirst, clonedLast });
    });
  }

  addClones(children) {
    const { clonedFirst, clonedLast } = children;
    this.carouselState.slideList.appendChild(clonedFirst);
    this.carouselState.slideList.insertBefore(clonedLast, this.carouselState.slideList.firstElementChild);
  }

  transform(slideWidth, value) {
    this.carouselState.slideList.style.transform = `translateX(-${slideWidth * value}px)`;
  }

  addTransition() {
    // this.carouselState.slideList.style.transition = `${ms}ms`;
    this.carouselState.slideList.classList.add("transition");
  }

  removeTransition() {
    this.carouselState.slideList.classList.remove("transition");
  }
}
