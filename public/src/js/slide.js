import { makeSlideItem } from './htmlTemplate.js';

class SlideModel {
  constructor() {
    this.data = [
      'http://shop3.daumcdn.net/shophow/sib/0_210219175556_BtjOWRoiPbsVXvlYusgFvjboDPXRIBQD',
      'https://shop3.daumcdn.net/shophow/sib/0_210219175609_PZjbWVyRtwcxTlShApbdyOenwLaYCOhs',
      'http://shop1.daumcdn.net/shophow/sib/0_210219175602_vRyGDQxWDethcelhYcMmXKXpgLqlAIAj'
    ];
  }
  getData() {
    return this.data;
  }
  setPrevData() {
    this.data.push(this.data.shift());
  }
  setNextData() {
    this.data.unshift(this.data.pop());
  }
}

class Slide {
  constructor(container) {
    this.container = container;
  }
  onEvent() {
    this.container.addEventListener('click', this.handleClick.bind(this));
  }
  handleClick({ target }) {
    if (this.isPrevBtn(target)) {
      //css transform +515px  transform: translate3d(+515px, 0, 0);
      //setPrevData
    } else if (this.isNextBtn(target)) {
      //css transform +515px  transform: translate3d(-515px, 0, 0);
      //setPrevData
    }
  }
  isPrevBtn(target) {
    const { classList } = target;
    return classList.contains('btn-prev') || classList.contains('fa-chevron-left');
  }
  isNextBtn(target) {
    const { classList } = target;
    return classList.contains('btn-next') || classList.contains('fa-chevron-right');
  }
  getSlideHTML() {
    const imgUrls = SlideModel.getData();
    const slideHTML = imgUrls.reduce((acc, cur) => acc + makeSlideItem(cur), '');
    return slideHTML;
  }
  render() {
    const slideHTML = this.getSlideHTML();
    //리스트.innerHTML = slideHTML
  }
}
