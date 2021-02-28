const eventItem = (data) => {
  const { linkurl, imgurl } = data;
  return `<a href="${linkurl}"><img src="${imgurl}"/></a>`;
};

const mileageList = (href_url, img_url) => {
  // 3개 캐러셀 슬라이드
  return `<div class="slide_content"><a href="${href_url}"><img src="${img_url}"></a></div>`;
};

const mallEventList = (lists) => {
  // 더보기 제품들 목록
  return `<div class="panel"><ul class="list_item">${lists}</ul></div>`;
};

const mallEventItems = (href_url, img_url, title, info) => {
  // 더보기 제품들
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

const mileageListHtml = (array) => array.reduce((acc, val) => acc + mileageList(val.linkurl, val.imgurl), ``);

const mallEventListHtml = (array) => {
  let lists = "";
  return array.reduce((acc, val, idx) => {
    const { imgurl, linkurl, text, text2 } = val;
    if (!idx % 5) {
      acc += idx ? mallEventList(lists) : "";
      lists = "";
      lists += mallEventItems(linkurl, imgurl, text, text2);
    } else if (idx === array.length - 1) {
      lists += mallEventItems(linkurl, imgurl, text, text2);
      acc += mallEventList(lists);
    } else {
      lists += mallEventItems(linkurl, imgurl, text, text2);
    }
    return acc;
  }, ``);
};

const pageDotsHtml = (slideLen, startNum) => {
  // 페이지네이션 점들
  return new Promise((resolve, reject) => {
    const pageChild = [...Array(slideLen).keys()].reduce(
      (acc, val) =>
        acc +
        `<span class="btn_paging ${
          val === startNum ? "dot_active" : ""
        }" data-index="${val}"><span class="num_page"></span></span>`,
      ``
    );
    resolve(pageChild);
  });
};

const paginationHtml = (pagination) => {
  // 캐러셀 페이지네이션
  return new Promise((resolve, reject) => {
    const slideContents = document.querySelectorAll(".slide_content");
    const slideLen = slideContents.length;
    pageDotsHtml(slideLen, 0).then((pageChild) => {
      pagination.innerHTML = pageChild;
      resolve(slideContents);
    });
  });
};

const hotDealItems = (info, i) => {
  const { imageurl, produrl, prodname, mprice } = info;
  return `<li class="_GI_" data-id="${i}">
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
};

const hotDealList = (data) => {
  const contents = data.contents;
  let i = 0;
  let totalHtml = ``;
  Object.entries(contents).forEach((value, key) => {
    const currProducts = value[1].eventProducts;
    let hotDealHtml = `<ul class="list_hotDeal">`;
    hotDealHtml += currProducts.reduce((acc, val) => acc + hotDealItems(val, i++), ``);
    hotDealHtml += `</ul>`;
    totalHtml += hotDealHtml;
  });
  return totalHtml;
};

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export { eventItem, mileageListHtml, paginationHtml, mallEventListHtml, hotDealList };
