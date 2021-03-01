import Slide from './slider.js';
import { makeItemList } from './util/htmlTemplate.js';

class HotDealSlider extends Slide {
  constructor(data, selectors, animation) {
    super({ data, selectors, animation, makeHtmlFn: makeItemList });
    this.timer;
  }
  init() {
    super.init();
    this.onEvent();
  }
  onEvent() {
    super.onEvent();
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

export default HotDealSlider;
