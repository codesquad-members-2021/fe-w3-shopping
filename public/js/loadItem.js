export class LoadItem {
  constructor(rawData) {
    this.rawData = rawData;
  }

  onEvents() {
    const showMoreBtn = document.querySelector('.show-btn');
    showMoreBtn.addEventListener('click', this.clickBtnHandler.bind(this));
  }

  clickBtnHandler() {
    this.showImgs();
  }

  insertTemplate(slideURL, eventProducts) {
    this.insertSlideTemplate(slideURL);
    this.insertSecondLineTemplate(eventProducts);
    this.insertThemeCategoryTemplate(eventProducts);
  }

  showImgContents() {
    this.rawData
      .then((data) => {
        const slideURL = this.getSlideImgURL(data);
        const eventProducts = this.getEventProductList(data);
        this.insertSecondLineTemplate(slideURL, eventProducts);
        this.showImgs();
      })
      .catch((error) => alert('에러입니다_loadItem.js 확인', error));
  }

  showImgs() {
    const mainTopSecondLine = document.querySelectorAll(
      '.main-top-article-sec-imgs.img-visibility-hidden'
    );
    for (let i = 0; i < 5; i += 1) {
      mainTopSecondLine[i]?.classList.remove('img-visibility-hidden');
    }
  }

  getSlideImgURL(data) {
    return data.mileageList.map((list) => list.imgurl);
  }

  getEventProductList(data) {
    return data.mallEventList.map((list) => list);
  }

  insertSlideTemplate(urls) {
    const mainTopSlideSection = document.querySelector(
      '.main-top-slide-container'
    );
    urls.forEach((url, idx) => {
      mainTopSlideSection.insertAdjacentHTML(
        'beforeend',
        `
      <a class="slide-img" href="#">
      <img src="${url}" alt="main-top-${idx}" />
    </a>
    `
      );
    });
  }

  insertSecondLineTemplate(eventProducts) {
    const mainTopSecondLine = document.querySelector(
      '.main-top-article-secondline'
    );

    eventProducts.forEach((url) => {
      mainTopSecondLine.insertAdjacentHTML(
        'beforeend',
        `<li class="main-top-article-sec-imgs img-visibility-hidden">
      <a class="main-top-sec-img" href="#"
        ><img src="${url.imgurl}" alt="${url.dataseq}"
      /></a>
      <div class="main-top-article-description">
        <h6>${url.text}</h6>
        <p>${url.text2}</p>
      </div>
    </li>`
      );
    });
  }

  insertThemeCategoryTemplate(eventProducts) {
    const themeCategoryImgs = document.querySelector(
      '.main-theme-category-lists'
    );

    eventProducts.forEach((url) => {
      themeCategoryImgs.insertAdjacentHTML(
        'beforeend',
        `<li class="main-theme-category-list">
        <a class="main-theme-cateogry-img" href="#"
          ><img src="${url.imgurl}" alt="${url.dataseq}"
        /></a>
        <div class="main-theme-category-description">
          <h6>${url.text}</h6>
          <p>${url.text2}</p>
        </div>
      </li>`
      );
    });
  }
}
