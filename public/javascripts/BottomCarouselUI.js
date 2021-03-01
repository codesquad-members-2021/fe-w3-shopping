import _ from "./util.js";
export default class BottomCarouselUI {
  constructor() {
    this.$carousel = _.$(".bottom__carousel_wrap"); //컈러셀 전체
    this.$carouselBox = _.$(".section-bottom"); //히든박스
    this.$prevBtn = _.$("#b_paging-btn-prev");
    this.$nextBtn = _.$("#b_paging-btn-next");
    this.counter = 1;
    this.size = 254;
    this.init();
  }

  requestServer(server, req) {
    fetch(`${server}/${req}`)
      .then(response => response.json())
      .then(json => {
        this.drawCarouselImage(json, 10);
        this.cloneFirstLast();
      });
  }

  drawCarouselImage(data) {
    const jsonData = data;
    const result = jsonData.reduce((acc, value, idx) => {
      return (
        acc +
        `<div class="bottom__carousel_item" id="b-item-${idx}">
        <img
          class="img-box"
          src=${JSON.stringify(value["imgurl"]).replace(/\"/gi, "")}
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
    this.$carousel.insertAdjacentHTML("beforeend", result);
  }
  cloneFirstRemainder() {
    for (let i = 1; i < 4; i++) {
      let copiedOne = _.$(`#b-item-${i}`).cloneNode(true);
      this.$carousel.insertBefore(copiedOne, null);
    }
  }

  cloneFirstLast() {
    console.log(this.$carousel.lastElementChild.previousElementSibling);

    const clonedFirst = this.$carousel.firstElementChild.cloneNode(true);
    clonedFirst.id = "b-firstClone";

    // const clonedFirstNext = this.$carousel.firstElementChild.nextElementSibling.cloneNode(
    //   true
    // );
    // clonedFirstNext.id = "b-firstNextClone";

    const clonedLast = this.$carousel.lastElementChild.cloneNode(true);
    clonedLast.id = "b-lastClone";
    // const clonedLastPrev = this.$carousel.lastElementChild.previousElementSibling.cloneNode(
    //   true
    // );
    // clonedLastPrev.id = "b-lastPrevClone";

    this.$carousel.insertBefore(clonedFirst, null);

    this.$carousel.insertBefore(clonedLast, this.$carousel.firstElementChild);
    // this.$carousel.insertAdjacentElement("afterbegin", clonedLastPrev); //id 8 image

    this.cloneFirstRemainder();
  }

  moveToOriginContent() {
    const $carouselContents = _.$All(".bottom__carousel_item");

    switch ($carouselContents[this.counter].id) {
      case "b-lastClone":
        this.$carousel.style.transition = "none";
        this.counter = $carouselContents.length - 5;
        this.$carousel.style.transform =
          "translateX(" + -this.size * this.counter + "px)";
        break;
      case "b-firstClone":
        this.$carousel.style.transition = "none";
        this.counter = $carouselContents.length - this.counter;
        this.$carousel.style.transform =
          "translateX(" + -this.size * this.counter + "px)";
        break;
    }
  }

  //   runTwoSecsTimer() {
  //     setTimeout(this.moveTwoImage, 2000);
  //   }

  movePrevious() {
    if (this.counter <= 0) return;
    this.$carousel.style.transition = "transform 0.3s ease-in-out";
    this.counter--;
    this.$carousel.style.transform =
      "translateX(" + -this.size * this.counter + "px)";
  }

  moveNext() {
    const $carouselContents = _.$All(".carousel-content");

    if (this.counter >= $carouselContents.length - 1) return;
    this.$carousel.style.transition = "transform 0.3s ease-in-out";
    this.counter++;
    this.$carousel.style.transform =
      "translateX(" + -this.size * this.counter + "px)";
  }

  //   movePreviousTwoImage() {
  //     if (this.counter <= 0) return;
  //     this.$carousel.style.transition = "transform 0.3s ease-in-out";
  //     this.counter -= 2;
  //     this.$carousel.style.transform =
  //       "translateX(" + -this.size * this.counter + "px)";
  //   }
  onEvent() {
    this.$nextBtn.addEventListener("click", this.moveNext.bind(this));
    this.$prevBtn.addEventListener("click", this.movePrevious.bind(this));
  }
  init() {
    this.$carousel.addEventListener(
      "transitionend",
      this.moveToOriginContent.bind(this)
    );
    this.requestServer("http://localhost:3000", "bottomCarousel");
    this.onEvent();
  }
}
