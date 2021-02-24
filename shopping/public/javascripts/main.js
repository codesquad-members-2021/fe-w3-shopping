// import { createEventItem, setMileageListHtml, setMallEventListHtml } from "./articleTop/panels.js";
import createCarousel from "./slide.js";
// import { processDataToHtmlContents, setPaginationHtml } from "./htmlCodes.js";
import { createEventItem, setMileageListHtml, setPaginationHtml, setMallEventListHtml } from "./htmlCodes.js";

const mallEventSlide = document.querySelector("#mallEventSlide");
const slideList = document.querySelector(".slide_list");
const eventItemHtml = document.querySelector(".event__item");
const pagination = document.querySelector(".slide_pagination");

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

fetch("http://localhost:3000/event.json")
  .then((res) => res.json())
  .then((data) => {
    const eventItem = createEventItem(data.linkurl, data.imgurl);
    insertContentsIntoHtmls(eventItemHtml)(eventItem);
  });

fetch("http://localhost:3000/mileageList.json")
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

fetch("http://localhost:3000/mallEventList.json")
  .then((res) => res.json())
  .then((data) => {
    const initialMallEventListPanels = setMallEventListHtml(data);
    insertContentsIntoHtmls(mallEventSlide)(initialMallEventListPanels);
  });

const moreButton = document.querySelector("#mallEventList_more");
moreButton.addEventListener("click", () => {
  fetch("http://localhost:3000/mallEventList.json")
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
