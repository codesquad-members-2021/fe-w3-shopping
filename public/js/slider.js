export class Slider {
  constructor() {
    this.silder = document.querySelector('.slide');
  }

  onEvents() {
    this.silder.addEventListener('click', this.clickArrowBtnHandler.bind(this));
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
    const slider = document.querySelector('.main-top-slide-container');

    if (e.target.closest('.arrow-btn-right')) {
      this.rightArrowClicked(slider);
    } else if (e.target.closest('.arrow-btn-left')) {
      this.leftArrowClicked(slider);
    }
  }

  rightArrowClicked(slider) {
    slider.classList.add(`slide-move-right`);
    slider.ontransitionend = () => {
      slider.classList.add('slide-move-duration-zero');
      slider.classList.remove(`slide-move-right`);
      slider.appendChild(slider.firstElementChild);
    };
    slider.classList.remove('slide-move-duration-zero');
  }

  leftArrowClicked(slider) {
    slider.classList.add(`slide-move-left`);
    slider.ontransitionend = () => {
      slider.classList.add('slide-move-duration-zero');
      slider.classList.remove(`slide-move-left`);
      const temp = slider.removeChild(slider.lastElementChild);
      slider.insertAdjacentElement('afterbegin', temp);
    };
    slider.classList.remove('slide-move-duration-zero');
  }
}
