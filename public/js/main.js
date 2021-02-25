import { LoadItem } from './loadItem.js';

class Slider {
  constructor() {
    this.silder = document.querySelector('.slide');
  }

  onEvents() {
    this.silder.addEventListener('click', this.clickArrowBtnHandler);
  }

  clickArrowBtnHandler(e) {
    const slideImgs = document.querySelectorAll('.slide-img');
    const imgContainer = document.querySelector('.main-top-slide-imgs');

    if (e.target.closest('.arrow-btn-right')) {
      slideImgs.forEach((img) => {
        img.classList.add('slide-move');
      });
    }

    if (e.target.closest('.arrow-btn-left')) {
      console.log('왼쪽 버튼클릭');
      slideImgs.forEach((img) => {
        img.style.transform = 'translate3d(35rem,0,0)';
      });
    }
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
