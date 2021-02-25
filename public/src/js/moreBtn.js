import { makeMoreList } from './htmlTemplate.js';

class More {
  constructor(data, { container, moreBtn }) {
    this.data = data;
    this.currentData = 0; //this.data의 몇번째 데이터까지 렌더링돼있나 확인
    this.totalData = data.length;
    this.container = container;
    this.moreBtn = moreBtn;
  }
  init() {
    console.log('?');
    this.splitData();
    this.render();
  }
  onEvent() {
    this.moreBtn.addEventListener('click', handleClick.bind(this));
  }
  handleClick() {
    //if currentData / totalData 비교해서
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
    const moreListHTML = this.data[0].reduce((acc, cur) => acc + makeMoreList(cur), '');
    return moreListHTML;
  }
  render() {
    const moreListHTML = this.getMoreListHTML();
    this.container.innerHTML = moreListHTML;
  }
}

export default More;
