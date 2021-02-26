export default class TopCarouselUI {
  constructor() {
    this.$carousel = document.querySelector(".item__carousel-wrap");
    this.$carouselContents = document.querySelectorAll(".carousel-content");
    this.$prevBtn = document.querySelector("#paging-btn-prev");
    this.$nextBtn = document.querySelector("#paging-btn-next");
    this.counter = 1;
    this.size = this.$carouselContents[0].clientWidth;
    this.onEvent();
  }
  moveToOriginContent() {
    switch (this.$carouselContents[this.counter].id) {
      case "lastClone":
        this.$carousel.style.transition = "none";
        this.counter = this.$carouselContents.length - 2;
        this.$carousel.style.transform =
          "translateX(" + -this.size * this.counter + "px)";
        break;
      case "firstClone":
        this.$carousel.style.transition = "none";
        this.counter = this.$carouselContents.length - this.counter;
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
    if (this.counter >= this.$carouselContents.length - 1) return;
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
}
