import Slide from "./slide.js";

export default class Carousel extends Slide {
  constructor(carouselState, longClickState) {
    super(carouselState, longClickState);
  }

  moveSlide = (itemCnt) => (slideMaterials, isNext, isPagination) => (...conditions) => {
    const { slideSpeed, slideWidth, slideLen, slideContents } = slideMaterials;
    const adjustLastSlide = () => {
      setTimeout(() => {
        this.transition(0);
        this.transform(slideWidth, isNext ? 1 : slideLen);
      }, slideSpeed);
    };

    conditions.forEach((condition) => {
      if (condition) {
        this.transition(slideSpeed);
        this.transform(
          slideWidth,
          isNext
            ? this.carouselState.currIndex + 2 + (itemCnt > 1 ? 1 : 0)
            : this.carouselState.currIndex + (itemCnt > 1 ? -1 : 0)
        );
      }
    });

    if (conditions[conditions.length - 1]) {
      if (itemCnt <= 1) adjustLastSlide();
      this.carouselState.currIndex = isNext ? -1 : slideLen;
    }

    this.carouselState.currSlide.classList.remove("slide_active");

    if (isPagination) {
      const currIndexStandard = isNext ? -1 : slideLen;
      const newIndex = isNext ? slideLen - 1 : 0;
      this.carouselState.pageDots[
        this.carouselState.currIndex === currIndexStandard ? newIndex : this.carouselState.currIndex
      ].classList.remove("dot_active");
    }

    this.carouselState.currSlide =
      slideContents[
        isNext ? (this.carouselState.currIndex += itemCnt > 1 ? 2 : 1) : (this.carouselState.currIndex -= itemCnt > 1 ? 2 : 1)
      ];
    this.carouselState.currSlide.classList.add("slide_active");

    if (isPagination) this.carouselState.pageDots[this.carouselState.currIndex].classList.add("dot_active");
  };

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

  basicClickEvent(buttons, slideMaterials, needPagination) {
    const { slideLen } = slideMaterials;

    buttons.addEventListener("click", ({ target }) => {
      const button = target.classList;
      if (button.contains("btn_prev")) {
        this.moveSlide(1)(slideMaterials, true, needPagination)(
          this.carouselState.currIndex <= slideLen - 1,
          this.carouselState.currIndex === slideLen - 1
        );
      }
      if (button.contains("btn_next")) {
        this.moveSlide(1)(slideMaterials, false, needPagination)(
          this.carouselState.currIndex >= 0,
          this.carouselState.currIndex === 0
        );
      }
    });
  }

  longClickEvent(buttons, slideMaterials, needPagination) {
    const { slideLen } = slideMaterials;
    buttons.addEventListener("mouseup", ({ target }) => {
      const button = target.classList;

      if (button.contains("btn_next")) {
        if (this.longClickState.isPressed) clearInterval(this.longClickState.timer.next);
        if (!this.longClickState.isMoved.next) {
          this.moveSlide(1)(slideMaterials, false, needPagination)(
            this.carouselState.currIndex >= 0,
            this.carouselState.currIndex === 0
          );
        }
        this.longClickState.isPressed = false;
        this.longClickState.isMoved.next = false;
      }

      if (button.contains("btn_prev")) {
        if (this.longClickState.isPressed) clearInterval(this.longClickState.timer.prev);
        if (!this.longClickState.isMoved.prev) {
          this.moveSlide(1)(slideMaterials, true, needPagination)(
            this.carouselState.currIndex <= slideLen - 1,
            this.carouselState.currIndex === slideLen - 1
          );
        }
        this.longClickState.isPressed = false;
        this.longClickState.isMoved.prev = false;
      }
    });

    buttons.addEventListener("mousedown", ({ target }) => {
      const button = target.classList;

      if (button.contains("btn_next")) {
        this.longClickState.isPressed = true;
        this.longClickState.timer.next = setInterval(() => {
          this.moveSlide(2)(slideMaterials, false, needPagination)(
            this.carouselState.currIndex >= 0,
            this.carouselState.currIndex === 0
          );
          this.longClickState.isMoved.next = true;
        }, 1800);
      }

      if (button.contains("btn_prev")) {
        this.longClickState.isPressed = true;
        this.longClickState.timer.prev = setInterval(() => {
          this.moveSlide(2)(slideMaterials, true, needPagination)(
            this.carouselState.currIndex <= slideLen - 1,
            this.carouselState.currIndex === slideLen - 1
          );
          this.longClickState.isMoved.prev = true;
        }, 1800);
      }
    });
  }

  create(carouselMaterials, speed, needPagination = false, longClick = false) {
    const { slideContents, buttons, slideList, slideWidth, startNum } = carouselMaterials;
    this.carouselState.slideList = slideList;
    const [slideSpeed, slideLen] = [speed, slideContents.length];
    if (needPagination) {
      this.carouselState.slidePagination = document.querySelector(".slide_pagination");
      this.carouselState.pageDots = document.querySelectorAll(".btn_paging");
    }
    const slideMaterials = {
      slideSpeed,
      slideWidth,
      slideLen,
      slideContents,
    };

    this.setTotalWidth(slideWidth, slideLen);
    // Add cloned slides
    this.cloneChildren(this.carouselState.slideList).then((children) => this.addClones(children));
    this.transform(slideWidth, startNum + 1);
    this.initCarouselState(startNum, slideContents);

    if (!longClick) this.basicClickEvent(buttons, slideMaterials, needPagination);
    if (longClick) this.longClickEvent(buttons, slideMaterials, needPagination);
    if (needPagination) {
      this.carouselState.slidePagination.addEventListener("click", (e) => this.movePagination(slideMaterials, e));
    }
  }
}
