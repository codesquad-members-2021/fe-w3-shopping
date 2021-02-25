export class LoadItem {
  #planningEventJSON = 'planningEvent.json';
  #homeContentsJSON = 'homeContents.json';

  constructor() {
    this.host = 'http://localhost';
    this.port = 3000;
    this.path = 'data';
    this.count = 5;
  }

  onEvents() {
    const showMoreBtn = document.querySelector('.show-btn');
    showMoreBtn.addEventListener('click', this.clickBtnHandler.bind(this));
  }

  clickBtnHandler() {
    this.showImgs();
  }

  showImgContents() {
    fetch(`${this.host}:${this.port}/${this.path}/${this.#planningEventJSON}`)
      .then((response) => response.json())
      .then((json) => {
        const slideURL = this.getSlideImgURL(json);
        const eventProducts = this.getEventProductList(json);
        this.insertSlideTemplate(slideURL);
        this.insertSecondLineTemplate(eventProducts);
        this.insertThemeCategoryTemplate(eventProducts);
        this.showImgs();
      })
      .catch((error) => console.log('에러입니다', error));
  }

  getSlideImgURL(json) {
    return json.mileageList.map((list) => list.imgurl);
  }

  getEventProductList(json) {
    return json.mallEventList.map((list) => list);
  }

  insertSlideTemplate(urls) {
    const mainTopSlideSection = document.querySelector('.main-top-slide-imgs');
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

  showImgs() {
    const mainTopSecondLine = document.querySelectorAll(
      '.main-top-article-sec-imgs.img-visibility-hidden'
    );
    for (let i = 0; i < 5; i += 1) {
      mainTopSecondLine[i]?.classList.remove('img-visibility-hidden');
    }
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
