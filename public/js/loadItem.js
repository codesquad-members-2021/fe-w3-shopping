import {
  eventProductTemplate,
  slideTemplate,
  themeCategoryTemplate,
} from './HTMLTemplate.js';

export class LoadItem {
  constructor(rawData) {
    this.rawData = rawData;
  }

  onEvents() {
    const showMoreBtn = document.querySelector('.show-btn');
    showMoreBtn.addEventListener('click', this.clickBtnHandler.bind(this));
  }

  clickBtnHandler() {
    this.renderImgs();
    this.showRestImgsCount();
  }

  showRestImgsCount() {
    const column = 5;
    const imgsCount = document.querySelector('.show-imgs-count');
    const imgsTotal = document.querySelector('.show-imgs-total');
    const imgsHidden =
      document.querySelectorAll('.img-visibility-hidden').length - 1;
    const allImgs =
      document.querySelectorAll('.main-top-article-sec-imgs').length - 1;
    const imgsVisible = (allImgs - imgsHidden) / column;
    const imgsTotalCount = Math.ceil(allImgs / column);

    imgsCount.textContent = imgsVisible;
    imgsTotal.textContent = imgsTotalCount;
  }

  insertTemplates(slideURL, eventProducts) {
    this.insertSlideTemplate(slideURL);
    this.insertSecondLineTemplate(eventProducts);
    this.insertThemeCategoryTemplate(eventProducts);
  }

  showImgContents() {
    this.rawData
      .then((data) => {
        const slideURL = this.getSlideImgURL(data);
        const eventProducts = this.getEventProductList(data);
        this.insertTemplates(slideURL, eventProducts);
      })
      .catch((error) => alert('에러입니다_loadItem.js 확인', error));
  }

  renderImgs() {
    const defaultImgsNum = 5;
    const mainTopSecondLine = document.querySelectorAll(
      '.main-top-article-sec-imgs.img-visibility-hidden'
    );
    for (let i = 0; i < defaultImgsNum; i += 1) {
      mainTopSecondLine[i]?.classList.remove('img-visibility-hidden');
    }
  }

  getSlideImgURL(data) {
    return data.mileageList.map((list) => list.imgurl);
  }

  getEventProductList(data) {
    return data.mallEventList;
  }

  insertSlideTemplate(urls) {
    const mainTopSlideSection = document.querySelector(
      '.main-top-slide-container'
    );
    urls.forEach((url, idx) => {
      const template = slideTemplate(url, idx);
      mainTopSlideSection.insertAdjacentHTML('beforeend', template);
    });
  }

  insertSecondLineTemplate(eventProducts) {
    const mainTopSecondLine = document.querySelector(
      '.main-top-article-secondline'
    );

    const loadimgs = () => {
      eventProducts.forEach((imgData) => {
        const template = eventProductTemplate(imgData);
        mainTopSecondLine.insertAdjacentHTML('beforeend', template);
      });
    };

    setTimeout(() => {
      loadimgs();
      this.renderImgs();
      this.showRestImgsCount();
    }, 1000);
  }

  insertThemeCategoryTemplate(eventProducts) {
    const themeCategoryImgs = document.querySelector(
      '.main-theme-category-lists'
    );

    eventProducts.forEach((imgData) => {
      const template = themeCategoryTemplate(imgData);
      themeCategoryImgs.insertAdjacentHTML('beforeend', template);
    });
  }
}
