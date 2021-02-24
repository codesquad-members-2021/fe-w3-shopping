export default function setSecondCarousel(slideContents, prevButton, nextButton, slideList) {
  const slideLen = slideContents.length;
  const startNum = 0;
  const slideSpeed = 300;
  const slideWidth = 252;

  let firstChild = slideList.firstElementChild;
  //   console.log(firstChild);
  let lastChild = slideList.lastElementChild;
  let clonedFirst = firstChild.cloneNode(true);
  let clonedLast = lastChild.cloneNode(true);

  slideList.style.width = `${slideWidth * (slideLen + 2)}px`;
  slideList.style.transform = `translateX(-${slideWidth * (startNum + 5)}px)`;

  slideList.appendChild(clonedFirst);
  slideList.insertBefore(clonedLast, slideList.firstElementChild);

  let currIndex = startNum;
  let currSlide = slideContents[currIndex];
  currSlide.classList.add("content_active");

  //   nextButton.addEventListener("click", () => {
  //     if (currIndex <= slideLen - 1) {
  //       slideList.style.transition = `${slideSpeed}ms`;
  //       slideList.style.transform = `translateX(-${slideWidth * (currIndex + 1)}px)`;
  //     }

  //     currSlide.classList.remove("content_active");
  //     currSlide = slideContents[++currIndex];
  //     currSlide.classList.add("content_active");
  //   });

  let isPressed = false;
  let longTimerForNext;
  let longTimerForPrev;

  nextButton.addEventListener("mouseup", () => {
    isPressed = false;
  });

  nextButton.addEventListener("mousedown", () => {
    isPressed = true;
    longTimerForNext = setTimeout(() => {
      twoItemsNext();
    }, 2000);
    oneItemNext();
  });

  prevButton.addEventListener("mouseup", () => {
    isPressed = false;
  });

  prevButton.addEventListener("mousedown", () => {
    isPressed = true;
    longTimerForPrev = setTimeout(() => {
      twoItemsPrev();
    }, 2000);
    oneItemPrev();
  });

  function oneItemNext() {
    if (isPressed) {
      if (currIndex <= slideLen - 1) {
        slideList.style.transition = `${slideSpeed}ms`;
        slideList.style.transform = `translateX(-${slideWidth * (currIndex + 2)}px)`;
      }

      if (currIndex === slideLen - 1) currIndex = -1;

      currSlide.classList.remove("content_active");
      currSlide = slideContents[++currIndex];
      currSlide.classList.add("content_active");
    }
  }

  function oneItemPrev() {
    if (isPressed) {
      if (currIndex >= 0) {
        slideList.style.transition = `${slideSpeed}ms`;
        slideList.style.transform = `translateX(-${slideWidth * currIndex}px)`;
      }

      if (currIndex === 0) currIndex = slideLen;

      currSlide.classList.remove("content_active");
      currSlide = slideContents[--currIndex];
      currSlide.classList.add("content_active");
    }
  }

  function twoItemsNext() {
    if (longTimerForNext) clearTimeout(longTimerForNext);
    if (isPressed) {
      if (currIndex <= slideLen - 1) {
        slideList.style.transition = `${slideSpeed}ms`;
        slideList.style.transform = `translateX(-${slideWidth * (currIndex + 3)}px)`;
      }
      if (currIndex === slideLen - 1) currIndex = -1;

      currSlide.classList.remove("content_active");
      currSlide = slideContents[(currIndex += 2)];
      currSlide.classList.add("content_active");
    }
  }

  function twoItemsPrev() {
    if (longTimerForPrev) clearTimeout(longTimerForPrev);
    if (isPressed) {
      if (currIndex >= 0) {
        slideList.style.transition = `${slideSpeed}ms`;
        slideList.style.transform = `translateX(-${slideWidth * (currIndex - 1)}px)`;
      }
      if (currIndex === 0) currIndex = slideLen;

      currSlide.classList.remove("content_active");
      currSlide = slideContents[(currIndex -= 2)];
      currSlide.classList.add("content_active");
    }
  }
}
