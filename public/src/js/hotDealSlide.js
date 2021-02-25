import { makeItemList, ul } from './util/htmlTemplate.js';

class HotDealSlide {
  constructor(data, { container, slideList, slideBtn }) {
    this.data = data.slice(0, 10); //임의로 데이터를 10개만 잘랐다.
    this.container = container;
    this.slideList = slideList;
    this.slideBtn = slideBtn;
    this.oneStep = 260.6;
    this.timer;
  }
  init() {
    this.render();
    this.onEvent();
  }
  onEvent() {
    this.slideBtn.addEventListener('click', this.handleClick.bind(this));
    this.slideBtn.addEventListener('mousedown', this.handleMousedown.bind(this));
    this.slideBtn.addEventListener('mouseup', this.handleMouseup.bind(this));
    this.slideList.addEventListener('transitionend', this.handleTransitionEnd.bind(this));
  }
  handleClick({ target: { classList } }) {
    if (this.isPrevBtn(classList)) {
      this.slidePrev();
    } else if (this.isNextBtn(classList)) {
      this.slideNext();
    }
  }
  handleMousedown({ target: { classList } }) {
    if (this.isPrevBtn(classList)) {
      this.timer = setInterval(this.doubleSlidePrev.bind(this), 500);
    } else if (this.isNextBtn(classList)) {
      this.timer = setTimeout(this.doubleSlideNext.bind(this), 500);
    }
  }
  handleMouseup() {
    if (this.timer) clearInterval(this.timer);
  }
  handleTransitionEnd() {
    this.render();
  }
  isPrevBtn(classList) {
    return classList.contains('btn-prev') || classList.contains('fa-chevron-left');
  }
  isNextBtn(classList) {
    return classList.contains('btn-next') || classList.contains('fa-chevron-right');
  }
  slidePrev() {
    this.setSlideAnimation({ moveX: this.oneStep, transition: 'all 0.3s' });
    this.setPrevData();
  }
  slideNext() {
    this.setSlideAnimation({ moveX: this.oneStep * -1, transition: 'all 0.3s' });
    this.setNextData();
  }
  doubleSlidePrev() {
    this.setSlideAnimation({ moveX: this.oneStep * 2, transition: 'all 0.3s' });
    for (let i = 0; i < 2; i++) {
      this.setPrevData();
    }
  }
  doubleSlideNext() {
    this.setSlideAnimation({ moveX: this.oneStep * 2 * -1, transition: 'all 0.3s' });
    for (let i = 0; i < 2; i++) {
      this.setNextData();
    }
  }
  setPrevData() {
    this.data.unshift(this.data.pop());
  }
  setNextData() {
    this.data.push(this.data.shift());
  }
  getSlideHTML() {
    const slideHTML = this.data.reduce((acc, cur) => acc + makeItemList(cur), '');
    return slideHTML;
  }
  render() {
    this.setSlideAnimation({ moveX: 0 });
    const slideHTML = this.getSlideHTML();
    this.slideList.innerHTML = slideHTML;
  }
  setSlideAnimation({ moveX, transition = '' }) {
    this.slideList.style.transition = transition;
    this.slideList.style.transform = `translate3d(${moveX}px, 0, 0)`;
  }
}

export default HotDealSlide;
