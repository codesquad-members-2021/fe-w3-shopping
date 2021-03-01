export class Slider {
  constructor() {
    this.silder = document.querySelector('.slide');
  }

  onEvents() {
    this.silder.addEventListener('click', this.clickArrowBtnHandler.bind(this));
    this.silder.addEventListener('mouseover', this.mouseoverHandler.bind(this));
  }

  // 자동으로 움직이는 슬라이더 해보고 싶어서 구현
  slideAutomatically() {
    const imgLists = document.querySelector('.main-theme-category-lists');
    let timerId = setTimeout(function tick() {
      imgLists.style.transform = 'translate3d(-77.5rem, 0, 0)';
      imgLists.ontransitionend = () => {
        imgLists.style.transitionDuration = '0ms';
        imgLists.style.transform = 'translate3d(0, 0, 0)';
        for (let i = 0; i < 5; i += 1) {
          imgLists.appendChild(imgLists.firstElementChild);
        }
      };
      imgLists.style.transitionDuration = '700ms';
      timerId = setTimeout(tick, 2500);
    }, 2500);
  }

  clickArrowBtnHandler(e) {
    const slider = document.querySelector('.main-top-slide-container');
    const dotClicked = document.querySelector('.active');

    if (e.target.closest('.arrow-btn-right')) {
      this.rightArrowClicked(slider, dotClicked);
    } else if (e.target.closest('.arrow-btn-left')) {
      this.leftArrowClicked(slider, dotClicked);
    }
  }

  mouseoverHandler({ target }) {
    const targetBtn = target.closest('.page-btn');

    if (!targetBtn) return;
    const slider = document.querySelector('.main-top-slide-container');
    const dot = this.getDotRelatedValues(target);
    this.moveDot(slider, dot);
  }

  getDotRelatedValues(target) {
    const isActive = document.querySelector('.active');
    const current = isActive.dataset.index;
    const clicked = target.dataset.index;
    const moveNum = current - clicked;
    const dot = {
      isActive,
      moveNum,
      target,
    };

    return dot;
  }

  moveDot(slider, dot) {
    if (dot.moveNum < 0) {
      for (let i = 0; i < Math.abs(dot.moveNum); i += 1) {
        slider.appendChild(slider.firstElementChild);
      }
      dot.isActive.classList.remove('active');
      dot.target.classList.add('active');
    } else if (dot.moveNum > 0) {
      for (let i = 0; i < Math.abs(dot.moveNum); i += 1) {
        slider.insertBefore(slider.lastElementChild, slider.firstElementChild);
      }
      dot.isActive.classList.remove('active');
      dot.target.classList.add('active');
    }
  }

  rightArrowClicked(slider, dotClicked) {
    slider.classList.add(`slide-move-right`);
    slider.ontransitionend = () => {
      slider.classList.add('slide-move-duration-zero');
      slider.classList.remove(`slide-move-right`);
      slider.appendChild(slider.firstElementChild);
    };
    slider.classList.remove('slide-move-duration-zero');

    this.manipulateDotToRight(dotClicked);
  }

  manipulateDotToRight(dotClicked) {
    if (dotClicked.nextElementSibling) {
      dotClicked.nextElementSibling.classList.add('active');
    } else {
      dotClicked.parentNode.firstElementChild.classList.add('active');
    }
    dotClicked.classList.remove('active');
  }

  leftArrowClicked(slider, dotClicked) {
    slider.classList.add(`slide-move-left`);
    slider.ontransitionend = () => {
      slider.classList.add('slide-move-duration-zero');
      slider.classList.remove(`slide-move-left`);
      const temp = slider.removeChild(slider.lastElementChild);
      slider.insertAdjacentElement('afterbegin', temp);
    };
    this.manipulateDotToLeft(dotClicked);
    slider.classList.remove('slide-move-duration-zero');
  }

  manipulateDotToLeft(dotClicked) {
    if (dotClicked.previousElementSibling) {
      dotClicked.previousElementSibling.classList.add('active');
    } else {
      dotClicked.parentNode.lastElementChild.classList.add('active');
    }
    dotClicked.classList.remove('active');
  }
}
