export class Slider {
  constructor() {
    this.silder = document.querySelector('.slide');
  }

  onEvents() {
    this.silder.addEventListener('click', this.clickArrowBtnHandler.bind(this));
    this.silder.addEventListener('mouseover', this.mouseoverHandler.bind(this));
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
    const dot = document.querySelector('.active');

    if (e.target.closest('.arrow-btn-right')) {
      this.rightArrowClicked(slider, dot);
    } else if (e.target.closest('.arrow-btn-left')) {
      this.leftArrowClicked(slider, dot);
    }
  }

  mouseoverHandler({ target }) {
    const targetBtn = target.closest('.page-btn');

    if (!targetBtn) return;
    const slider = document.querySelector('.main-top-slide-container');
    const dot = this.manageDotRelatedValue(target);
    this.moveDot(slider, dot);
  }

  manageDotRelatedValue(target) {
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

  rightArrowClicked(slider, dot) {
    slider.classList.add(`slide-move-right`);
    slider.ontransitionend = () => {
      slider.classList.add('slide-move-duration-zero');
      slider.classList.remove(`slide-move-right`);
      slider.appendChild(slider.firstElementChild);
    };
    slider.classList.remove('slide-move-duration-zero');

    this.manipulateDotToRight(dot);
  }

  manipulateDotToRight(dot) {
    if (dot.nextElementSibling) {
      dot.nextElementSibling.classList.add('active');
    } else {
      dot.parentNode.firstElementChild.classList.add('active');
    }
    dot.classList.remove('active');
  }

  leftArrowClicked(slider, dot) {
    slider.classList.add(`slide-move-left`);
    slider.ontransitionend = () => {
      slider.classList.add('slide-move-duration-zero');
      slider.classList.remove(`slide-move-left`);
      const temp = slider.removeChild(slider.lastElementChild);
      slider.insertAdjacentElement('afterbegin', temp);
    };
    this.manipulateDotToLeft(dot);
    slider.classList.remove('slide-move-duration-zero');
  }

  manipulateDotToLeft(dot) {
    if (dot.previousElementSibling) {
      dot.previousElementSibling.classList.add('active');
    } else {
      dot.parentNode.lastElementChild.classList.add('active');
    }
    dot.classList.remove('active');
  }
}
