// import { createEventItem, setMileageListHtml, setMallEventListHtml } from "./articleTop/panels.js";
import createCarousel from "./slide.js";
// import { processDataToHtmlContents, setPaginationHtml } from "./htmlCodes.js";
import { createEventItem, setMileageListHtml, setPaginationHtml, setMallEventListHtml } from "./htmlCodes.js";
import setSecondCarousel from "./carousel2.js";

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

// fetch("http://localhost:3000/planningEvent.json")
//   .then((res) => res.json())
//   .then((data) => processDataToHtmlContents(data))
//   .then((contents) => {
//     insertContentsIntoHtmls(eventItemHtml, slideList, mallEventSlide)(contents);
//     setPaginationHtml(pagination).then((res) => {
//       console.log(res);
//       const buttons = document.querySelectorAll(".btn_slide");
//       const slideWidth = 485;
//       const slideSpeed = 300;
//       createCarousel(res, buttons, slideList, slideWidth, slideSpeed);
//     });
//   })
//   .catch((err) => console.log(err));

fetch(urls.event)
  .then((res) => res.json())
  .then((data) => {
    const eventItem = createEventItem(data);
    insertContentsIntoHtmls(eventItemHtml)(eventItem);
  });

fetch(urls.mileageList)
  .then((res) => res.json())
  .then((data) => {
    const mileageListPanels = setMileageListHtml(data);
    insertContentsIntoHtmls(slideList)(mileageListPanels);
    setPaginationHtml(pagination).then((res) => {
      const buttons = document.querySelectorAll(".btn_slide");
      const slideWidth = 485;
      const slideSpeed = 300;
      createCarousel(res, buttons, slideList, slideWidth, slideSpeed);
    });
  });

fetch(urls.mallEventList)
  .then((res) => res.json())
  .then((data) => {
    const initialMallEventListPanels = setMallEventListHtml(data);
    insertContentsIntoHtmls(mallEventSlide)(initialMallEventListPanels);
  });

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

fetch(urls.homeContents)
  .then((res) => res.json())
  .then((data) => {
    // console.log(data.contents);
    const hotDealItemHtml = document.querySelector(".content_hotDeal");
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
    const prevButton = document.querySelector(".btn_hotDeal_prev");
    const nextButton = document.querySelector(".btn_hotDeal_next");
    const slideList = document.querySelector(".content_hotDeal");

    setSecondCarousel(slideContents, prevButton, nextButton, slideList);
  });

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
