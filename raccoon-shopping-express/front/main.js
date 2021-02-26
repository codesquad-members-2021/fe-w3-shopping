import { REQUEST_SUCESS, REQUEST_FAILED, $mileageEventSlide, $prevEventButton, $nextEventButton, $topMileageSlide, $mileageSlidePage, $mallEventList, $mallEventSlide, $hotDealWrapper } from './const';

class FetchAPI {
  constructor(unit) {
    this.unit = unit;
    this.url = {
      mileageList: 'http://localhost:3000/api/mileageList',
      mallEventList: 'http://localhost:3000/api/mallEventList',
      hotDealList: 'http://localhost:3000/api/hotDealList',
      shoppingPartner: 'http://localhost:3000/api/shoppingPartner',
    };
  }
  init() {
    this.mileageList();
    this.mallEventList();
    this.hotDealList();
  }
  mileageList = () =>
    fetch(this.url.mileageList)
      .then((response) => response.json())
      .then((data) => {
        const mileageEventCarousel = new MileageEventCarousel(data);
        mileageEventCarousel.setMileageEventContents();
        return data;
      })
      .then((status) => console.log(REQUEST_SUCESS, status.code))
      .catch((error) => console.log(REQUEST_FAILED, error));

  mallEventList = () =>
    fetch(this.url.mallEventList)
      .then((response) => response.json())
      .then((data) => {
        const mallEventSection = new MallEventSection(data);
        return data;
      })
      .then((status) => console.log(REQUEST_SUCESS, status.code))
      .catch((error) => console.log(REQUEST_FAILED, error));

  hotDealList = () =>
    fetch(this.url.hotDealList)
      .then((response) => response.json())
      .then((data) => {
        const hotDealSection = new HotDealSection(data);
        hotDealSection.draw();
        return data;
      })
      .then((status) => console.log(REQUEST_SUCESS, status.code))
      .catch((error) => console.log(REQUEST_FAILED, error));
}

class EventSlider {
  constructor(target) {
    this.target = target;
  }
  init() {
    if (this.target) this.addEvent();
  }
  addEvent() {
    // 여기에서 this: EventSlider 객체
    // this.target: $mileageSlider

    this.target.addEventListener('mouseover', this.overEventSlider.bind(this));
    this.target.addEventListener('mouseout', this.outEventSlider.bind(this));
    this.target.addEventListener('click', this.clickEventSlider.bind(this));
  }
  overEventSlider(e) {
    if (e.target.classList.contains('adela') || e.target.getAttribute('data-index')) {
      this.pageHover(e);
    }
    $prevEventButton.querySelector('.ico--prev').classList.replace('ico--prev', 'ico--prev__slide--hover');
    $nextEventButton.querySelector('.ico--next').classList.replace('ico--next', 'ico--next__slide--hover');
  }

  outEventSlider() {
    $prevEventButton.querySelector('.ico--prev__slide--hover').classList.replace('ico--prev__slide--hover', 'ico--prev');
    $nextEventButton.querySelector('.ico--next__slide--hover').classList.replace('ico--next__slide--hover', 'ico--next');
  }

  clickPrev() {
    $topMileageSlide.classList.replace('slide', 'slide--click--prev');
    setTimeout(() => {
      $topMileageSlide.insertBefore($topMileageSlide.lastElementChild, $topMileageSlide.firstElementChild);
      $topMileageSlide.classList.replace('slide--click--prev', 'slide');
      this.pagePrev();
    }, 300);
  }
  clickNext() {
    $topMileageSlide.classList.replace('slide', 'slide--click--next');
    setTimeout(() => {
      $topMileageSlide.insertBefore($topMileageSlide.firstElementChild, null);
      $topMileageSlide.classList.replace('slide--click--next', 'slide');
      this.pageNext();
    }, 300);
  }

  clickEventSlider(e) {
    const isClickPrev = () => e.target.classList.contains('slide--button--prev') || e.target.classList.contains('ico--prev__slide--hover');
    const isClickNext = () => e.target.classList.contains('slide--button--next') || e.target.classList.contains('ico--next__slide--hover');

    if (isClickPrev()) {
      this.clickPrev();
    }
    if (isClickNext()) {
      this.clickNext();
    }
  }

