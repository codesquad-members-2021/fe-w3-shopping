import { makeItemList, ul } from './util/htmlTemplate.js';

class HotDealSlide {
  constructor(data, { container, slideList }) {
    this.data = data.slice(0, 10); //임의로 데이터를 10개만 잘랐다.
    this.container = container;
  }
  init() {
    this.render();
  }
  getSlideHTML() {
    const slideItemsHTML = this.data.reduce((acc, cur) => acc + makeItemList(cur), '');
    const slideHTML = ul({ value: slideItemsHTML, classes: ['hot-deal-list'] });
    return slideHTML;
  }
  render() {
    const slideHTML = this.getSlideHTML();
    this.container.innerHTML = slideHTML;
  }
}

export default HotDealSlide;
