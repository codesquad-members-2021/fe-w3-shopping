import _ from './util.js';

class LoadView {
  constructor({ loadDataManager }, nodeObj) {
    this.loadDataManager = loadDataManager;
    this.leftTopImg = nodeObj.leftTopImg;
    this.rightTopImgs = nodeObj.rightTopImgs;
    this.middleImgs = nodeObj.middleImgs;
    this.bottomImgs = nodeObj.bottomImgs;
    this.moreDataButton = nodeObj.moreDataButton;
    this.mainLeftButton = nodeObj.mainLeftButton;
    this.mainRightButton = nodeObj.mainRightButton;
    this.threeImgBox = nodeObj.threeImgBox;
    this.threeImgArray = [];
    this.init();
  }

  init() {
    this.setLeftTopImg();
    this.setRightTopImg();
    this.setMiddleNodes();
    this.setBottomImg();
    this.initEvent();
  }

  initEvent() {
    this.moreDataButton.addEventListener('click', this.loadMoreMiddleNodes.bind(this));
    this.mainLeftButton.addEventListener('click', () => {

      this.threeImgBox.classList.add('transition_on', 'left_move');
      this.threeImgArray.push(this.threeImgArray.shift());
    })
    this.threeImgBox.addEventListener('transitionend', () => {
      this.threeImgBox.innerHTML = this.threeImgArray.map(e => e.outerHTML).join('');
      this.threeImgBox.classList.remove('transition_on', 'left_move');

    })
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

  loadMoreMiddleNodes() {
    this.loadDataManager.getMoreDataList().then(data => {
      this.moreDataButton.parentElement.insertAdjacentHTML('beforebegin', this.middleTemplate(data));
    })
  }

  setBottomImg() {
    this.loadDataManager.getMallEventDataList().then(data => {
      this.bottomImgs.forEach((imgTag, i) => {
        imgTag.setAttribute('src', data[i].imgurl);
        imgTag.nextElementSibling.innerText = data[i].text;
        imgTag.nextElementSibling.nextElementSibling.innerText = data[i].text2;
      })
    })
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