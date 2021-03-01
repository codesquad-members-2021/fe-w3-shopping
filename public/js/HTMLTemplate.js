function eventProductTemplate({ imgurl, dataseq, text, text2 }) {
  return `
  <li class="main-top-article-sec-imgs img-visibility-hidden">
    <a class="main-top-sec-img" href="#">
      <img src="${imgurl}" alt="${dataseq}"/>
    </a>
    <div class="main-top-article-description">
    <h6>${text}</h6>
    <p>${text2}</p>
    </div>
  </li>`;
}

function slideTemplate(url, idx) {
  return `
  <a class="slide-img" href="#">
    <img src="${url}" alt="main-top-${idx}" />
  </a>`;
}

function themeCategoryTemplate({ imgurl, dataseq, text, text2 }) {
  return `
  <li class="main-theme-category-list">
    <a class="main-theme-cateogry-img" href="#">
    <img src="${imgurl}" alt="${dataseq}"/>
    </a>
    <div class="main-theme-category-description">
    <h6>${text}</h6>
    <p>${text2}</p>
    </div>
  </li>`;
}

export { eventProductTemplate, slideTemplate, themeCategoryTemplate };
