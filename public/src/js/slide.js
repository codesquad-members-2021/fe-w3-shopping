import { makeSlideItem } from './htmlTemplate.js';

class SlideModel {
  constructor() {
    this.data = [
      'http://shop3.daumcdn.net/shophow/sib/0_210219175556_BtjOWRoiPbsVXvlYusgFvjboDPXRIBQD',
      'https://shop3.daumcdn.net/shophow/sib/0_210219175609_PZjbWVyRtwcxTlShApbdyOenwLaYCOhs',
      'http://shop1.daumcdn.net/shophow/sib/0_210219175602_vRyGDQxWDethcelhYcMmXKXpgLqlAIAj'
    ];
  }
  setData(data) {
    this.data = data;
  }
  getData() {
    return this.data;
  }
  setPrevData() {
    this.data.unshift(this.data.pop());
  }
  setNextData() {
    this.data.push(this.data.shift());
  }
}

class Slide {
  constructor({ container, itemList }) {
    this.container = container;
    this.itemList = itemList;
    this.slideModel = new SlideModel();
  }
  init() {
    this.onEvent();
  }
  onEvent() {
    this.container.addEventListener('click', this.handleClick.bind(this));
  }
  handleClick({ target }) {
    if (this.isPrevBtn(target)) {
      this.slidePrev();
    } else if (this.isNextBtn(target)) {
      this.slideNext();
    }
    setTimeout(() => {
      this.initSlide();
    }, 300);
  }
  isPrevBtn(target) {
    const { classList } = target;
    return classList.contains('btn-prev') || classList.contains('fa-chevron-left');
  }
  isNextBtn(target) {
    const { classList } = target;
    return classList.contains('btn-next') || classList.contains('fa-chevron-right');
  }
  slidePrev() {
    this.itemList.style.transition = 'all 0.3s';
    this.itemList.style.transform = 'translate3d(+515px, 0, 0)';
    this.slideModel.setPrevData();
  }
  slideNext() {
    this.itemList.style.transition = 'all 0.3s';
    this.itemList.style.transform = 'translate3d(-515px, 0, 0)';
    this.slideModel.setNextData();
  }
  getSlideHTML() {
    const imgUrls = this.slideModel.getData();
    const slideHTML = imgUrls.reduce((acc, cur) => acc + makeSlideItem(cur), '');
    return slideHTML;
  }
  render() {
    const slideHTML = this.getSlideHTML();
    this.itemList.innerHTML = slideHTML;
  }
  initSlide() {
    this.itemList.style.transition = '';
    this.render();
    this.itemList.style.transform = 'translate3d(0, 0, 0)';
  }
}

export default Slide;
