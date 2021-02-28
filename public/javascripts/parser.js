export default class Parser {
  constructor() {}

  drawCarouselImage(data) {
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

  drawMoreViewImage(data) {
    // 방법 구상
    // 0. 더보기 버튼 클릭시!! 호출된다.(fetch를 api.js가 아니라 여기서 하게 해야할듯 )
    // 1. 데이터 요청시 5개씩 응답을 받도록 한다.
    // 2. 응답 받은 데이터로 템플릿 작성한다.
    // 3. 작성된 순서대로 id="items-carousel"인 엘리먼트 뒤에 계속 insertAdjace해준다.
    const $carouselItems = document.querySelector("#items-carousel");
    for (const value of data) {
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

      $carouselItems.insertAdjacentElement("afterend", template); //엘리먼트가 아니래

      //console.log(template);
    }
  }
}
