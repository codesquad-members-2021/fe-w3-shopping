import { api } from "./utils/api.js";
import { urls } from "./utils/urls.js";
import { setHtmls, insertAdjacent, insertContents } from "./setters/setHtmls.js";
import * as htmlMaker from "./utils/htmlMaker.js";
import { setCarousel } from "./setters/setCarousel.js";

// event 상품
const eventItemHtml = document.querySelector(".event__item");
const eventItem = api(urls.event)(setHtmls, htmlMaker.eventItem, insertContents)(eventItemHtml);

// mileage 상품 - 캐러셀 3개 with pagination
const slideList = document.querySelector(".slide_list");
const pagination = document.querySelector(".slide_pagination");
const mileageItems = api(urls.mileageList)(setHtmls, htmlMaker.mileageListHtml, insertContents)(slideList);
mileageItems
  .then(() => htmlMaker.paginationHtml(pagination))
  .then((contents) =>
    setCarousel(contents, "buttons_pagination", { slideList, slideWidth: 485 }, 0)(300, false, true)(
      "slide_pagination",
      "btn_paging"
    )
  );

// mallEvent 상품 - 더보기 클릭시 item 불러오기
const mallEventSlideHtml = document.querySelector("#mallEventSlide");
const mallEventItems = api(urls.mallEventList)(setHtmls, htmlMaker.mallEventListHtml, insertContents)(mallEventSlideHtml);

const readmoreButton = document.querySelector("#mallEventList_more");
readmoreButton.addEventListener("click", () =>
  api(urls.mallEventList)(
    insertAdjacent,
    htmlMaker.mallEventListHtml
  )(mallEventSlide).catch((err) => (readmoreButton.innerHTML = "마지막"))
);

// hotdeal 상품 - 캐러셀 5개 with longClick
const hotDealItemHtml = document.querySelector(".content_hotDeal");
const hotdealItems = api(urls.hotdeal)(setHtmls, htmlMaker.homeContentsList, insertContents)(hotDealItemHtml, "hotDeal");
hotdealItems.then(() => {
  const slideContents = document.querySelectorAll(".hotDeal_item");
  const hotdealList = document.querySelector(".content_hotDeal");
  setCarousel(slideContents, "buttons_hotDeal", { slideList: hotdealList, slideWidth: 252 }, 0)(300, true, false)();
});

// keyword 상품
const keywordItemHtml = document.querySelector(".content_keyword");
const keywordItems = api(urls.keyword)(setHtmls, htmlMaker.homeContentsList, insertContents)(keywordItemHtml, "keyword");

// how - relate 상품
const howRelateItemHtml = document.querySelector(".how__relate");
const howRelateItems = api(urls.howRelate)(setHtmls, htmlMaker.homeContentsList, insertContents)(howRelateItemHtml, "how");

// how - same category 상품
const howSameHtml = document.querySelector(".how__same");
const howSameItems = api(urls.howSame)(setHtmls, htmlMaker.homeContentsList, insertContents)(howSameHtml, "how");

// partners
const contPartnerHtml = document.querySelector(".cont_partner");
const partners = api(urls.partners)(setHtmls, htmlMaker.partnerList, insertContents)(contPartnerHtml);
