import { CLASS_LIST } from './util/data';

class Slider {
  constructor({ data, selectors, animation, makeHtmlFn }) {
    this.data = data;
    this.container = selectors.container;
    this.slideList = selectors.slideList;
    this.slideBtn = selectors.slideBtn;
    this.oneStep = animation.oneStep;
    this.transition = animation.transition;
    this.makeHtmlFn = makeHtmlFn; //각 상황에 맞는 html template만들어주는 함수
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
    const { PREV_BTN, PREV_ICON } = CLASS_LIST;
    return classList.contains(PREV_BTN) || classList.contains(PREV_ICON);
  }
  isNextBtn(classList) {
    const { NEXT_BTN, NEXT_ICON } = CLASS_LIST;
    return classList.contains(NEXT_BTN) || classList.contains(NEXT_ICON);
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
  //각 dom에 맞는 template dom을 만들어주는 함수를 인자로 받아서 사용
  getSlideHTML() {
    const slideHTML = this.data.reduce((acc, cur) => acc + this.makeHtmlFn(cur), '');
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

export default Slider;
