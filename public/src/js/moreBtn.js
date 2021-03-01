import { CLASS_LIST } from './util/data.js';
import { makeItemList, makeMoreBtn, ul } from './util/htmlTemplate.js';

class MoreButtonView {
  constructor(data, { container, moreBtn }) {
    this.data = data;
    this.currentData = 5; //this.data의 몇번째 데이터까지 렌더링돼있나 확인
    this.maxView = 5;
    this.totalData = data.length;
    this.container = container;
    this.moreBtn = moreBtn;
  }
  init() {
    this.splitData();
    this.renderInit();
    this.onEvent();
  }
  onEvent() {
    this.moreBtn.addEventListener('click', this.handleClick.bind(this));
  }
  handleClick() {
    const currentIndex = Math.floor(this.currentData / this.maxView) - 1; //인덱스이니까 -1
    const nextData = this.data[currentIndex + 1];
    if (nextData) {
      this.currentData += nextData.length;
      this.renderMore();
    } else {
      this.currentData = this.maxView; //끝까지 다보여줬으면 초기화(접기)
      this.renderInit();
    }
  }
  //this.data를 화면에 따라 maxView(5개)씩 잘라 2차원배열
  splitData() {
    const splitedData = [];
    this.data.forEach((v, idx, src) => {
      if (idx % this.maxView === 0) splitedData.push(src.slice(idx, idx + this.maxView));
    });
    this.data = splitedData;
  }
  getMoreListHTML() {
    const currentIndex = Math.floor(this.currentData / this.maxView) - 1;
    const moreItemsHTML = this.data[currentIndex].reduce((acc, cur) => acc + makeItemList(cur), '');
    const moreListHTML = ul({ value: moreItemsHTML, classes: [CLASS_LIST.MORE_LIST] });
    return moreListHTML;
  }
  renderInit() {
    const moreListHTML = this.getMoreListHTML();
    this.container.innerHTML = moreListHTML;
    this.renderMoreBtn();
  }
  renderMore() {
    const moreListHTML = this.getMoreListHTML();
    this.container.innerHTML += moreListHTML;
    this.renderMoreBtn();
  }
  renderMoreBtn() {
    if (this.currentData < this.totalData) {
      this.moreBtn.innerHTML = makeMoreBtn({ now: this.currentData, total: this.totalData });
    } else {
      this.moreBtn.innerHTML = makeMoreBtn({ now: this.currentData, total: this.totalData, fold: true });
    }
  }
}

export default MoreButtonView;
