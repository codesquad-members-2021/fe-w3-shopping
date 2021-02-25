const setMain = (articleSections, etc, initialDividingLine = false) => {
  return `${initialDividingLine ? '<div class="dividing-space"></div>' : ""}
    ${articleSections}
    ${etc}`;
};

const bestItem = `<div class="event event__item"></div>`;

const setCarouselItems = (...buttons) => {
  return `<div class="event event__slide">
    <div class="slide_event">
      <div class="slide slide_list"></div>
    </div>
    <!-- 페이지 넘기는 버튼, 페이지네이션 -->
    <div class="paging_comm">
      <button class="btn_slide ${buttons[0].className}">${buttons[0].icon}</button>
      <span class="inner_paging slide_pagination"></span>
      <button class="btn_slide ${buttons[1].className}">${buttons[1].icon}</button>
    </div>
  </div>`;
};

const setReadmoreItems = (button) => {
  return `<div id="mallEventList" class="top__event-list">
    <div id="mallEventListSlide" class="event-list__slide">
      <div id="mallEventSlide" class="slide"></div>
    </div>
  </div>
  <button id="mallEventList_more">${button.state}</button>`;
};

const createArticleTop = (bestItem, carouselItems, readmoreItems) => {
  return `<div class="top__event">
    <!-- best100 아이템 -->
    ${bestItem}
    <!-- 캐러셀 3개 아이템 -->
    ${carouselItems}
  </div>
  <!-- readmore 5개 아이템 -->
  ${readmoreItems}
  `;
};

const createArticleHotdeal = (title, ...buttons) => {
  return `<div class="section__hotDeal">
    <div class="title_info">
      <h3>${title}</h3>
    </div>
    <div class="hotDeal__container">
      <div class="content_hotDeal"></div>
    </div>
    <div class="buttons_hotDeal">
      <button class="${buttons[0].className}_hotDeal">${buttons[0].icon}</button>
      <button class="${buttons[1].className}_hotDeal">${buttons[1].icon}</button>
    </div>
  </div>`;
};

const createItems_temp = (size, html) => {
  return Array(size)
    .fill(0)
    .reduce((acc, val, index) => acc + html, ``);
};

const createArticleKeyword = (title, items) => {
  return `<div class="title_info">
        <h3 class="title_home">${title}</h3>
        <!-- <span class="txt_info"></span> -->
      </div>
      <div class="content_item">
        <ul class="list_item">
          ${items}
        </ul>
      </div>`;
};

const createArticleHow = (title, items) => {
  return `<div class="title_info">
    <h3 class="title_home">${title}</h3>
  </div>
  <div class="content_item">
    <div class="item_how">
      <strong class="title_sub">비슷한 관심사의 사람들이 많이 본 상품</strong>
      <ul class="relate_wrap list_item">
        ${items}
      </ul>
      <a href="" class="link_view"></a>
    </div>
  </div>`;
};

const createEtc = (title, items, viewAllButton = false) => {
  return `<section class="main__etc">
    <article class="etc__partner">
      <h3 class="title_home">${title}</h3>
      <div class="section_etc">
        <div class="cont_partner">
            ${items}
          <button class="btn_home"><i class="fas fa-plus"></i></button>
        </div>
      </div>
        ${viewAllButton ? `<a href="" class="link_all">전체보기<i class="fas fa-chevron-right"></i></a>` : ""}
    </article>
    <article class="etc__notice"></article>
  </section>`;
};

const setArticleSections = (articleTop, articleHotdeal, articleKeyword, articleHow) => {
  return `<section class="main__article">
    <article class="article__top">
      ${articleTop}
    </article>

    <article class="article__hotDeal">
      ${articleHotdeal}
    </article>

    <article class="article__keyword">
      ${articleKeyword}
    </article>

    <article class="article__how">
      ${articleHow}
    </article>
  </section>
  `;
};

module.exports = {
  setMain,
  bestItem,
  setCarouselItems,
  setReadmoreItems,
  createArticleTop,
  createArticleHotdeal,
  createItems_temp,
  createArticleKeyword,
  createArticleHow,
  setArticleSections,
  createEtc,
};
