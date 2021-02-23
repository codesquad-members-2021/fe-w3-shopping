const mallEventSlide = document.querySelector("#mallEventSlide");

// console.log(mallEventSlide);

const createPanel = (lists) => {
  return `<div class="panel"><ul class="list_item">${lists}</ul></div>`;
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

let panels = "";
let lists = "";

fetch("http://localhost:3000/planningEvent.json")
  .then((res) => res.json())
  .then((data) => {
    const event = data.event; // best100 event 상품
    const mileageList = data.mileageList; // 캐러셀
    console.log(mileageList);
    const mallEventListProducts = data.mallEventList;
    console.log(mallEventListProducts);
    mallEventListProducts.forEach((product, idx, array) => {
      const { imgurl, linkurl, text, text2 } = product;
      //   let panels = "";
      if (idx % 5 === 0) {
        if (idx) panels += createPanel(lists);
        lists = "";
        lists += createLists(linkurl, imgurl, text, text2);
      } else if (idx === array.length - 1) {
        lists += createLists(linkurl, imgurl, text, text2);
        panels += createPanel(lists);
      } else {
        lists += createLists(linkurl, imgurl, text, text2);
      }
    });
    mallEventSlide.innerHTML = panels;
  });
