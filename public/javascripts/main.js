import API from "./api.js";
import TopCarouselUI from "./TopCarouselUI.js";
import cloneContent from "./cloneContent.js";
// const api = new API();

const carouselSlide = document.querySelector(".item__carousel-wrap");

//counter

// const cloneContent = () => {
//   const clonedFirstChild = carouselSlide.firstElementChild.cloneNode(true);
//   clonedFirstChild.id = "firstClone";
//   const clonedLastChild = carouselSlide.lastElementChild.cloneNode(true);
//   clonedLastChild.id = "lastClone";
//   carouselSlide.insertBefore(clonedFirstChild, null);
//   carouselSlide.insertBefore(clonedLastChild, carouselSlide.firstElementChild);
// };

cloneContent();
const topCarouselUI = new TopCarouselUI();
