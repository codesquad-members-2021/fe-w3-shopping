import Slide from './slide.js';
import { makeSlideItem } from './util/htmlTemplate.js';
import { domSelect } from './util/util.js';
import { CLASS_LIST } from './util/data.js';

class BannerSlide extends Slide {
  constructor(data, selectors, animation) {
    super({ data, selectors, animation, makeHtmlFn: makeSlideItem });
    this.currentData = this.data[Math.floor(this.data.length / 2)]; //data 가운데 값이 default
    this.originData = [...this.data];
    this.pagingBtn = selectors.pagingBtn;
    this.pagingBtns = domSelect('.btn-paging', true, this.pagingBtn);
  }
  init() {
    super.init();
    this.onEvent();
  }
  onEvent() {
    super.onEvent();
    this.pagingBtn.addEventListener('mouseover', this.handleMouseOver.bind(this));
  }
  //prettier-ignore
  handleMouseOver({ target: { dataset: { index } } }) {
    if (index) {
      this.paging(index);
    }
  }
  slidePrev() {
    super.slidePrev();
    this.setCurrentData();
  }
  slideNext() {
    super.slideNext();
    this.setCurrentData();
  }
  //currentData에 this.data의 가운데 값을 비교해서 적용시켜주기
  setCurrentData() {
    const midIdx = Math.floor(this.data.length / 2);
    this.currentData = this.data[midIdx];
  }
  // getSlideHTML() {
  //   console.log('이건 쓰이냐?');
  //   const slideHTML = this.data.reduce((acc, cur) => acc + makeSlideItem(cur), '');
  //   return slideHTML;
  // }
  //변경된 data를 기반으로 list를 중앙으로 옮기면서 렌더링하기
  render() {
    super.render();
    this.checkPagingBtn();
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
export default BannerSlide;
