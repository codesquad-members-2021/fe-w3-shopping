import _ from './util.js';

class LoadView {
  constructor({ loadDataManager }, nodeObj) {
    this.loadDataManager = loadDataManager;
    this.leftTopImg = nodeObj.leftTopImg;
    this.rightTopImgs = nodeObj.rightTopImgs;
    this.middleImgs = nodeObj.middleImgs;
    this.moreDataButton = nodeObj.moreDataButton;
    this.mainCarouselBox = nodeObj.mainCarouselBox;
    this.threeImgBox = nodeObj.threeImgBox;
    this.dottedButtons = nodeObj.dottedButtons;
    this.radioButtons = nodeObj.radioButtons;
    this.threeImgArray = [];
    this.threeImgFirstArray = [];
    this.threeImgSecondArray = [];
    this.threeImgThirdArray = [];
    this.init();
  }

  init() {
    this.setLeftTopImg();
    this.setRightTopImg();
    this.setMiddleNodes();
    this.initEvent();
  }

  initEvent() {
    this.moreDataButton.addEventListener('click', this.loadMoreMiddleNodesHandler.bind(this));
    this.mainCarouselBox.addEventListener('click', this.moveMainCarouselHandler.bind(this));
    this.threeImgBox.addEventListener('transitionend', this.changeLocationMainCarouselHandler.bind(this));
    this.mainCarouselBox.addEventListener('mouseover', this.dottedButtonHandler.bind(this));
  }

  setLeftTopImg() {
    this.loadDataManager.getEventImgUrl().then(data => {
      this.leftTopImg.setAttribute('src', data);
    })
  }

  setRightTopImg() {
    this.loadDataManager.getMileageImgUrlList().then(data => {
      this.rightTopImgs.forEach((imgTag, i) => {
        imgTag.setAttribute('src', data[i]);
        this.threeImgArray.push(imgTag);
      })
      this.setDottedButtonArray(this.threeImgArray);
    })
  }

  setMiddleNodes() {
    this.loadDataManager.getMoreDataList().then(data => {
      this.middleImgs.forEach((imgTag, i) => {
        imgTag.setAttribute('src', data[i].imgurl);
        imgTag.nextElementSibling.innerText = data[i].title;
        imgTag.nextElementSibling.nextElementSibling.innerText = data[i].subtitle;
      })
    })
  }

  loadMoreMiddleNodesHandler() {
    this.loadDataManager.getMoreDataList().then(data => {
      this.moreDataButton.parentElement.insertAdjacentHTML('beforebegin', this.middleTemplate(data));
    })
  }

  setDottedButtonArray(array) {
    const firstArray = [...array];
    firstArray.unshift(firstArray.pop());
    this.threeImgFirstArray = firstArray;
    this.threeImgSecondArray = [...array];
    const thirdArray = [...array];
    thirdArray.push(thirdArray.shift());
    this.threeImgThirdArray = thirdArray;
  }

  moveMainCarouselHandler({ target }) {
    if (target.classList.contains('_main_left_button')) {
      this.threeImgBox.classList.add('transition_on', 'right_move');
      this.threeImgArray.unshift(this.threeImgArray.pop());
      this.checkRadioButton(2, 0, 1);
    } else if (target.classList.contains('_main_right_button')) {
      this.threeImgBox.classList.add('transition_on', 'left_move');
      this.threeImgArray.push(this.threeImgArray.shift());
      this.checkRadioButton(1, 2, 0);
    }
  }

  checkRadioButton(first, second, third) {
    switch (_.$('._radio:checked')) {
      case this.radioButtons[0]:
        this.radioButtons[first].checked = true;
        break;
      case this.radioButtons[1]:
        this.radioButtons[second].checked = true;
        break;
      case this.radioButtons[2]:
        this.radioButtons[third].checked = true;
        break;
    }
  }

  changeLocationMainCarouselHandler() {
    if (this.threeImgBox.classList.contains('left_move')) {
      this.threeImgBox.classList.remove('transition_on', 'left_move');
      this.threeImgBox.removeChild(this.threeImgBox.children[0]);
      this.threeImgBox.insertAdjacentHTML('beforeend', this.threeImgArray[2].outerHTML);
    } else if (this.threeImgBox.classList.contains('right_move')) {
      this.threeImgBox.classList.remove('transition_on', 'right_move');
      this.threeImgBox.removeChild(this.threeImgBox.children[2]);
      this.threeImgBox.insertAdjacentHTML('afterbegin', this.threeImgArray[0].outerHTML);
    }
  }

  dottedButtonHandler({ target }) {
    if (target.className === '_dotted_button') {
      target.previousElementSibling.checked = true;
      let template = '';
      switch (target) {
        case this.dottedButtons[0]:
          template = this.threeImgFirstArray.map(e => e.outerHTML).join('');
          this.threeImgArray = [...this.threeImgFirstArray];
          break;
        case this.dottedButtons[1]:
          template = this.threeImgSecondArray.map(e => e.outerHTML).join('');
          this.threeImgArray = [...this.threeImgSecondArray];
          break;
        case this.dottedButtons[2]:
          template = this.threeImgThirdArray.map(e => e.outerHTML).join('');
          this.threeImgArray = [...this.threeImgThirdArray];
          break;
      }
      this.threeImgBox.innerHTML = template;
    }
  }

  middleTemplate(data) {
    const template = `
        <div class="main__second_line">
          <ul class="main__second_line__list">
     ${Array.from({ length: 5 }, (_, i) => {
      return `<li class="main__second_line__item"><a href="#">
                <img class="_middle_image" src="${data[i].imgurl}" alt="">
                <span class="main__second_line__item--title">${data[i].title}</span>
                <span class="main__second_line__item--sub_title">${data[i].subtitle}</span>
                <span class="main__second_line__item--badge">테마</span>
              </a></li>` }).join('')}
          </ul>
       </div>`
    return template;
  }
}

export default LoadView;