class BottomCarouselView {
  constructor({ loadDataManager }, { carouselBox, carouselList, bottomImgs, leftButton, rightButton }) {
    this.loadDataManager = loadDataManager;
    this.carouselBox = carouselBox;
    this.carouselList = carouselList;
    this.bottomImgs = bottomImgs;
    this.leftButton = leftButton;
    this.rightButton = rightButton;
    this.bottomElementsArray = [];
    this.init();
  }

  init() {
    this.setBottomImg();
    this.initEvent();
  }

  initEvent() {
    this.carouselBox.addEventListener('click', this.moveHandler.bind(this));
    this.carouselBox.addEventListener('transitionend', this.changeLocationHandler.bind(this));
  }

  setBottomImg() {
    this.loadDataManager.getMallEventDataList().then(data => {
      this.bottomImgs.forEach((imgTag, i) => {
        imgTag.setAttribute('src', data[i].imgurl);
        imgTag.nextElementSibling.innerText = data[i].text;
        imgTag.nextElementSibling.nextElementSibling.innerText = data[i].text2;
        this.bottomElementsArray.push(imgTag.closest('.other__item'));
      })
    })
  }

  moveHandler({ target }) {
    switch (target.className) {
      case this.leftButton.className:
        this.carouselList.classList.add('transition_on', 'left_short_move');
        this.bottomElementsArray.unshift(this.bottomElementsArray.pop());
        break;
      case this.rightButton.className:
        this.carouselList.classList.add('transition_on', 'right_short_move');
        this.bottomElementsArray.push(this.bottomElementsArray.shift());
        break;
    }
  }

  changeLocationHandler() {
    if (this.carouselList.classList.contains('left_short_move')) {
      this.carouselList.classList.remove('transition_on', 'left_short_move');
      this.carouselList.removeChild(this.carouselList.children[9]);
      this.carouselList.insertAdjacentHTML('afterbegin', this.bottomElementsArray[0].outerHTML);
    } else if (this.carouselList.classList.contains('right_short_move')) {
      this.carouselList.classList.remove('transition_on', 'right_short_move');
      this.carouselList.removeChild(this.carouselList.children[0]);
      this.carouselList.insertAdjacentHTML('beforeend', this.bottomElementsArray[9].outerHTML);
    }
  }
}

export default BottomCarouselView;