import Slide from './slide.js';
import { domSelect } from './util.js';
import { moreParser, slideParser } from './parser.js';
import More from './moreBtn.js';

const banner = domSelect('.banner');
//슬라이드 DOM
const slideContainer = domSelect('.slide');
const slideList = domSelect('.slide-list');
const pagingBtn = domSelect('.slide-event__paging');
const slideSelectors = { container: slideContainer, slideList, pagingBtn };
//더보기 DOM
const moreItemContainer = domSelect('.event-item-list');
const moreBtn = domSelect('.more-text-container');
const moreSelectors = { container: moreItemContainer, moreBtn };

fetch('https://shoppinghow.kakao.com/v1.0/shophow/top/planningEvent.json?_=1614221190473')
  .then((res) => res.json())
  .then((res) => {
    const { mileageList: slideData, mallEventList: moreData } = res;

    const parsedSlideData = slideParser(slideData);
    const slide = new Slide(parsedSlideData, slideSelectors);
    slide.init();

    const parsedMoreData = moreParser(moreData);
    const more = new More(parsedMoreData, moreSelectors);
    more.init();
  })
  .then(console.log);

//HOT DEAL URL
//https://shoppinghow.kakao.com/v1.0/shophow/top/hotdeal.json?_=1614229361861
