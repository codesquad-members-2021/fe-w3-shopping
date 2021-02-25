export class Slider {
  constructor() {
    this.silder = document.querySelector('.slide');
  }

  onEvents() {
    this.silder.addEventListener('click', this.clickArrowBtnHandler);
  }

  slideAutomatically() {
    const imgLists = document.querySelector('.main-theme-category-lists');
    let i = 0;
    let timerId = setTimeout(function tick() {
      if (i > 3) {
        i = 0;
      }
      imgLists.style.transform = `translate3d(-${77.5 * i}rem,0,0)`;
      i += 1;
      timerId = setTimeout(tick, 2500);
    }, 2500);
  }

  clickArrowBtnHandler(e) {
    const slideImgs = document.querySelectorAll('.slide-img');

    if (e.target.closest('.arrow-btn-right')) {
      slideImgs.forEach((img, i) => {
        img.classList.add(`slide-move`);
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
