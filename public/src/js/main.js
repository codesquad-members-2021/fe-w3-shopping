import { domSelect } from './util/util.js';
import { moreParser, slideParser } from './util/parser.js';
import Slide from './slide.js';
import More from './moreBtn.js';

//슬라이드 DOM
const slideContainer = domSelect('.slide');
const slideList = domSelect('.slide-list');
const pagingBtn = domSelect('.slide-event__paging');
const slideSelectors = { container: slideContainer, slideList, pagingBtn };
//더보기 DOM
const moreContainer = domSelect('.more-container');
console.log(moreContainer);
const moreBtn = domSelect('.more-text-container');
const moreSelectors = { container: moreContainer, moreBtn };

//슬라이더
fetch('https://shoppinghow.kakao.com/v1.0/shophow/top/planningEvent.json?_=1614221190473')
  .then((res) => res.json())
  .then((res) => {
    const { mileageList: slideData, mallEventList: moreData } = res;

    const parsedSlideData = slideParser(slideData);
    const slide = new Slide(parsedSlideData, slideSelectors);
    slide.init();
  });

//더보기
fetch('http://localhost:8080/moreItem')
  .then((res) => res.json())
  .then((res) => {
    const { contents: moreData } = res;
    const parsedMoreData = moreParser(moreData);
    const more = new More(parsedMoreData, moreSelectors);
    more.init();
  });

//HOT DEAL URL
//https://shoppinghow.kakao.com/v1.0/shophow/top/hotdeal.json?_=1614229361861
