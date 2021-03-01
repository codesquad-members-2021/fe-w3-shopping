export default class MallEventSlider {
  constructor(target) {
    this.target = target;
    this.slide = document.querySelector('#mallEventSlide');
    this.longClickTimer = -1;
    this.prevTimer = -1;
    this.nextTimer = -1;
  }
  addEvent() {
    this.target.forEach((el) => el.addEventListener('mousedown', this.longClickSlide.bind(this)));
    this.target.forEach((el) => el.addEventListener('mouseup', this.clearLongClickSlide.bind(this)));
  }

  mallEventSlider(e) {
    const prev = () => e.currentTarget.classList.contains('button--prev');
    const next = () => e.currentTarget.classList.contains('button--next');

    if (prev()) {
      this.clickPrev();
    }
    if (next()) {
      this.clickNext();
    }
  }

  mallEvent2Sliders(e) {
    const prev = () => e.target.classList.contains('button--prev') || e.target.parentNode.classList.contains('button--prev');
    const next = () => e.target.classList.contains('button--next') || e.target.parentNode.classList.contains('button--next');

    if (prev()) {
      this.prevTimer = setInterval(() => {
        this.clickPrev();
      }, 700);
      return;
    }

    if (next()) {
      this.nextTimer = setInterval(() => {
        this.clickNext();
      }, 700);
      return;
    }
  }

  /* 
  1. 버튼을 누른다
  2. 타이머가 동작한다.
  3-1. 버튼을 때었다 (2초 이전)
    - 타이머를 클리어한다.
  3-2. 버튼을 때었다 (2초 이후)
    - 2개 넘어가기 액션을 한다.
  */
  longClickSlide(e) {
    this.mallEventSlider(e);
    this.longClickTimer = setTimeout(() => {
      this.mallEvent2Sliders(e);
    }, 700);
  }
  clearLongClickSlide() {
    clearTimeout(this.longClickTimer);
    clearTimeout(this.prevTimer);
    clearTimeout(this.nextTimer);
  }

  clickPrev() {
    const listItem = this.slide.querySelectorAll('.list--item');
    const firstLast = listItem[0].lastElementChild.cloneNode(true);
    const secondLast = listItem[1].lastElementChild.cloneNode(true);
    const thirdLast = listItem[2].lastElementChild.cloneNode(true);
    this.slide.classList.replace('slide', 'slide--click--prev');
    setTimeout(() => {
      listItem[1].appendChild(firstLast);
      listItem[0].removeChild(listItem[0].lastElementChild);
      listItem[1].insertBefore(listItem[1].lastElementChild, listItem[1].firstElementChild);
      listItem[2].appendChild(secondLast);
      listItem[1].removeChild(listItem[1].lastElementChild);
      listItem[2].insertBefore(listItem[2].lastElementChild, listItem[2].firstElementChild);
      listItem[0].appendChild(thirdLast);
      listItem[2].removeChild(listItem[2].lastElementChild);
      listItem[0].insertBefore(listItem[0].lastElementChild, listItem[0].firstElementChild);
      this.slide.classList.replace('slide--click--prev', 'slide');
    }, 300);
  }
  clickNext() {
    const listItem = this.slide.querySelectorAll('.list--item');
    const firstFirst = listItem[0].firstElementChild.cloneNode(true);
    const secondFirst = listItem[1].firstElementChild.cloneNode(true);
    const thirdFirst = listItem[2].firstElementChild.cloneNode(true);
    this.slide.classList.replace('slide', 'slide--click--next');
    setTimeout(() => {
      listItem[2].appendChild(firstFirst);
      listItem[0].removeChild(listItem[0].firstElementChild);
      listItem[0].appendChild(secondFirst);
      listItem[1].removeChild(listItem[1].firstElementChild);
      listItem[1].appendChild(thirdFirst);
      listItem[2].removeChild(listItem[2].firstElementChild);
      this.slide.classList.replace('slide--click--next', 'slide');
    }, 300);
  }
}
