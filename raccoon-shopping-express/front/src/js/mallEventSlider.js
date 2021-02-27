class MallEventSlider {
  constructor(target) {
    this.target = target;
    this.slide = document.querySelector('#mallEventSlide');
  }
  addEvent() {
    this.target.forEach((el) => el.addEventListener('click', this.mallEventSlider.bind(this)));
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
  clickPrev() {
    const listItem = this.slide.querySelectorAll('.list--item');
    this.slide.classList.replace('slide', 'slide--click--prev');
    setTimeout(() => {
      const firstLast = listItem[0].lastElementChild.cloneNode(true);
      const secondLast = listItem[1].lastElementChild.cloneNode(true);
      const thirdLast = listItem[2].lastElementChild.cloneNode(true);
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
    this.slide.classList.replace('slide', 'slide--click--next');
    setTimeout(() => {
      const firstFirst = listItem[0].firstElementChild.cloneNode(true);
      const secondFirst = listItem[1].firstElementChild.cloneNode(true);
      const thirdFirst = listItem[2].firstElementChild.cloneNode(true);
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

export { MallEventSlider };
