export default function createCarousel(panels, buttons, slideList, width = undefined, speed = undefined) {
  const slideWidth = width ? width : 400;
  const slideSpeed = speed ? speed : 300;
  const prevButton = Object.values(buttons).find((button) => button.classList.contains("btn_prev"));
  const nextButton = Object.values(buttons).find((button) => button.classList.contains("btn_next"));
  const slideLen = panels.length;
  const startNum = 0;
  slideList.style.width = `${slideWidth * (slideLen + 2)}px`;

  let firstChild = slideList.firstElementChild;
  let lastChild = slideList.lastElementChild;
  let clonedFirst = firstChild.cloneNode(true);
  let clonedLast = lastChild.cloneNode(true);

  // add cloned slides
  slideList.appendChild(clonedFirst);
  slideList.insertBefore(clonedLast, slideList.firstElementChild);

  slideList.style.transform = `translateX(-${slideWidth * (startNum + 1)}px)`;

  let currIndex = startNum;
  let currSlide = panels[currIndex];
  currSlide.classList.add("slide_active");

  nextButton.addEventListener("click", () => {
    if (currIndex <= slideLen - 1) {
      slideList.style.transition = slideSpeed + "ms";
      slideList.style.transform = `translateX(-${slideWidth * (currIndex + 2)}px)`;
    }
    if (currIndex === slideLen - 1) {
      setTimeout(() => {
        slideList.style.transition = "0ms";
        slideList.style.transform = `translateX(-${slideWidth}px)`;
      }, slideSpeed);
      currIndex = -1;
    }
    currSlide.classList.remove("slide_active");
    currSlide = panels[++currIndex];
    currSlide.classList.add("slide_active");
  });

  prevButton.addEventListener("click", () => {
    if (currIndex >= 0) {
      slideList.style.transition = slideSpeed + "ms";
      slideList.style.transform = `translateX(-${slideWidth * currIndex}px)`;
    }

    if (currIndex === 0) {
      setTimeout(() => {
        slideList.style.transition = "0ms";
        slideList.style.transform = `translateX(-${slideWidth * slideLen}px)`;
      }, slideSpeed);
      currIndex = slideLen;
    }
    currSlide.classList.remove("slide_active");
    currSlide = panels[--currIndex];
    currSlide.classList.add("slide_active");
  });
}
