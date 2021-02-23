const slideList = document.querySelector(".slide_list");
const panels = document.querySelectorAll(".panel");
const prevButton = document.querySelector(".btn_prev");
const nextButton = document.querySelector(".btn_next");
const slideLen = panels.length;
const slideWidth = 485;
const slideSpeed = 300;
const startNum = 0;

slideList.style.width = `${slideWidth * (slideLen + 2)}px`;

let firstChild = slideList.firstElementChild;
let lastChild = slideList.lastElementChild;
let clonedFirst = firstChild.cloneNode(true);
let clonedLast = lastChild.cloneNode(true);

// add cloned slides
slideList.appendChild(clonedFirst);
slideList.insertBefore(clonedLast, firstChild);
slideList.style.transform = `translateX(-${slideWidth * (startNum + 1)}px)`;

let currIndex = startNum;
let currSlide = panels[currIndex];
currSlide.classList.add("active");

nextButton.addEventListener("click", () => {
  if (currIndex <= slideLen - 1) {
    slideList.style.transition = `${slideSpeed}ms`;
    slideList.style.transform = `translateX(-${slideWidth * (currIndex + 2)}px)`;
  }
  if (currIndex === slideLen - 1) {
    setTimeout(() => {
      slideList.style.transition = "0ms";
      slideList.style.transform = `translateX(-${slideWidth}px)`;
    }, slideSpeed);
    currIndex = -1;
  }
  currSlide.classList.remove("active");
  currSlide.classList.add("hidden");
  currSlide = panels[++currIndex];
  currSlide.classList.add("active");
});

prevButton.addEventListener("click", () => {
  if (currIndex >= 0) {
    slideList.style.transition = `${slideSpeed}ms`;
    slideList.style.transform = `translateX(-${slideWidth * currIndex}px)`;
  }

  if (currIndex === 0) {
    setTimeout(() => {
      slideList.style.transition = "0ms";
      slideList.style.transform = `translateX(-${slideWidth * slideLen}px)`;
    }, slideSpeed);
    currIndex = slideLen;
  }
  currSlide.classList.remove("active");
  currSlide = panels[--currIndex];
  currSlide.classList.add("active");
});
