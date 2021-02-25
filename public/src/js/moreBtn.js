import { makeItemList, makeMoreBtn, ul } from './util/htmlTemplate.js';

class More {
  constructor(data, { container, moreBtn }) {
    this.data = data;
    this.currentData = 5; //this.data의 몇번째 데이터까지 렌더링돼있나 확인
    this.maxData = 5;
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
    const currentIndex = Math.floor(this.currentData / this.maxData) - 1;
    const nextData = this.data[currentIndex + 1];
    if (nextData) {
      this.currentData += nextData.length;
      this.renderMore();
    } else {
      this.currentData = 5;
      this.renderInit();
    }
  }
  //this.data를 화면에 따라 5개씩 잘라 2차원배열
  splitData() {
    const splitedData = [];
    for (let i = 0; i < this.data.length; i += 5) {
      splitedData.push(this.data.slice(i, i + 5));
    }
    this.data = splitedData;
  }
  getMoreListHTML() {
    const currentIndex = Math.floor(this.currentData / this.maxData) - 1;
    const moreItemsHTML = this.data[currentIndex].reduce((acc, cur) => acc + makeItemList(cur), '');
    const moreListHTML = ul({ value: moreItemsHTML, classes: ['event-item-list'] });
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

export default More;
