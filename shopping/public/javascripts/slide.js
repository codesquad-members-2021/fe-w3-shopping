export default function createCarousel(slideContents, buttons, slideList, width = undefined, speed = undefined) {
  const slideWidth = width ? width : 400;
  const slideSpeed = speed ? speed : 300;
  const prevButton = Object.values(buttons).find((button) => button.classList.contains("btn_prev"));
  const nextButton = Object.values(buttons).find((button) => button.classList.contains("btn_next"));
  const slideLen = slideContents.length;
  const startNum = 0;
  const pageDots = document.querySelectorAll(".btn_paging");

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
  let currSlide = slideContents[currIndex];
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
    pageDots[currIndex === -1 ? slideLen - 1 : currIndex].classList.remove("dot_active");
    currSlide = slideContents[++currIndex];
    currSlide.classList.add("slide_active");
    pageDots[currIndex].classList.add("dot_active");
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
    pageDots[currIndex === slideLen ? 0 : currIndex].classList.remove("dot_active");
    currSlide = slideContents[--currIndex];
    currSlide.classList.add("slide_active");
    pageDots[currIndex].classList.add("dot_active");
  });

  let currDot;
  pageDots.forEach((dot, i) => {
    dot.addEventListener("click", (e) => {
      e.preventDefault();
      currDot = document.querySelector(".dot_active");
      currDot.classList.remove("dot_active");

      currDot = this;
      this.classList.add("dot_active");

      currSlide.classList.remove("slide_active");
      currIndex = Number(this.getAttribute("data-index"));
      currSlide = slideContents[currIndex];
      currSlide.classList.add("slide_active");
      slideList.style.transition = `${slideSpeed}ms`;
      slideList.style.transform = `translateX(-${slideWidth * (currIndex + 1)}px)`;
    });
  });
}
