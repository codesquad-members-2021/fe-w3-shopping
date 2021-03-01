import _ from "./util.js";
export default class BottomCarouselUI {
  constructor() {
    this.$carousel = _.$(".bottom__carousel_wrap"); //컈러셀 전체
    this.$carouselBox = _.$(".section-bottom"); //히든박스
    this.$prevBtn = _.$("#b_paging-btn-prev");
    this.$nextBtn = _.$("#b_paging-btn-next");
    this.counter = 1;
    this.size = this.$carouselBox.clientWidth;
    this.init();
  }

  requestServer(server, req) {
    fetch(`${server}/${req}`)
      .then(response => response.json())
      .then(json => {
        console.log(json);
        this.drawCarouselImage(json, 10);
        //this.cloneContent();
      });
  }

  drawCarouselImage(data) {
    const $carousel = _.$(".bottom__carousel_wrap");
    const jsonData = data;
    const result = jsonData.reduce((acc, value) => {
      return (
        acc +
        `<div class="bottom__carousel_item">
        <img
          class="img-box"
          src=${JSON.stringify(value["imgurl"]).replace(/\"/gi, "")}
          alt=""
        />
        <div class="text-wrap">
          <strong class="img-title">${JSON.stringify(value["text"]).replace(
            /\"/gi,
            ""
          )}</strong>
          <span class="img-text">${JSON.stringify(value["text2"]).replace(
            /\"/gi,
            ""
          )}</span>
          <span class="img-icon"></span>
        </div>
      </div>
      `
      );
    }, "");
    console.log(result);

    $carousel.insertAdjacentHTML("beforeend", result);
  }
  cloneContent() {}
  moveToOriginContent() {}
  movePrevious() {}
  moveNext() {}
  moveTwoImage() {}
  onEvent() {
    this.$nextBtn.addEventListener("click", this.moveNext.bind(this));
    this.$prevBtn.addEventListener("click", this.movePrevious.bind(this));
  }
  init() {
    // this.$carousel.addEventListener(
    //   "transitionend",
    //   this.moveToOriginContent.bind(this)
    // );
    this.requestServer("http://localhost:3000", "bottomCarousel");
    //this.onEvent();
  }
}
