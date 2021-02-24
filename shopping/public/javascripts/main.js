// import { createEventItem, setMileageListHtml, setMallEventListHtml } from "./articleTop/panels.js";
import createCarousel from "./slide.js";
import { processDataToHtmlContents, setPaginationHtml } from "./htmlCodes.js";

const mallEventSlide = document.querySelector("#mallEventSlide");
const slideList = document.querySelector(".slide_list");
const eventItemHtml = document.querySelector(".event__item");
const pagination = document.querySelector(".slide_pagination");

const insertContentsIntoHtmls = (...htmls) => (contents) => {
  if (htmls.length !== contents.length) throw new Error("CANNOT INSERT STRS INTO HTMLS");
  htmls.forEach((html, index) => (html.innerHTML = contents[index]));
};

// fetch(createHtmlCode, insertStrsIntoHtmls, setPagnationHtml);

// function fetch(createHtmlCode, insertStrsIntoHtmls, setPagnationHtml) {
fetch("http://localhost:3000/planningEvent.json")
  .then((res) => res.json())
  .then((data) => processDataToHtmlContents(data))
  .then((contents) => {
    insertContentsIntoHtmls(eventItemHtml, slideList, mallEventSlide)(contents);
    setPaginationHtml(pagination).then((res) => {
      console.log(res);
      const buttons = document.querySelectorAll(".btn_slide");
      const slideWidth = 485;
      const slideSpeed = 300;
      createCarousel(res, buttons, slideList, slideWidth, slideSpeed);
    });
    // const slideContents = document.querySelectorAll(".slide_content");
    // const slideLen = slideContents.length;
    // createPagnationHtml(slideLen, 0).then((pageChild) => {
    //   const buttons = document.querySelectorAll(".btn_slide");
    //   const pagination = document.querySelector(".slide_pagination");
    //   pagination.innerHTML = pageChild;
    //   const slideWidth = 485;
    //   const slideSpeed = 300;
    //   createCarousel(slideContents, buttons, slideList, slideWidth, slideSpeed);
    // });
  })
  .catch((err) => console.log(err));
// }

// fetch("http://localhost:3000/planningEvent.json")
//   .then((res) => res.json())
//   .then((data) => {
//     const { event, mileageList, mallEventList } = data;
//     const eventItem = createEventItem(event.linkurl, event.imgurl);
//     // mileageList html 코드 만들기
//     const mileageListPanels = setMileageListHtml(mileageList);
//     // mallEventListProducts html 코드 만들기
//     const mallEventListPanels = setMallEventListHtml(mallEventList);
//     return [eventItem, mileageListPanels, mallEventListPanels];
//   })
//   .then((strs) => {
//     // const { eventItem, mileageListPanels, mallEventListPanels } = strs;
//     insertStrsIntoHtmls(eventItemHtml, slideList, mallEventSlide)(strs);
//     const slideContents = document.querySelectorAll(".slide_content");
//     const buttons = document.querySelectorAll(".btn_slide");
//     const pagination = document.querySelector(".slide_pagination");
//     const slideLen = slideContents.length;

//     setPagnationHtml(slideLen, 0).then((pageChild) => {
//       pagination.innerHTML = pageChild;
//       const slideWidth = 485;
//       const slideSpeed = 300;
//       createCarousel(slideContents, buttons, slideList, slideWidth, slideSpeed);
//     });
//   })
//   .catch((err) => console.log(err));
