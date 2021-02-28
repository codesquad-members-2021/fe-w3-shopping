import _ from "./util.js";
export default class TopCarouselUI {
  constructor() {
    this.$carousel = _.$(".item__carousel-wrap");
    this.$carouselBox = _.$(".item__carousel-box ");
    this.$prevBtn = _.$("#paging-btn-prev");
    this.$nextBtn = _.$("#paging-btn-next");
    this.counter = 1;
    this.size = this.$carouselBox.clientWidth;
    this.init();
  }

  requestImg() {
    fetch("http://localhost:3000/image")
      .then(response => response.json())
      .then(json => {
        this.parseJson(json["topCarousel"]);
        this.cloneContent();
      });
  }

  parseJson(data) {
    const $carousel = _.$(".item__carousel-wrap");
    for (const value of data) {
      let template = `<div class="carousel-content">
      <a href="#"" >
        <img
          src=${JSON.stringify(value["imgurl"])}
      /></a>
    </div>`;

      $carousel.insertAdjacentHTML("beforeend", template);
    }
  }

  cloneContent() {
    const clonedFirstChild = this.$carousel.firstElementChild.cloneNode(true);
    clonedFirstChild.id = "firstClone";
    const clonedLastChild = this.$carousel.lastElementChild.cloneNode(true);
    clonedLastChild.id = "lastClone";
    this.$carousel.insertBefore(clonedFirstChild, null);
    this.$carousel.insertBefore(
      clonedLastChild,
      this.$carousel.firstElementChild
    );
  }

  moveToOriginContent() {
    const $carouselContents = _.$All(".carousel-content");
    console.log(22);
    switch ($carouselContents[this.counter].id) {
      case "lastClone":
        this.$carousel.style.transition = "none";
        this.counter = $carouselContents.length - 2;
        this.$carousel.style.transform =
          "translateX(" + -this.size * this.counter + "px)";
        break;
      case "firstClone":
        this.$carousel.style.transition = "none";
        this.counter = $carouselContents.length - this.counter;
        this.$carousel.style.transform =
          "translateX(" + -this.size * this.counter + "px)";
        break;
    }
  }

  movePrevious() {
    if (this.counter <= 0) return;
    this.$carousel.style.transition = "transform 0.3s ease-in-out";
    this.counter--;
    this.$carousel.style.transform =
      "translateX(" + -this.size * this.counter + "px)";
    console.log(this.$carousel.style.transform);
  }

  moveNext() {
    const $carouselContents = _.$All(".carousel-content");
    if (this.counter >= $carouselContents.length - 1) return;
    this.$carousel.style.transition = "transform 0.3s ease-in-out";
    this.counter++;
    this.$carousel.style.transform =
      "translateX(" + -this.size * this.counter + "px)";
    console.log(this.$carousel.style.transform);
  }
  onEvent() {
    this.$carousel.addEventListener(
      "transitionend",
      this.moveToOriginContent.bind(this)
    );
    this.$nextBtn.addEventListener("click", this.moveNext.bind(this));
    this.$prevBtn.addEventListener("click", this.movePrevious.bind(this));
  }

  init() {
    this.requestImg();
    this.onEvent();
  }
}
