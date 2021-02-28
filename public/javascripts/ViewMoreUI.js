import _ from "./util.js";
export default class ViewMore {
  constructor() {
    this.requestServer("http://localhost:3000", "viewmore");
    this.$viewMoreBar = _.$(".view-more");
    this.$topSectionContainer = _.$(".section-top__container");
    this.onEvent();
    this.currentLow = 1;
    this.imageIndex = 0;
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
    this.$topSectionContainer.style.gridTemplateColumns = `repeat(${this.currentLow}, 340px)`;
    this.currentLow++;
  }

  drawViewMoreImage(data) {
    if (this.imageIndex >= data.length) return;
    //라인 카운트를 한다. 가져온데이터에서 현재 번호부터 5개만 이미지로 만든다
    // 방법 구상
    // 0. 더보기 버튼 클릭시!! 호출된다.(fetch를 api.js가 아니라 여기서 하게 해야할듯 )
    // 1. 데이터 요청시 5개씩 응답을 받도록 한다.
    // 2. 응답 받은 데이터로 템플릿 작성한다.
    // 3. 작성된 순서대로 id="items-carousel"인 엘리먼트 뒤에 계속 insertAdjace해준다.
    const $carouselItems = _.$("#items-00");
    this.updateGridLow();

    for (let i = this.imageIndex; i < this.imageIndex + 5; i++) {
      let value = data[i];
      let template = `<div class="section-top__item">
      <div class="item__img-box-wrap">
        <img
          class="img-box"
          src=${JSON.stringify(value["imgurl"])}/>
        <strong class="img-title">${JSON.stringify(value["text"])}</strong>
        <span class="img-text">${JSON.stringify(value["text2"])}</span>
        <span class="img-icon">테마</span>
      </div>
    </div>`;

      $carouselItems.insertAdjacentHTML("afterend", template);

      console.log(template);
    }

    this.imageIndex += 5;
    console.log(this.imageIndex);
  }
  updateViewMoreImage() {
    console.log(333);
    this.requestServer("http://localhost:3000", "viewmore");
  }
  onEvent() {
    this.$viewMoreBar.addEventListener(
      "click",
      this.updateViewMoreImage.bind(this)
    );
    console.log(this.$topSectionContainer.style.gridTemplateColumns);
  }
  init() {}
}
