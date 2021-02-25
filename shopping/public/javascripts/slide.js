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

const setTotalWidthOnSlideList = (slideWidth, slideLen) => (carouselState.slideList.style.width = `${slideWidth * (slideLen + 2)}px`);

const cloneFirstLastChildren = (slideList) => {
  return new Promise((resolve, reject) => {
    const firstChild = slideList.firstElementChild;
    const lastChild = slideList.lastElementChild;
    const clonedFirst = firstChild.cloneNode(true);
    const clonedLast = lastChild.cloneNode(true);
    resolve({ clonedFirst, clonedLast });
  });
};

const addClonedChildren = (children) => {
  const { clonedFirst, clonedLast } = children;
  carouselState.slideList.appendChild(clonedFirst);
  carouselState.slideList.insertBefore(clonedLast, carouselState.slideList.firstElementChild);
};

const transformSlideList = (slideWidth, value) => (carouselState.slideList.style.transform = `translateX(-${slideWidth * value}px)`);

const transitionSlideList = (ms) => (carouselState.slideList.style.transition = `${ms}ms`);

const moveSlide = (itemCnt, slideMaterials, isNext, isPagination) => (...conditions) => {
  const { slideSpeed, slideWidth, slideLen, slideContents } = slideMaterials;

  if (conditions[0]) {
    transitionSlideList(slideSpeed);
    transformSlideList(slideWidth, isNext ? carouselState.currIndex + 2 + (itemCnt > 1 ? 1 : 0) : carouselState.currIndex + (itemCnt > 1 ? -1 : 0));
  }

  if (conditions[1]) {
    if (itemCnt <= 1) {
      setTimeout(() => {
        transitionSlideList(0);
        transformSlideList(slideWidth, isNext ? 1 : slideLen);
      }, slideSpeed);
    }
    carouselState.currIndex = isNext ? -1 : slideLen;
  }

  carouselState.currSlide.classList.remove("slide_active");
  if (isPagination) {
    const currIndexStandard = isNext ? -1 : slideLen;
    const newIndex = isNext ? slideLen - 1 : 0;
    carouselState.pageDots[carouselState.currIndex === currIndexStandard ? newIndex : carouselState.currIndex].classList.remove("dot_active");
  }
  carouselState.currSlide = slideContents[isNext ? (carouselState.currIndex += itemCnt > 1 ? 2 : 1) : (carouselState.currIndex -= itemCnt > 1 ? 2 : 1)];
  carouselState.currSlide.classList.add("slide_active");
  if (isPagination) carouselState.pageDots[carouselState.currIndex].classList.add("dot_active");
};

const paginationEvent = (slideMaterials, { target }) => {
  const { slideSpeed, slideWidth, slideLen, slideContents } = slideMaterials;
  carouselState.currDot = document.querySelector(".dot_active");
  carouselState.currDot.classList.remove("dot_active");

  const thisNode = target.parentNode;
  carouselState.currDot = thisNode;
  thisNode.classList.add("dot_active");

  carouselState.currSlide.classList.remove("slide_active");
  carouselState.currIndex = Number(thisNode.getAttribute("data-index"));

  carouselState.currSlide = slideContents[carouselState.currIndex];
  carouselState.currSlide.classList.add("slide_active");
  transitionSlideList(slideSpeed);
  transformSlideList(slideWidth, carouselState.currIndex + 1);
};

const setInitalCarouselState = (startNum, slideContents) => {
  carouselState.currIndex = startNum;
  carouselState.currSlide = slideContents[carouselState.currIndex];
  carouselState.currSlide.classList.add("slide_active");
};

const createCarousel = (carouselMaterials, speed, needPagination = false, longClick = false) => {
  const { slideContents, buttons, slideList, slideWidth, startNum } = carouselMaterials;
  carouselState.slideList = slideList;

  const slideSpeed = speed;
  const prevButton = Object.values(buttons).find((button) => button.classList.contains("btn_prev"));
  const nextButton = Object.values(buttons).find((button) => button.classList.contains("btn_next"));
  const slideLen = slideContents.length;

  if (needPagination) {
    carouselState.slidePagination = document.querySelector(".slide_pagination");
    carouselState.pageDots = document.querySelectorAll(".btn_paging");
  }

  setTotalWidthOnSlideList(slideWidth, slideLen);
  // Add cloned slides
  cloneFirstLastChildren(carouselState.slideList).then((children) => addClonedChildren(children));
  transformSlideList(slideWidth, startNum + 1);
  setInitalCarouselState(startNum, slideContents);

  const slideMaterials = { slideSpeed, slideWidth, slideLen, slideContents };

  if (!longClick) {
    // button도 이벤트 위임 시도해보아야함
    nextButton.addEventListener("click", () => {
      moveSlide(1, slideMaterials, true, true)(carouselState.currIndex <= slideLen - 1, carouselState.currIndex === slideLen - 1);
    });

    prevButton.addEventListener("click", () => {
      moveSlide(1, slideMaterials, false, true)(carouselState.currIndex >= 0, carouselState.currIndex === 0);
    });
  }

  if (longClick) {
    nextButton.addEventListener("mouseup", () => {
      if (longClickState.isPressed) clearInterval(longClickState.timer.next);
      if (!longClickState.isMoved.next) moveSlide(1, slideMaterials, true, false)(carouselState.currIndex <= slideLen - 1, carouselState.currIndex === slideLen - 1);
      longClickState.isPressed = false;
      longClickState.isMoved.next = false;
    });

    nextButton.addEventListener("mousedown", () => {
      longClickState.isPressed = true;
      // console.log(Date.now());
      longClickState.timer.next = setInterval(() => {
        moveSlide(2, slideMaterials, true, false)(carouselState.currIndex <= slideLen - 1, carouselState.currIndex === slideLen - 1);
        longClickState.isMoved.next = true;
      }, 2000);
    });

    prevButton.addEventListener("mouseup", () => {
      if (longClickState.isPressed) clearInterval(longClickState.timer.prev);
      if (!longClickState.isMoved.prev) moveSlide(1, slideMaterials, false, false)(carouselState.currIndex >= 0, carouselState.currIndex === 0);
      longClickState.isPressed = false;
      longClickState.isMoved.prev = false;
    });

    prevButton.addEventListener("mousedown", () => {
      longClickState.isPressed = true;
      longClickState.timer.prev = setInterval(() => {
        moveSlide(2, slideMaterials, false, false)(carouselState.currIndex >= 0, carouselState.currIndex === 0);
        longClickState.isMoved.prev = true;
      }, 2000);
    });
  }

  if (needPagination) {
    carouselState.slidePagination.addEventListener("click", (e) => {
      paginationEvent(slideMaterials, e);
    });
  }
};

export { createCarousel, carouselState, transitionSlideList, transformSlideList };
