import {
   _
} from "./util.js";

import {
   LoaderFromJson
} from "./data_loader.js";

import {
   CarouselCtrl
} from "./carousel.ctrl.js";

import {
   CarouselMaker
} from "./carousel.maker.js";

import {
   RequestData
} from "./request_data.js";

const requestUrlForSection1 = 'https://shoppinghow.kakao.com/v1.0/shophow/top/planningEvent.json?_=1614126791478';
const requestInfoForSection1_carousel = 'mileageList';
const requestInfoForSection1_banner = "event";

const playCarousel = new RequestData(requestUrlForSection1, requestInfoForSection1_carousel, 'carousel');
const bannerImg = new RequestData(requestUrlForSection1, requestInfoForSection1_banner, 'banner');
const btnCtrl = function () {
   const slideArea = _.$('.slide_second_position'); //슬라이드될 영역, 그 안에 이미지 div가 존재한다.
   const slideNextBtn = _.$(".slide_prev_main_next .next");
   const slidePrevBtn = _.$(".slide_prev_main_next .prev");
   return new CarouselCtrl(slidePrevBtn, slideNextBtn, slideArea);
}






// function playCarousel() {
//    const requestUrl = 'https://shoppinghow.kakao.com/v1.0/shophow/top/planningEvent.json?_=1614126791478';
//    const requestInfo = 'mileageList';
//    let value = 'carousel';

//    //!질문 return new Promise(resolve => {
//    //    resolve(new LoaderFromJson(requestUrl, requestInfo)).then(result => {
//    //       console.log(result)
//    //       new CarouselMaker(result)
//    //    })
//    // })
// }


// playCarousel();