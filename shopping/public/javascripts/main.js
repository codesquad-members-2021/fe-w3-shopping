import { api } from "./utils/api.js";
import { urls } from "./utils/urls.js";
import { setHtmls, insertAdjacent, insertContents } from "./setters/setHtmls.js";
import * as htmlMaker from "./utils/htmlMaker.js";
import { setCarousel } from "./setters/setCarousel.js";

const mallEventSlideHtml = document.querySelector("#mallEventSlide");
const slideList = document.querySelector(".slide_list");
const eventItemHtml = document.querySelector(".event__item");
const pagination = document.querySelector(".slide_pagination");
const hotDealItemHtml = document.querySelector(".content_hotDeal");

const eventItem = api(urls.event)(setHtmls, htmlMaker.eventItem, insertContents)(eventItemHtml);

const mileageItems = api(urls.mileageList)(setHtmls, htmlMaker.mileageListHtml, insertContents)(slideList);
mileageItems
  .then(() => htmlMaker.paginationHtml(pagination))
  .then((contents) => setCarousel(contents, "buttons_pagination", { slideList, slideWidth: 485 }, 0)(300, false, true));

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

const hotdealItems = api(urls.homeContents)(setHtmls, htmlMaker.hotDealList, insertContents)(hotDealItemHtml);
hotdealItems.then(() => {
  const slideContents = document.querySelectorAll(".list_hotDeal");
  const hotdealList = document.querySelector(".content_hotDeal");
  setCarousel(slideContents, "buttons_hotDeal", { slideList: hotdealList, slideWidth: 252 }, 5)(300, true, false);
});
