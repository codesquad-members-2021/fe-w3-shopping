import { api, setHtmls, insertAdjacent } from "./utils.js";
import { carouselState, longClickState } from "./states.js";
import * as htmlMaker from "./htmlMaker.js";
import Carousel from "./slides/carousel.js";

const mallEventSlideHtml = document.querySelector("#mallEventSlide");
const slideList = document.querySelector(".slide_list");
const eventItemHtml = document.querySelector(".event__item");
const pagination = document.querySelector(".slide_pagination");
const hotDealItemHtml = document.querySelector(".content_hotDeal");

const urls = {
  event: "http://localhost:3000/event.json",
  mileageList: "http://localhost:3000/mileageList.json",
  mallEventList: "http://localhost:3000/mallEventList.json",
  homeContents: "http://localhost:3000/homeContents.json",
};

function setCarousel(slideContents, buttonClassName, specifics, startNum) {
  return new Promise((resolve, reject) => {
    const buttons = document.querySelectorAll(`.${buttonClassName}`);
    const { slideList, slideWidth } = specifics;
    const carouselMaterials = { slideContents, buttons, slideList, slideWidth, startNum };
    resolve(carouselMaterials);
  });
}

const registerBasicCarousel = () => {
  htmlMaker
    .paginationHtml(pagination)
    .then((contents) => setCarousel(contents, "btn_slide", { slideList, slideWidth: 485 }, 0))
    .then((materials) => {
      const state = Object.assign({}, carouselState);
      const topCarousel = new Carousel(state);
      topCarousel.create(materials, 300, true, false);
    });
};

const registerLongClickCarousel = () => {
  const slideContents = document.querySelectorAll(".list_hotDeal");
  const hotdealList = document.querySelector(".content_hotDeal");
  setCarousel(slideContents, "btn_hotDeal", { slideList: hotdealList, slideWidth: 252 }, 5).then((materials) => {
    const c_state = Object.assign({}, carouselState);
    const l_state = Object.assign({}, longClickState);
    const hotdealCarousel = new Carousel(c_state, l_state);
    hotdealCarousel.create(materials, 300, false, true);
  });
};

const eventItem = api(urls.event)(setHtmls, htmlMaker.eventItem, htmlMaker.insertContents)(eventItemHtml);
const mileageItems = api(urls.mileageList)(setHtmls, htmlMaker.mileageListHtml, htmlMaker.insertContents)(slideList, registerBasicCarousel);
const mallEventItems = api(urls.mallEventList)(setHtmls, htmlMaker.mallEventListHtml, htmlMaker.insertContents)(mallEventSlideHtml);

const readmoreButton = document.querySelector("#mallEventList_more");
readmoreButton.addEventListener("click", () => {
  api(urls.mallEventList)(insertAdjacent, htmlMaker.mallEventListHtml)(mallEventSlide);
});

const hotdealItems = api(urls.homeContents)(setHtmls, htmlMaker.hotDealList, htmlMaker.insertContents)(hotDealItemHtml, registerLongClickCarousel);
