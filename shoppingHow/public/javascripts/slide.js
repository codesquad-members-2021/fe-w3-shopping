class Slide {
  constructor(slideList, nextBtn, prevBtn) {
    this.slideList = slideList;
    this.nextBtn = nextBtn;
    this.prevBtn = prevBtn;
    this.rawDatas = {};
    this.counter = 1;
    this.size = 514; //slide 한개의 크기. 다르게 받아볼 예정...
    this.addEvent();
  }
  loadSlideItems() {
    //강의..url넘기는거 수정해보기....
    return fetch("http://localhost:3000/planningEvent.json").then((response) =>
      response.json()
    );
  }
  renderHtml() {
    let slideInnerHTML = "";
    this.loadSlideItems().then((datas) => {
      this.rawDatas = datas.mileageList;
      this.rawDatas.forEach((rawData) => {
        slideInnerHTML += this.createHtml(rawData);
      });
      this.slideList.innerHTML =
        this.copyLastSlide(this.rawDatas) +
        slideInnerHTML +
        this.copyFirstSlide(this.rawDatas);
    });
  }

  createHtml(data) {
    return `<li><img class="slide_item" src=${data.imgurl}></img></li>`;
  }

  copyFirstSlide(datas) {
    return `<li><img class="slide_item" id="firstSlide" src=${datas[0].imgurl}></img></li>`;
  }
  copyLastSlide(datas) {
    return `<li><img class="slide_item" id="firstSlide" src=${datas[2].imgurl}></img></li>`;
  }

  getNode(className) {
    return document.querySelector(className);
  }

  addEvent() {
    this.slideList.style.transform =
      "translateX(" + -this.size * this.counter + "px)";

    this.nextBtn.addEventListener("click", () => {
      if (this.counter >= 4) return;
      this.slideList.style.transition = "transform 0.3s ease-in-out";
      this.counter++;
      this.slideList.style.transform =
        "translateX(" + -this.size * this.counter + "px)";
    });
    this.prevBtn.addEventListener("click", () => {
      if (this.counter <= 0) return;
      this.slideList.style.transition = "transform 0.3s ease-in-out";
      this.counter--;
      this.slideList.style.transform =
        "translateX(" + -this.size * this.counter + "px)";
    });

    this.slideList.addEventListener("transitionend", () => {
      if (this.counter === 4) {
        this.slideList.style.transition = "none";
        this.counter = this.counter - 3;
        this.slideList.style.transform =
          "translateX(" + -this.size * this.counter + "px)";
      }
      if (this.counter === 0) {
        this.slideList.style.transition = "none";
        this.counter = this.counter + 3;
        this.slideList.style.transform =
          "translateX(" + -this.size * this.counter + "px)";
      }
    });
  }
}

window.addEventListener("load", () => {
  const getNode = (className) => document.querySelector(className);
  const slideList = getNode(".slide_list");
  const nextBtn = getNode(".next_button");
  const prevBtn = getNode(".prev_button");

  const carouselSlide = new Slide(slideList, nextBtn, prevBtn);
  carouselSlide.renderHtml();
});
