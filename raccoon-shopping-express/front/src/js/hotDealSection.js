export default class HotDealSection {
  constructor(data) {
    this.data = data;
    this.wrapper = document.querySelector('#hot-deal__wrapper');
    this.title = `품절주의! 역대급 핫딜`;
    this.target = document.querySelector('.more-item__button');
    this.dataLength = 0;
  }

  draw() {
    this.getHotDealLists();
  }

  getHotDealLists() {
    return this.getHotDealTitle();
  }

  getHotDealTitle() {
    return this.wrapper.querySelector('.section--hot-deal').insertAdjacentHTML(
      'afterbegin',
      `
      <div class="title__hot-deal"><h3 class="title--txt">${this.title}</h3></div>
      <div class="contents--item">
        ${this.getHotDealContents()}
      </div>
      </div>
  `
    );
  }

  getHotDealContents() {
    return `
      <ul class="list--item" id="hot-deal-list">
      ${this.getHotDealItems()}
      </ul>
    
    `;
  }

  getHotDealItems() {
    let items = this.data.reduce((lists, list) => {
      let percent = '%';
      if (list.discount === undefined) {
        list.discount = '';
        percent = '';
      }
      if (list.maxPrice === undefined) {
        list.maxPrice = '';
      }

      const { contentseq, linkUrl, imageUrl, title, minPrice, discount, maxPrice } = list;

      lists += `
      <li class=${contentseq}>
        <a href=${linkUrl} class="link--product _GC_">
          <span class="hot-deal--thumb">
            <img src=${imageUrl} class="image-group" alt="">
          </span>
          <span class="screen-out">제품명</span>
            <strong class="info--title">${title}</strong>
          <span class="detail--price">
            <span class="info--discount">
              <span class="screen-out">할인가</span>
              <span class="txt--discount">${minPrice}<span class="txt--unit">원</span></span>
              <span class="screen-out">할인율</span>
              <span class="txt--percent">${discount}<span class="txt--unit">${percent}</span>
            </span>
          </span>
          <span class="screen-out">정가</span>
          <span class="txt--price">${maxPrice}<span class="screen-out">원</span></span></span>
        </a>
      </li>`;
      return lists;
    }, '');
    return items;
  }

  moreListDraw() {
    const $hotDealList = document.querySelector('#hot-deal-list');
    $hotDealList.insertAdjacentHTML('beforeend', `${this.getHotDealItems()}`);
  }

  updateMoreListNumber(current, length) {
    console.log('here');
    this.target.innerHTML = `<span>더보기(${current}/${length})</span>`;
  }
}
