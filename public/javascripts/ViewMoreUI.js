import _ from "./util.js";
export default class ViewMore {
  constructor() {
    this.$viewMoreBar = _.$(".view-more");
    this.$topSectionContainer = _.$(".section-top__container");
    this.currentLow = 1;
    this.imageIndex = 0;
    this.init();
  }

  requestServer(server, req) {
    fetch(`${server}/${req}`)
      .then(response => response.json())
      .then(json => {
        console.log(json);
        this.drawViewMoreImage(json);
      });
  }
  updateGridLow() {
    this.$topSectionContainer.style.gridTemplateRows = `repeat(${this.currentLow}, 340px)`;
    this.currentLow++;
  }

  drawViewMoreImage(data) {
    if (this.imageIndex >= data.length) return;

    this.updateGridLow();
    let template = "";

    for (let i = this.imageIndex; i < this.imageIndex + 5; i++) {
      let value = data[i];
      template += `<div class="section-top__item" id = "item-${i}">
      <div class="item__img-box-wrap">
        <img
          class="img-box"
          src=${JSON.stringify(value["imgurl"])}/>
        <strong class="img-title">${JSON.stringify(value["text"])}</strong>
        <span class="img-text">${JSON.stringify(value["text2"])}</span>
        <span class="img-icon">테마</span>
      </div>
    </div>`;
    }
    this.$topSectionContainer.insertAdjacentHTML("beforeend", template);
    this.imageIndex += 5;
  }

  updateViewMoreImage() {
    this.requestServer("http://localhost:3000", "viewmore");
  }

  onEvent() {
    this.$viewMoreBar.addEventListener(
      "click",
      this.updateViewMoreImage.bind(this)
    );
  }
  init() {
    this.requestServer("http://localhost:3000", "viewmore");
    this.onEvent();
  }
}
