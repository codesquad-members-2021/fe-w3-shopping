import { makeItemList } from './util/htmlTemplate.js';

class Slide {
  constructor(data, selectors, animation) {
    this.data = data;
    this.container = selectors.container;
    this.slideList = selectors.slideList;
    this.slideBtn = selectors.slideBtn;
    this.oneStep = animation.oneStep;
    this.transition = animation.transition;
  }
  init() {
    this.render();
  }
  onEvent() {
    this.slideBtn.addEventListener('click', this.handleClick.bind(this));
    this.slideList.addEventListener('transitionend', this.handleTransitionEnd.bind(this));
  }
  handleClick({ target: { classList } }) {
    if (this.isPrevBtn(classList)) {
      this.slidePrev();
    } else if (this.isNextBtn(classList)) {
      this.slideNext();
    }
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
    this.setSlideAnimation({ moveX: this.oneStep, transition: this.transition });
    this.setPrevData();
  }
  slideNext() {
    this.setSlideAnimation({ moveX: this.oneStep * -1, transition: this.transition });
    this.setNextData();
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
    this.setSlideAnimation({ moveX: 0, transition: '' });
    const slideHTML = this.getSlideHTML();
    this.slideList.innerHTML = slideHTML;
  }
  setSlideAnimation({ moveX = 0, transition = '' }) {
    this.slideList.style.transition = transition;
    this.slideList.style.transform = `translate3d(${moveX}px, 0, 0)`;
  }
}

export default Slide;
