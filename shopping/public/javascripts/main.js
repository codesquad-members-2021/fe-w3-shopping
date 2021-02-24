import createCarousel from "./articleTop/slide.js";
import { createEventItem, setMileageListHtml, setMallEventListHtml } from "./articleTop/panels.js";

const mallEventSlide = document.querySelector("#mallEventSlide");
const slideList = document.querySelector(".slide_list");
const eventItemHtml = document.querySelector(".event__item");

const insertStrsIntoHtmls = (...htmls) => (...strs) => {
  if (htmls.length !== strs.length) throw new Error("CANNOT INSERT STRS INTO HTMLS");
  htmls.forEach((html, index) => (html.innerHTML = strs[index]));
};

fetch("http://localhost:3000/planningEvent.json")
  .then((res) => res.json())
  .then((data) => {
    const { event, mileageList, mallEventList } = data;
    const eventItem = createEventItem(event.linkurl, event.imgurl);
    // mileageList html 코드 만들기
    const mileageListPanels = setMileageListHtml(mileageList);
    // mallEventListProducts html 코드 만들기
    const mallEventListPanels = setMallEventListHtml(mallEventList);
    return { eventItem, mileageListPanels, mallEventListPanels };
  })
  .then((strs) => {
    const { eventItem, mileageListPanels, mallEventListPanels } = strs;
    insertStrsIntoHtmls(eventItemHtml, slideList, mallEventSlide)(eventItem, mileageListPanels, mallEventListPanels);
    // eventItemHtml.innerHTML = eventItem;
    // slideList.innerHTML = mileageListPanels;
    // mallEventSlide.innerHTML = mallEventListPanels;

    const panels = document.querySelectorAll(".panel");
    const buttons = document.querySelectorAll(".btn_slide");
    // document.querySelector(".btn_prev");
    // document.querySelector(".btn_next");
    const slideWidth = 485;
    const slideSpeed = 300;

    createCarousel(panels, buttons, slideList, slideWidth, slideSpeed);
  })
  .catch((err) => console.log(err));
