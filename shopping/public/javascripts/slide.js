export default class Slide {
  constructor(panels, slideList, prevButton, nextButton, width, speed) {
    this.panels = panels;
    this.slideList = slideList;
    this.prevButton = prevButton;
    this.nextButton = nextButton;
    this.slideWidth = width;
    this.slideSpeed = speed;
    this.currIndex = 0;
  }

  init() {
    this.slideList.style.width = `${this.slideWidth} * (${this.panels.length + 2})px`;

    let firstChild = this.slideList.firstElementChild;
    let lastChild = this.slideList.lastElementChild;
    let clonedFirst = firstChild.cloneNode(true);
    let clonedLast = lastChild.cloneNode(true);

    // add cloned slides
    this.slideList.appendChild(clonedFirst);
    this.slideList.insertBefore(clonedLast, this.slideList.firstElementChild);

    this.slideList.style.transform = `translateX(-${this.slideWidth}px)`;

    const currSlide = this.panels[this.currIndex];
    currSlide.classList.add("slide_active");
    return currSlide;
  }

  moveToNext() {
    const slideLen = this.panels.length;
    let currSlide = this.init();
    this.nextButton.addEventListener("click", () => {
      if (this.currIndex <= slideLen - 1) {
        this.slideList.style.transition = this.slideSpeed + "ms";
        this.slideList.style.transform = `translateX(-${this.slideWidth * (this.currIndex + 2)}px)`;
      }
      if (this.currIndex === slideLen - 1) {
        setTimeout(() => {
          this.slideList.style.transition = "0ms";
          this.slideList.style.transform = `translateX(-${this.slideWidth}px)`;
        }, this.slideSpeed);
        this.currIndex = -1;
      }
      currSlide.classList.remove("slide_active");
      currSlide = this.panels[++this.currIndex];
      currSlide.classList.add("slide_active");
    });
  }

  moveToPrev() {
    const slideLen = this.panels.length;
    let currSlide = this.init();
    this.prevButton.addEventListener("click", () => {
      if (this.currIndex >= 0) {
        this.slideList.style.transition = this.slideSpeed + "ms";
        this.slideList.style.transform = `translateX(-${this.slideWidth * this.currIndex}px)`;
      }

      if (this.currIndex === 0) {
        setTimeout(() => {
          this.slideList.style.transition = "0ms";
          this.slideList.style.transform = `translateX(-${this.slideWidth * slideLen}px)`;
        }, this.slideSpeed);
        this.currIndex = slideLen;
      }
      currSlide.classList.remove("slide_active");
      currSlide = this.panels[--this.currIndex];
      currSlide.classList.add("slide_active");
    });
  }
}
