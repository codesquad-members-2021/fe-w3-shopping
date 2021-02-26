import _ from "./utils.js";

export default class Morebtn {
  constructor(data, moreBtn, container) {
    this.data = data;
    this.totalData = data.length;
    this.container = container;
    this.moreBtn = moreBtn;
  }

  init() {
    this.clickEvent();
  }

  clickEvent() {
    _.on(this.moreBtn, "click", this.clickHandler.bind(this));
  }

  render() {}

  clickHandler() {
    console.log(this.data[0]);
  }
}
