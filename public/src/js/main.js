import Slide from './slide.js';
import { domSelect } from './util.js';
import { slideParser } from './parser.js';

const slideContainer = domSelect('.slide');
const slideList = domSelect('.slide-list');
const pagingBtn = domSelect('.slide-event__paging');
const slideSelectors = { container: slideContainer, slideList, pagingBtn };

fetch('https://shoppinghow.kakao.com/v1.0/shophow/top/planningEvent.json?_=1614221190473')
  .then((res) => res.json())
  .then((res) => {
    const { mileageList: slideData, mallEventList: moreBtnData } = res;
    return slideData;
  })
  .then((slideData) => {
    const data = slideParser(slideData);
    const slide = new Slide(data, slideSelectors);
    slide.init();
  });