  pagePrev() {
    $mileageSlidePage.insertBefore($mileageSlidePage.firstElementChild, null);
  }

  pageNext() {
    $mileageSlidePage.insertBefore($mileageSlidePage.lastElementChild, $mileageSlidePage.firstElementChild);
  }

  pageHoverPrev() {
    $topMileageSlide.insertBefore($topMileageSlide.lastElementChild, $topMileageSlide.firstElementChild);
    this.pagePrev();
  }

  pageHoverNext() {
    $topMileageSlide.insertBefore($topMileageSlide.firstElementChild, null);
    this.pageNext();
  }

  pageHover(e) {
    if (e.target.classList.contains('first')) return;
    if (e.target.getAttribute('data-index') === '1') {
      this.pageHoverNext();
    }
    if (e.target.getAttribute('data-index') === '2') {
      this.pageHoverPrev();
    }
  }
}

class MileageEventCarousel {
  constructor(data) {
    this.data = data;
  }
  setMileageEventContents() {
    $topMileageSlide.insertAdjacentHTML('afterbegin', this.getMileageEventContents());
  }
  getMileageEventContents() {
    const imgurlArr = this.data.mileageList.map((el) => el.imgurl);
    const linkurlArr = this.data.mileageList.map((el) => el.linkurl);

    let panelDiv = ``;
    for (let i = 0; i < imgurlArr.length; i++) {
      panelDiv += `
      <div class="panel">
      <a href="${linkurlArr[i]}" class="link--event"
        ><img src="${imgurlArr[i]}" width="485" height="340" class="img_g" alt=""
      /></a>
      </div>`;
    }
    return panelDiv;
  }
}

class HotDealSection {
  constructor(data, initial, more) {
    this.data = data;
    this.initial = initial;
    this.more = more;
  }

  draw() {
    this.getHotDealLists();
  }

  moreListDraw() {
    this.getHotDealContents();
  }

  getHotDealLists() {
    return this.getHotDealTitle();
  }
  getHotDealTitle() {
    return $hotDealWrapper.querySelector('.section--hot-deal').insertAdjacentHTML(
      'afterbegin',
      `
      <div class="title__hot-deal"><h3 class="title--txt">품절주의! 역대급 핫딜</h3></div>
      <div class="contents--item">
        ${this.getHotDealContents()}
      </div>
      </div>
  `
    );
  }
  getHotDealContents() {
    return `
      <ul class="list--item _GL">
      ${this.getHotDealItems()}
      </ul>
    
    `;
  }
  getHotDealItems() {
    let items = this.data.hotdealList.reduce((lists, list) => {
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

  getHotDealItem(list) {
    const { contentseq, linkUrl, imageUrl, title, minPrice, discount, maxPrice } = list;
    return `
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
  }

  getHotDealItemList(repeat) {
    let itemList = ``;
    for (let i = 0; i < repeat; i++) {
      itemList += this.getHotDealItem();
    }
    return itemList;
  }
}

const fetchAPI = new FetchAPI();
const eventSliderListener = new EventSlider($mileageEventSlide);

fetchAPI.init();
eventSliderListener.init();

class MallEventSection {
  constructor(data) {
    this.data = data;
  }

  getMallEventPanel() {
    return `
    <div class="panel" aria-hidden="true">
    <ul class="list--item">
    </ul>
    </div>
    `;
  }
  getMallEventItem() {
    const $listItem = document.querySelector('.list--item');
  }
  pushItemData() {}
  mallEventCarousel() {}
}

function getMallEventPanel() {
  return `
<div class="panel" aria-hidden="true">
<ul class="list--item">
</ul>
</div>
`;
}

function getMallEventItem(list) {
  const { dataseq, imgurl, text, text2, linkurl } = list;

  return `
  <li class=${dataseq}>
  <a href="${linkurl} class="link--product"
    ><span class="info--thumb"
      ><img
        src=${imgurl}
        width="200"
        height="200"
        class="imgage--top"
        alt=${text} /></span
    ><strong class="info--title">${text}</strong><span class="info--txt">${text2}</span
    ><span class="ico--background2 ico--theme">테마</span></a
  >
</li>
  `;
}
