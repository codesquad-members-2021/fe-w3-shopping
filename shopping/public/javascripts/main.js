import { urls, api } from "./apis.js";
import { setHtmls, insertAdjacent, insertContents } from "./setters/setHtmls.js";
import { carouselState, longClickState } from "./states.js";
import * as htmlMaker from "./htmlMaker.js";
import Carousel from "./slides/carousel.js";
import setCarouselMaterials from "./setters/setCarouselMaterials.js";

const mallEventSlideHtml = document.querySelector("#mallEventSlide");
const slideList = document.querySelector(".slide_list");
const eventItemHtml = document.querySelector(".event__item");
const pagination = document.querySelector(".slide_pagination");
const hotDealItemHtml = document.querySelector(".content_hotDeal");

const registerBasicCarousel = () => {
  htmlMaker
    .paginationHtml(pagination)
    .then((contents) => setCarouselMaterials(contents, "buttons_pagination", { slideList, slideWidth: 485 }, 0))
    .then((materials) => {
      const state = Object.assign({}, carouselState);
      const topCarousel = new Carousel(state);
      topCarousel.create(materials, 300, true, false);
    });
};

const registerLongClickCarousel = () => {
  const slideContents = document.querySelectorAll(".list_hotDeal");
  const hotdealList = document.querySelector(".content_hotDeal");
  setCarouselMaterials(slideContents, "buttons_hotDeal", { slideList: hotdealList, slideWidth: 252 }, 5).then((materials) => {
    const c_state = Object.assign({}, carouselState);
    const l_state = Object.assign({}, longClickState);
    const hotdealCarousel = new Carousel(c_state, l_state);
    hotdealCarousel.create(materials, 300, false, true);
  });
};

const eventItem = api(urls.event)(setHtmls, htmlMaker.eventItem, insertContents)(eventItemHtml);
const mileageItems = api(urls.mileageList)(setHtmls, htmlMaker.mileageListHtml, insertContents)(slideList, registerBasicCarousel);
const mallEventItems = api(urls.mallEventList)(setHtmls, htmlMaker.mallEventListHtml, insertContents)(mallEventSlideHtml);

const readmoreButton = document.querySelector("#mallEventList_more");
readmoreButton.addEventListener("click", () => {
  api(urls.mallEventList)(
    insertAdjacent,
    htmlMaker.mallEventListHtml
  )(mallEventSlide).catch((err) => {
    if (err) mallEventItems;
  });
});

const hotdealItems = api(urls.homeContents)(setHtmls, htmlMaker.hotDealList, insertContents)(hotDealItemHtml, registerLongClickCarousel);
