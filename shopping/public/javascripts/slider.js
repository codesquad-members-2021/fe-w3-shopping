import _ from "./utils.js";

export default class Slider {
  constructor(banner) {
    this.bannerBtns = _.$(".banner__right__btns", banner);
    this.inner_paging = _.$(".inner_paging", banner);
    this.$slider = _.$(".banner__slider", banner);
    this.$panel = _.$A(".panel", this.$slider);
  }

  init() {
    this.clickEvent();
  }

  clickEvent() {
    _.on(this.bannerBtns, "click", ({ target }) => {
      switch (target.className) {
        case "icon_slide prev":
          this.transitionendEvent();
          this.$slider.style.transform = "translate3d(484px, 0px, 0px)";
          this.$slider.style.transitionDuration = "0ms";
          break;
        case "icon_slide next":
          this.$slider.style.transform = "translate3d(-484px, 0px, 0px)";
          break;
      }
    });
  }

  transitionendEvent() {
    _.on(this.$slider, "transitionend", ({ target }) => {
      let last = target.lastElementChild
      target.insertBefore(last, target.childNodes[0]);
      //this.$slider.insertBefore(
      //  target.lastElementChild,
      //  this.$slider.childNodes[0]
      //);
      this.$slider.style.transform = "translate3d(0px, 0px, 0px)";
      this.$slider.style.transitionDuration = "300ms";
    });
  }

  hoverEvent() {
    _.on(this.inner_paging, "mouseover", ({ target }) => {
      console.log(target.innerText);
    });
  }
}
