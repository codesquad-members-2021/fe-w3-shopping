import { makeEventItem } from './htmlTemplate.js';

class More {
  constructor(data, { container }) {
    this.data = data;
    this.container = container;
  }
  init() {
    this.render();
  }
  getMoreItemHTML() {
    const moreItemHTML = this.data.reduce((acc, cur) => acc + makeEventItem(cur), '');
    return moreItemHTML;
  }
  render() {
    const moreItemHTML = this.getMoreItemHTML();
    this.container.innerHTML = moreItemHTML;
  }
}

export default More;
