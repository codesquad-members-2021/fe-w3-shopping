import {
   _
} from "./util.js";

import {
   CarouselCtrl
} from "./carousel.ctrl.js";

import {
   RequestData
} from "./request_data.js";

const requestUrlForSection1 = 'https://shoppinghow.kakao.com/v1.0/shophow/top/planningEvent.json?_=1614126791478';
const requestUrlForSection2 = 'https://shoppinghow.kakao.com/v1/event/homecontents.json?page=1&countPerPage=20&categoryid=&min_num=53884&displaytype=PC&_=1614421595623';
const requestInfoForSection1_carousel = 'mileageList';
const requestInfoForSection2_view_more = "contents";
const requestInfoForSection1_carousel_hot = "mallEventList";
const requestInfoForSection1_banner = "event";
let count = 0;

const playViewMore = () => new RequestData(requestUrlForSection2, requestInfoForSection2_view_more, 'view_more_basic');
const playCarousel_hot = () => new RequestData(requestUrlForSection1, requestInfoForSection1_carousel_hot, 'carousel_hot');
const playCarousel = () => new RequestData(requestUrlForSection1, requestInfoForSection1_carousel, 'carousel');
const loadBannerImg = () => new RequestData(requestUrlForSection1, requestInfoForSection1_banner, 'banner');

const ctrlCarouselBtn = () => {
   const slideArea = _.$('.slide_second_position');
   const slideNextBtn = _.$(".evt_main .next");
   const slidePrevBtn = _.$(".evt_main .prev");
   const value = 'carousel';
   return new CarouselCtrl(slidePrevBtn, slideNextBtn, slideArea, value);
}

const ctrlCarouselBtn_hot = () => {
   const slideArea = _.$('.hot_deal_list');
   const slideNextBtn = _.$(".slide_hot_deal .next");
   const slidePrevBtn = _.$(".slide_hot_deal .prev");
   const value = 'carousel_hot';
   return new CarouselCtrl(slidePrevBtn, slideNextBtn, slideArea, value);
}

const viewMoreUrlSetting = () => {
   while (count < 5) {
      count++;
      let viewMoreUrl = `https://shoppinghow.kakao.com/v1/event/homecontents.json?page=${1+2*count}&countPerPage=20&categoryid=&min_num=${53884+count}&displaytype=PC&_=${1614421595623+count}`;
      return new RequestData(viewMoreUrl, requestInfoForSection2_view_more, 'view_more');
   }
}

const ctrlViewMoreBtn = () => {
   const viewMoreBtn = _.$('.see_more_btn');
   viewMoreBtn.addEventListener('click', viewMoreUrlSetting)
}

function init() {
   playViewMore();
   loadBannerImg();
   ctrlViewMoreBtn();
   playCarousel();
   playCarousel_hot();
   ctrlCarouselBtn();
   ctrlCarouselBtn_hot();
}

init();