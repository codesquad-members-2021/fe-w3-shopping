import cloneContent from "./cloneContent.js";
import TopCarouselUI from "./TopCarouselUI.js";
export default class API {
  constructor() {
    this.requestImg();
  }
  requestImg() {
    fetch("http://localhost:3000/image")
      .then(response => response.json())
      .then(json => {
        this.parseJson(json["mileageList"]);
        cloneContent();
        const topCarouselUI = new TopCarouselUI();
        q;
      });
  }

  parseJson(data) {
    const $carousel = document.querySelector(".item__carousel-wrap");
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
}
