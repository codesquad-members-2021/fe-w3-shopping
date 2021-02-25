import { LoadItem } from './loadItem.js';

class Slider {
  constructor() {
    this.silder = document.querySelector('.slide');
  }

  onEvents() {
    this.silder.addEventListener('click', this.clickArrowBtnHandler);
  }

  clickArrowBtnHandler(e) {
    // anchor tag 눌림 방지
    e.preventDefault();
    console.log('버튼이 클릭되었습니다.');
  }
}

const loadItems = () => {
  const loadItem = new LoadItem();
  loadItem.showImgContents();
};

const excuteSlide = () => {
  const slider = new Slider();
  slider.onEvents();
};

const main = () => {
  loadItems();
  excuteSlide();
};

main();
