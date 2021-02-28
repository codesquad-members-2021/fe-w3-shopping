/* --------------------------------------------------------------------- */
/* ------▶︎▶︎▶︎ smallCarosel 클래스: 페이지 우측 상단의 작은 캐러셀을 만든다. ◀︎◀︎◀︎------*/
/* --------------------------------------------------------------------- */

/*
1. 트랜스레이트X로 클릭 이벤트를 걸어주어 선택된 방향으로 움직이는 것처럼 보이게하기.
2. 다시 트랜스레이트X를 취소한 후 panel의 순서가 바뀌도록 한다.
- [x] 양쪽 화살표 아이콘 추가하기
- [x] 슬라이드 트랜지션 이벤트 넣기
- [x] 오른쪽 화살표 클릭 시 순서가 바뀌는 기능 구현
- [x] 왼쪽 화살표 클릭 시 순서서가 바뀌는 기능 구현
- [ ] 이미지 하단 언더바에 마우스에 호버링 이벤트 넣기 : 호버 시 이미지 바꿈. (로직 설계 필요 - data-Index 사용할 방법 생각해보기)
*/

export default class smallCarousel {
    constructor(_, reference){
        this._ = _;
        this.ref = reference;
        this.prevButton = reference.prevButton;
        this.nextButton = reference.nextButton;
        this.slide = reference.slide;
    }

    addEvent(panelNumber){
        this.prevButton.addEventListener('click', this.translateSlide.bind(this, 1, panelNumber));
        this.nextButton.addEventListener('click', this.translateSlide.bind(this, -1, panelNumber));
    }

    translateSlide(direction, panelNumber){
        const selectedBtn = (direction === 1) ? 'prev' : 'next';
        this.slide.style.transitionDuration = "300ms";
        this.slide.style.transform = `translateX(${direction * (100 / panelNumber)}%)`;
        this.slide.ontransitionend = () => this.reorganizeEl(selectedBtn);
    }

    reorganizeEl(selectedBtn) {
        const slide = this.slide;
        this._.removeTransform(slide, 'style');
        (selectedBtn === 'prev') ?
        slide.insertBefore(slide.lastElementChild, slide.firstElementChild):
        slide.appendChild(slide.firstElementChild);
    }

}