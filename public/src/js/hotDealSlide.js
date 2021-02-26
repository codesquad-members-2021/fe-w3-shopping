import Slide from './slide.js';
import { makeSlideItem } from './util/htmlTemplate.js';

class HotDealSlide extends Slide {
  constructor(data, selectors, animation) {
    super(data, selectors, animation);
    this.timer;
  }
  init() {
    super.init();
    super.onEvent();
    this.onEvent();
  }
  onEvent() {
    this.slideBtn.addEventListener('mousedown', this.handleMousedown.bind(this));
    this.slideBtn.addEventListener('mouseup', this.handleMouseup.bind(this));
  }
  handleMousedown({ target: { classList } }) {
    if (this.isPrevBtn(classList)) {
      this.timer = setInterval(this.doubleSlidePrev.bind(this), 2000);
    } else if (this.isNextBtn(classList)) {
      this.timer = setInterval(this.doubleSlideNext.bind(this), 2000);
    }
  }
  handleMouseup() {
    if (this.timer) clearInterval(this.timer);
  }
  handleTransitionEnd() {
    this.render();
  }
  doubleSlidePrev() {
    this.setSlideAnimation({ moveX: this.oneStep * 2, transition: this.transition });
    for (let i = 0; i < 2; i++) {
      this.setPrevData();
    }
  }
  doubleSlideNext() {
    this.setSlideAnimation({ moveX: this.oneStep * 2 * -1, transition: this.transition });
    for (let i = 0; i < 2; i++) {
      this.setNextData();
    }
  }
}

export default HotDealSlide;
