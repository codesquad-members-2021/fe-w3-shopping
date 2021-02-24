import {
   _
} from "./util.js";

import {
   LoaderFromJson
} from "./data_loader.js";


import {
   CarouselCtrl
} from "./carousel.js";


function playCarousel() {
   const requestUrl = 'https://shoppinghow.kakao.com/v1.0/shophow/top/planningEvent.json?_=1614126791478';
   const requestInfo = 'mileageList';
   return new LoaderFromJson(requestUrl, requestInfo);
}

function btnCtrl() {
   const slideArea = _.$('.slide'); //슬라이드될 영역, 그 안에 이미지 div가 존재한다.
   console.log(slideArea)
   const slideNextBtn = _.$(".slide_prev_main_next .next");
   const slidePrevBtn = _.$(".slide_prev_main_next .prev");
   return new CarouselCtrl(slidePrevBtn, slideNextBtn, slideArea);
}

function init() {
   playCarousel();
   btnCtrl();
}

init();