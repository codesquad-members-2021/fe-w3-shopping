import FetchAPI from './fetchAPI';

export default class RequestData extends FetchAPI {
  constructor(page, items, current) {
    super();
    this.page = page;
    this.items = items;
    this.current = current;
    this.target = document.querySelector('.more-item__button');
  }

  addEvent() {
    this.target.addEventListener('click', this.requestData.bind(this));
  }

  requestData() {
    const requestItems = this.page * this.items;
    this.getHotDealList(this.current, requestItems);
    this.current = requestItems;
    this.page++;
  }
}
