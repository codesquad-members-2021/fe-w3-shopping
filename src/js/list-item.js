import { _ } from './util.js';

class IListItem {
  constructor(json) {
    this.$target;
    this.json = json;
  }

  element() { throw new Error('Abstract method!'); }
  template() { throw new Error('Abstract method!'); }
}

export class EvtCardListItem extends IListItem {
  element() {
    this.$target = this.$target ?? _.genEl('LI', { classNames: ['evt-card-list__item'], template: this.template()});
    return this.$target;
  }

  template() {
    return `<a href="${this.json.linkurl}" class="item__link">
              <div class="item__link__thumb"><img src="${this.json.imgurl}" alt="Image not found"/></div>
              <div class="item__link__title">${this.json.text}</div>
              <div class="item__link__desc">${this.json.text2}</div>
              <div class="item__link__theme" data-theme="${this.json.theme}"></div>
            </a>`;
  }
}

export class HotdealEvtCardListItem extends IListItem {
  element() {
    this.$target = this.$target ?? _.genEl('LI', { classNames: ['evt-card-list__item'], template: this.template()});
    return this.$target;
  }

  template() {
    return `<a href="${this.json.linkUrl}" class="item__link">
              <div class="item__link__thumb"><img src="${this.json.imageUrl}" alt="Image not found"/></div>
              <div class="item__link__title">${this.json.title}</div>
              <div class="item__link__price-info">
                <div class="price-info__price">${this.json.minPrice}원</div>
                `
  
              + (this.json.discount ? 
                  `<div class="price-info__discount">${this.json.discount}%</div>
                  <div class="price-info__origin-price">${this.json.maxPrice}</div></div>` :
                  `<div class="price-info__discount hotdeal">핫딜가</div></div>`)
                  
              + `</a>`;
  }
}