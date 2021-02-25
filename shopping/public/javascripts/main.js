// import api from "./api.js";
import { carouselState, longClickState } from "./carousel/states.js";
import { createEventItem, setMileageListHtml, setPaginationHtml, setMallEventListHtml, createHotDeal } from "./htmlCodes.js";
import Carousel from "./carousel/carousel.js";

const mallEventSlide = document.querySelector("#mallEventSlide");
const slideList = document.querySelector(".slide_list");
const eventItemHtml = document.querySelector(".event__item");
const pagination = document.querySelector(".slide_pagination");

const urls = {
  event: "http://localhost:3000/event.json",
  mileageList: "http://localhost:3000/mileageList.json",
  mallEventList: "http://localhost:3000/mallEventList.json",
  homeContents: "http://localhost:3000/homeContents.json",
};

const insertContentsIntoHtmls = (...htmls) => (...contents) => {
  if (htmls.length !== contents.length) throw new Error("CANNOT INSERT STRS INTO HTMLS");
  htmls.forEach((html, index) => (html.innerHTML = contents[index]));
};

function setCarousel(slideContents, buttonClassName, specifics, startNum) {
  return new Promise((resolve, reject) => {
    const buttons = document.querySelectorAll(`.${buttonClassName}`);
    const { slideList, slideWidth } = specifics;
    const carouselMaterials = { slideContents, buttons, slideList, slideWidth, startNum };
    resolve(carouselMaterials);
  });
}

const top_specifics = { slideList, slideWidth: 485 };

const api = (url) => fetch(url).then((res) => res.json());

const setHtmls = (fn1, fn2) => (arg1, arg2) => {
  const result = fn1(arg1);
  fn2(arg2)(result);
};

const eventItem = api(urls.event).then((data) => setHtmls(createEventItem, insertContentsIntoHtmls)(data, eventItemHtml));

const mileageItems = api(urls.mileageList).then((data) => {
  setHtmls(setMileageListHtml, insertContentsIntoHtmls)(data, slideList);
  setPaginationHtml(pagination)
    .then((contents) => setCarousel(contents, "btn_slide", top_specifics, 0))
    .then((materials) => {
      const state = Object.assign({}, carouselState);
      const topCarousel = new Carousel(state);
      topCarousel.create(materials, 300, true, false);
    });
});

const mallEventItems = api(urls.mallEventList).then((data) => setHtmls(setMallEventListHtml, insertContentsIntoHtmls)(data, mallEventSlide));

const moreButton = document.querySelector("#mallEventList_more");
moreButton.addEventListener("click", () => {
  fetch(urls.mallEventList)
    .then((res) => {
      if (res.status === 503) moreButton.innerText = "마지막";
      else return res.json();
    })
    .then((data) => {
      if (!data) return;
      const mallEventListPanels = setMallEventListHtml(data);
      mallEventSlide.insertAdjacentHTML("beforeend", mallEventListPanels);
    });
});

// hotdeal 불러오기
const hotDealItemHtml = document.querySelector(".content_hotDeal");

// const hotDealItemList = api(urls.homeContents).then((data) => {
//   // console.log(data.contents);
//   // console.log(createHotDeal(data.contents));
//   const hotdealList = document.querySelector(".content_hotDeal");
//   setHtmls(createHotDeal, insertContentsIntoHtmls)(data.contents, hotdealList);
//   // console.log(hotdealList);
//   const hotdeal_specifics = { slideList: hotdealList, slideWidth: 252 };
//   const slideContents = document.querySelectorAll(".list_hotDeal");
//   setCarousel(slideContents, "btn_hotDeal", hotdeal_specifics, 5).then((materials) => {
//     const c_state = Object.assign({}, carouselState);
//     const l_state = Object.assign({}, longClickState);
//     const hotdealCarousel = new Carousel(c_state, l_state);
//     hotdealCarousel.create(materials, 300, false, true);
//   });
// });

// Refactoring...

fetch(urls.homeContents)
  .then((res) => res.json())
  .then((data) => {
    // console.log(data.contents);
    const hotDealContents = data.contents;
    let totalHtml = "";
    let i = 0;
    Object.entries(hotDealContents).forEach((value, key) => {
      const currProducts = value[1].eventProducts;
      let hotDealHtml = `<ul class="list_hotDeal">`;
      hotDealHtml += currProducts.reduce((acc, val) => {
        const { imageurl, produrl, prodname, mprice } = val;
        acc += `<li class="_GI_" data-id="${i++}">
        <a href="${produrl}">
          <span class="thumb_hotdeal">
            <img src="${imageurl}" alt="" />
          </span>
          <strong class="title_g">${prodname}</strong>
          <span class="detail_price">${numberWithCommas(mprice)}
            <span class="price_unit">원</span>
          </span>
        </a>
      </li>`;
        return acc;
      }, ``);
      hotDealHtml += `</ul>`;
      totalHtml += hotDealHtml;
    });
    hotDealItemHtml.innerHTML = totalHtml;

    const slideContents = document.querySelectorAll(".list_hotDeal");
    const buttons = document.querySelectorAll(".btn_hotDeal");
    const hotdealList = document.querySelector(".content_hotDeal");
    const carouselMaterials = {
      slideContents,
      buttons,
      slideList: hotdealList,
      slideWidth: 252,
      startNum: 5,
    };
    const c_state = Object.assign(carouselState);
    const l_state = Object.assign(longClickState);
    const hotdealCarousel = new Carousel(c_state, l_state);

    hotdealCarousel.create(carouselMaterials, 300, false, true);
  });

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
