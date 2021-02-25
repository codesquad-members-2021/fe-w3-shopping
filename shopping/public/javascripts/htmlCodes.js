const createEventItem = (data) => {
  const { linkurl, imgurl } = data;
  return /*html*/ `<a href="${linkurl}"><img src="${imgurl}"/></a>`;
};

const createMallEventListPanel = (lists) => {
  return /*html*/ `<div class="panel"><ul class="list_item">${lists}</ul></div>`;
};

const createMileageListPanel = (href_url, img_url) => {
  return /*html*/ `<div class="slide_content"><a href="${href_url}"><img src="${img_url}"></a></div>`;
};

const createLists = (href_url, img_url, title, info) => {
  return /*html*/ `<li class="_GI_">
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

const createHotDeal = (contents) => {
  let i = 0;
  let hotDealHtml;
  Object.entries(contents).forEach((value, key) => {
    const currProducts = value[1].eventProducts;
    hotDealHtml = currProducts.reduce((acc, val) => {
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
    // console.log(totalHtml);
  });
  return `<ul class="list_hotDeal">${hotDealHtml}</ul>`;
};

const setMileageListHtml = (array) => array.reduce((acc, val) => acc + createMileageListPanel(val.linkurl, val.imgurl), ``);

const setMallEventListHtml = (array) => {
  let lists = "";
  return array.reduce((acc, val, idx) => {
    const { imgurl, linkurl, text, text2 } = val;
    if (!idx % 5) {
      acc += idx ? createMallEventListPanel(lists) : "";
      lists = "";
      lists += createLists(linkurl, imgurl, text, text2);
    } else if (idx === array.length - 1) {
      lists += createLists(linkurl, imgurl, text, text2);
      acc += createMallEventListPanel(lists);
    } else {
      lists += createLists(linkurl, imgurl, text, text2);
    }
    return acc;
  }, ``);
};

function createPagnationHtml(slideLen, startNum) {
  return new Promise((resolve, reject) => {
    const pageChild = [...Array(slideLen).keys()].reduce((acc, val) => acc + `<span class="btn_paging ${val === startNum ? "dot_active" : ""}" data-index="${val}"><span class="num_page"></span></span>`, ``);
    resolve(pageChild);
  });
}

function setPaginationHtml(pagination) {
  return new Promise((resolve, reject) => {
    const slideContents = document.querySelectorAll(".slide_content");
    const slideLen = slideContents.length;
    createPagnationHtml(slideLen, 0).then((pageChild) => {
      pagination.innerHTML = pageChild;
      resolve(slideContents);
    });
  });
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export { createEventItem, setMileageListHtml, setPaginationHtml, setMallEventListHtml, createHotDeal };
