/* --------------------------------------------------------------------- */
/* -----▶︎▶︎▶︎ Main 클래스: 프로그램을 시작시키고, 클래스들 간의 매개체가 된다. ◀︎◀︎◀︎-------*/
/* --------------------------------------------------------------------- */

/*
- [ ] Template 클래스 생성해서 templating으로 DOM 채우기 (첫화면)
- [x] 캐러셀의 기본 이미지 띄워주기
*/

import UIMaker from "./UIMaker.js";
import smallCarousel from "./smallCarousel.js";
import _ from "./utill.js";

const REFERENCE = {
    body: _.$("body"),
    bestSeller: _.$(".upper-half__left"),
    miniCarousel: _.$(".carousel1"),
    prevButton: _.$(".btn_prev"),
    nextButton: _.$(".btn_next"),
    slide: _.$(".slide")
}

class Main {
    constructor(UIMaker, smallCarousel){
        this.UIMaker = UIMaker;
        this.smallCarousel = smallCarousel;
        this.init()
    }
    init(){
        this.smallCarousel.addEvent(3);
        this.UIMaker.renderUI();
    }
}

const UIMAKER = new UIMaker(_, REFERENCE);
const SMALLCAROUSEL = new smallCarousel(_, REFERENCE);
new Main(UIMAKER, SMALLCAROUSEL);
