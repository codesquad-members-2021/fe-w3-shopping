import { makeSlideItem } from './htmlTemplate.js';
import { domSelect } from './util.js';
import { CLASS_LIST } from './data.js';

class Slide {
  constructor({ container, slideList, pagingBtn }) {
    this.data = [
      'http://shop3.daumcdn.net/shophow/sib/0_210219175556_BtjOWRoiPbsVXvlYusgFvjboDPXRIBQD',
      'https://shop3.daumcdn.net/shophow/sib/0_210219175609_PZjbWVyRtwcxTlShApbdyOenwLaYCOhs',
      'http://shop1.daumcdn.net/shophow/sib/0_210219175602_vRyGDQxWDethcelhYcMmXKXpgLqlAIAj'
    ];
    this.currentData = this.data[Math.floor(this.data.length / 2)]; //data 가운데 값이 default
    this.originData = [...this.data];
    this.container = container;
    this.slideList = slideList;
    this.pagingBtn = pagingBtn;
    this.pagingBtns = domSelect('.btn-paging', true, pagingBtn);
  }
  init() {
    this.checkPagingBtn();
    this.onEvent();
  }
  onEvent() {
    this.container.addEventListener('click', this.handleClick.bind(this));
    this.pagingBtn.addEventListener('mouseover', this.handleMouseOver.bind(this));
  }
  handleClick({ target: { classList } }) {
    if (this.isPrevBtn(classList)) {
      this.slidePrev();
      this.checkPagingBtn();
      setTimeout(this.render.bind(this), 300);
    } else if (this.isNextBtn(classList)) {
      this.slideNext();
      this.checkPagingBtn();
      setTimeout(this.render.bind(this), 300);
    }
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
  setPrevData() {
    this.data.unshift(this.data.pop());
  }
  setNextData() {
    this.data.push(this.data.shift());
  }
  slidePrev() {
    this.setSlideAnimation({ moveX: 515, transition: 'all 0.3s' });
    this.setPrevData();
    this.setCurrentData();
  }
  slideNext() {
    this.setSlideAnimation({ moveX: -515, transition: 'all 0.3s' });
    this.setNextData();
    this.setCurrentData();
  }
  setCurrentData() {
    const midIdx = Math.floor(this.data.length / 2);
    this.currentData = this.data[midIdx];
  }
  setSlideAnimation({ moveX, transition = '' }) {
    this.slideList.style.transition = transition;
    this.slideList.style.transform = `translate3d(${moveX}px, 0, 0)`;
  }
  getSlideHTML() {
    const slideHTML = this.data.reduce((acc, cur) => acc + makeSlideItem(cur), '');
    return slideHTML;
  }
  render() {
    this.setSlideAnimation({ moveX: 0 });
    const slideHTML = this.getSlideHTML();
    this.slideList.innerHTML = slideHTML;
  }
  //slide의 가운데 값을 비교해 paging버튼 체크해주기
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
    this.checkPagingBtn();
    this.render();
  }
  //주어진 index를 중앙으로 Data정렬
  setDataByIndex(index) {
    const midIdx = Math.floor(this.data.length / 2);
    while (this.data[midIdx] !== this.originData[index]) {
      this.setNextData();
    }
  }
}

export default Slide;
