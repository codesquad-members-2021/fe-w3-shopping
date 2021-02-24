import createCarousel from "./slide.js";

const mallEventSlide = document.querySelector("#mallEventSlide");
const slideList = document.querySelector(".slide_list");

const createMallEventListPanel = (lists) => {
  return `<div class="panel"><ul class="list_item">${lists}</ul></div>`;
};

const createMileageListPanel = (href_url, img_url) => {
  return `<div class="panel"><a href="${href_url}"><img src="${img_url}"></a></div>`;
};

const createLists = (href_url, img_url, title, info) => {
  return `<li class="_GI_">
    <a href="${href_url}">
      <span class="info_thumb">
        <img src="${img_url}" alt="" />
      </span>
      <strong class="title_g">${title}</strong>
      <span class="txt_info">${info}</span>
      <span class="ico_comm2 ico_theme">테마</span>
    </a>
  </li>`;
};

fetch("http://localhost:3000/planningEvent.json")
  .then((res) => res.json())
  .then((data) => {
    const { event, mileageList, mallEventList } = data;
    console.log(mileageList, mallEventList);
    // const event = data.event; // best100 event 상품
    // const mileageList = data.mileageList; // 캐러셀
    // const mallEventListProducts = data.mallEventList;

    // mileageList html 코드 만들기
    const mileageListpanels = mileageList.reduce((acc, val) => {
      const { imgurl, linkurl } = val;
      acc += createMileageListPanel(linkurl, imgurl);
      return acc;
    }, ``);

    // mallEventListProducts html 코드 만들기
    let lists = "";
    const mallEventListPanels = mallEventList.reduce((acc, val, idx) => {
      const { imgurl, linkurl, text, text2 } = val;
      if (!idx % 5) {
        if (idx) acc += createMallEventListPanel(lists);
        lists = "";
        lists += createLists(linkurl, imgurl, text, text2);
      } else if (idx === mallEventList.length - 1) {
        lists += createLists(linkurl, imgurl, text, text2);
        acc += createMallEventListPanel(lists);
      } else lists += createLists(linkurl, imgurl, text, text2);
      return acc;
    }, ``);

    return { mileageListpanels, mallEventListPanels };
  })
  .then((res) => {
    const { mileageListpanels, mallEventListPanels } = res;
    slideList.innerHTML = mileageListpanels;
    mallEventSlide.innerHTML = mallEventListPanels;

    const panels = document.querySelectorAll(".panel");
    const prevButton = document.querySelector(".btn_prev");
    const nextButton = document.querySelector(".btn_next");
    const slideWidth = 485;
    const slideSpeed = 300;

    createCarousel(panels, prevButton, nextButton, slideList, slideWidth, slideSpeed);
  });
