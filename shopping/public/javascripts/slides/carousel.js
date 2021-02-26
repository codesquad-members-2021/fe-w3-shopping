import Slide from "./slide.js";

export default class Carousel extends Slide {
  constructor(carouselState, longClickState) {
    super(carouselState, longClickState);
  }

  moveSlide(itemCnt, slideMaterials, isNext, isPagination, ...conditions) {
    const { slideSpeed, slideWidth, slideLen, slideContents } = slideMaterials;

    if (conditions[0]) {
      this.transition(slideSpeed);
      this.transform(slideWidth, isNext ? this.carouselState.currIndex + 2 + (itemCnt > 1 ? 1 : 0) : this.carouselState.currIndex + (itemCnt > 1 ? -1 : 0));
    }

    if (conditions[1]) {
      if (itemCnt <= 1) {
        setTimeout(() => {
          this.transition(0);
          this.transform(slideWidth, isNext ? 1 : slideLen);
        }, slideSpeed);
      }
      this.carouselState.currIndex = isNext ? -1 : slideLen;
    }

    this.carouselState.currSlide.classList.remove("slide_active");
    if (isPagination) {
      const currIndexStandard = isNext ? -1 : slideLen;
      const newIndex = isNext ? slideLen - 1 : 0;
      this.carouselState.pageDots[this.carouselState.currIndex === currIndexStandard ? newIndex : this.carouselState.currIndex].classList.remove("dot_active");
    }
    this.carouselState.currSlide = slideContents[isNext ? (this.carouselState.currIndex += itemCnt > 1 ? 2 : 1) : (this.carouselState.currIndex -= itemCnt > 1 ? 2 : 1)];
    this.carouselState.currSlide.classList.add("slide_active");
    if (isPagination) this.carouselState.pageDots[this.carouselState.currIndex].classList.add("dot_active");
  }

  movePagination(slideMaterials, { target }) {
    const { slideSpeed, slideWidth, slideContents } = slideMaterials;
    this.carouselState.currDot = document.querySelector(".dot_active");
    this.carouselState.currDot.classList.remove("dot_active");

    const thisNode = target.parentNode;
    this.carouselState.currDot = thisNode;
    thisNode.classList.add("dot_active");

    this.carouselState.currSlide.classList.remove("slide_active");
    this.carouselState.currIndex = Number(thisNode.getAttribute("data-index"));

    this.carouselState.currSlide = slideContents[this.carouselState.currIndex];
    this.carouselState.currSlide.classList.add("slide_active");
    this.transition(slideSpeed);
    this.transform(slideWidth, this.carouselState.currIndex + 1);
  }

  create(carouselMaterials, speed, needPagination = false, longClick = false) {
    const { slideContents, buttons, slideList, slideWidth, startNum } = carouselMaterials;
    this.carouselState.slideList = slideList;

    const slideSpeed = speed;
    const prevButton = Object.values(buttons).find((button) => button.classList.contains("btn_prev"));
    const nextButton = Object.values(buttons).find((button) => button.classList.contains("btn_next"));
    const slideLen = slideContents.length;

    if (needPagination) {
      this.carouselState.slidePagination = document.querySelector(".slide_pagination");
      this.carouselState.pageDots = document.querySelectorAll(".btn_paging");
    }

    this.setTotalWidth(slideWidth, slideLen);
    // Add cloned slides
    this.cloneChildren(this.carouselState.slideList).then((children) => this.addClones(children));
    this.transform(slideWidth, startNum + 1);
    this.initCarouselState(startNum, slideContents);

    const slideMaterials = { slideSpeed, slideWidth, slideLen, slideContents };

    if (!longClick) {
      // button도 이벤트 위임 시도해보아야함
      nextButton.addEventListener("click", () => {
        this.moveSlide(1, slideMaterials, true, needPagination, this.carouselState.currIndex <= slideLen - 1, this.carouselState.currIndex === slideLen - 1);
      });

      prevButton.addEventListener("click", () => {
        this.moveSlide(1, slideMaterials, false, needPagination, this.carouselState.currIndex >= 0, this.carouselState.currIndex === 0);
      });
    }

    if (longClick) {
      nextButton.addEventListener("mouseup", () => {
        if (this.longClickState.isPressed) clearInterval(this.longClickState.timer.next);
        if (!this.longClickState.isMoved.next) this.moveSlide(1, slideMaterials, true, needPagination, this.carouselState.currIndex <= slideLen - 1, this.carouselState.currIndex === slideLen - 1);
        this.longClickState.isPressed = false;
        this.longClickState.isMoved.next = false;
      });

      nextButton.addEventListener("mousedown", () => {
        this.longClickState.isPressed = true;
        this.longClickState.timer.next = setInterval(() => {
          this.moveSlide(2, slideMaterials, true, needPagination, this.carouselState.currIndex <= slideLen - 1, this.carouselState.currIndex === slideLen - 1);
          this.longClickState.isMoved.next = true;
        }, 1800);
      });

      prevButton.addEventListener("mouseup", () => {
        if (this.longClickState.isPressed) clearInterval(this.longClickState.timer.prev);
        if (!this.longClickState.isMoved.prev) this.moveSlide(1, slideMaterials, false, needPagination, this.carouselState.currIndex >= 0, this.carouselState.currIndex === 0);
        this.longClickState.isPressed = false;
        this.longClickState.isMoved.prev = false;
      });

      prevButton.addEventListener("mousedown", () => {
        this.longClickState.isPressed = true;
        this.longClickState.timer.prev = setInterval(() => {
          this.moveSlide(2, slideMaterials, false, needPagination, this.carouselState.currIndex >= 0, this.carouselState.currIndex === 0);
          this.longClickState.isMoved.prev = true;
        }, 1800);
      });
    }

    if (needPagination) {
      this.carouselState.slidePagination.addEventListener("click", (e) => {
        this.movePagination(slideMaterials, e);
      });
    }
  }
}
