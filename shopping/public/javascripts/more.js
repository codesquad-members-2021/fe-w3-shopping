import _ from "./utils.js";
import listHTML from "./HtmlTemplete.js";

export default class Morebtn {
  constructor(data, moreBtn, container) {
    this.data = data;
    this.totalData = data.length;
    this.container = container;
    this.moreBtn = moreBtn;
    this.currentIndex = 0;
  }

  init() {
    this.splitedData = this.splitData(4);
    this.clickEvent();
  }

  clickEvent() {
    _.on(this.moreBtn, "click", this.clickHandler.bind(this));
  }
  makeHTML() {
    return this.splitedData[this.currentIndex].reduce(
      (acc, cur) => acc + listHTML(cur.imgurl, cur.text, cur.text2),
      ""
    );
  }

  render() {
    this.container.innerHTML += this.makeHTML();
  }

  clickHandler() {
    this.currentIndex += 1;
    this.render();
  }
  splitData(num) {
    let splitedData = [];
    for (let i = 0; i < this.totalData; i += num) {
      splitedData.push(this.data.slice(i, i + num));
    }
    return splitedData;
  }
}
