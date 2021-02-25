export default class TopCarouselUI {
  constructor() {
    this.$carouselContentNode = document.querySelector(".carousel-content");
    this.$preBtn = document.querySelector("#paging-btn-prev");
    this.$nextBtn = document.querySelector("#paging-btn-prev");
    this.init();
  }

  movePanel() {
    console.log(this.$carouselContentNode);
    console.log(this.$carouselContentNode.firstElementChild);
    //이벤트 타겟의 id가 preBtn이면?
    //
    //이미지를 왼쪽으로 옮긴다 어떻게? transition 0 -> 520으로 바꾼다
    //translate3d(0px, 0, 0); ->  transform: translate3d(-520px, 0, 0);
    // 천천히 가게한한다.
  }

  onEvent() {
    this.$preBtn.addEventListener("click", this.movePanel.bind(this));
  }
  init() {
    this.onEvent();
  }
}
