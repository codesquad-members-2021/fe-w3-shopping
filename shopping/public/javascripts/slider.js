import _ from "./utils.js";

export default class Slider {
  constructor(banner) {
    this.bannerBtns = _.$(".banner__right__btns", banner);
    this.inner_paging = _.$(".inner_paging", banner);
    this.$slider = _.$(".banner__slider", banner);
    this.$panel = _.$A(".panel", this.$slider);
  }

  init() {
    this.transitionendEvent();
    this.clickEvent();
  }

  clickEvent() {
    _.on(this.bannerBtns, "click", ({ target }) => {
      switch (target.className) {
        case "icon_slide prev":
          this.$slider.removeAttribute("style");

          this.$slider.style.transform = "translate3d(-484px, 0px, 0px)";
          break;
        case "icon_slide next":
          this.$slider.removeAttribute("style");
          this.$slider.style.transform = "translate3d(484px, 0px, 0px)";
          break;
      }
    });
  }

  transitionendEvent() {
    _.on(this.$slider, "transitionend", ({ target }) => {
      switch (target.style.transform) {
        case "translate3d(484px, 0px, 0px)":
          target.insertBefore(target.lastElementChild, target.firstChild);
          break;
        case "translate3d(-484px, 0px, 0px)":
          target.lastElementChild.insertAdjacentElement(
            "afterend",
            target.firstElementChild
          );
      }
      this.$slider.style.transition = "none";
      this.$slider.style.transform = "translate3d(0px, 0px, 0px)";
    });
  }

  hoverEvent() {
    _.on(this.inner_paging, "mouseover", ({ target }) => {
      console.log(target.innerText);
    });
  }
}
