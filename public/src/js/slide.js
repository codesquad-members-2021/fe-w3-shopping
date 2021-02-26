import { makeSlideItem } from './util/htmlTemplate.js';
import { domSelect } from './util/util.js';
import { CLASS_LIST } from './util/data.js';

class Slide {
  constructor(data, { container, slideList, pagingBtn }) {
    this.data = data;
    this.currentData = this.data[Math.floor(this.data.length / 2)]; //data 가운데 값이 default
    this.originData = [...this.data];
    this.container = container;
    this.slideList = slideList;
    this.pagingBtn = pagingBtn;
    this.pagingBtns = domSelect('.btn-paging', true, pagingBtn);
    this.oneStep = 515;
    this.slideTransition = 'all 0.3s';
  }
  init() {
    this.render();
    this.checkPagingBtn();
    this.onEvent();
  }
  onEvent() {
    this.container.addEventListener('click', this.handleClick.bind(this));
    this.slideList.addEventListener('transitionend', this.handleTransitionEnd.bind(this));
    this.pagingBtn.addEventListener('mouseover', this.handleMouseOver.bind(this));
  }
  handleClick({ target: { classList } }) {
    if (this.isPrevBtn(classList)) {
      this.slidePrev();
      this.checkPagingBtn();
    } else if (this.isNextBtn(classList)) {
      this.slideNext();
      this.checkPagingBtn();
    }
  }
  handleTransitionEnd() {
    this.render();
  }
  //prettier-ignore
  handleMouseOver({ target: { dataset: { index } } }) {
    if (index) {
      this.paging(index);
    }
  }
  isPrevBtn(classList) {
    return classList.contains('btn-prev') || classList.contains('fa-chevron-left');
  }
  isNextBtn(classList) {
    return classList.contains('btn-next') || classList.contains('fa-chevron-right');
  }
  slidePrev() {
    this.setSlideAnimation({ moveX: this.oneStep, transition: this.slideTransition });
    this.setPrevData();
    this.setCurrentData();
  }
  slideNext() {
    this.setSlideAnimation({ moveX: this.oneStep * -1, transition: this.slideTransition });
    this.setNextData();
    this.setCurrentData();
  }
  setPrevData() {
    this.data.unshift(this.data.pop());
  }
  setNextData() {
    this.data.push(this.data.shift());
  }
  //currentData에 this.data의 가운데 값을 비교해서 적용시켜주기
  setCurrentData() {
    const midIdx = Math.floor(this.data.length / 2);
    this.currentData = this.data[midIdx];
  }
  setSlideAnimation({ moveX = 0, transition = '' }) {
    this.slideList.style.transition = transition;
    this.slideList.style.transform = `translate3d(${moveX}px, 0, 0)`;
  }
  getSlideHTML() {
    const slideHTML = this.data.reduce((acc, cur) => acc + makeSlideItem(cur), '');
    return slideHTML;
  }
  //변경된 data를 기반으로 list를 중앙으로 옮기면서 렌더링하기
  render() {
    this.setSlideAnimation({ moveX: 0, transition: '' }); //default값 설정했지만 의미때문에 파라미터 작성
    const slideHTML = this.getSlideHTML();
    this.slideList.innerHTML = slideHTML;
  }
  //slide의 가운데 값(currentData)을 비교해 paging버튼 체크해주기
  checkPagingBtn() {
    const { CURRENT_PAGE } = CLASS_LIST;
    const currentIdx = this.originData.indexOf(this.currentData);
    for (let btn of this.pagingBtns) {
      if (btn.dataset.index * 1 === currentIdx) {
        btn.classList.add(CURRENT_PAGE);
      } else {
        if (btn.classList.contains(CURRENT_PAGE)) {
          btn.classList.remove(CURRENT_PAGE);
        }
      }
    }
  }
  paging(index) {
    this.setDataByIndex(index);
    this.setCurrentData();
    this.checkPagingBtn();
    this.render();
  }
  //주어진 index의 값이 data의 중앙값(화면에 보여지는 부분)이 되게 data정렬
  setDataByIndex(index) {
    const midIdx = Math.floor(this.data.length / 2);
    while (this.data[midIdx] !== this.originData[index]) {
      this.setNextData();
    }
  }
}
export default Slide;
