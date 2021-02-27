/* --------------------------------------------------------------------- */
/* -----▶︎▶︎▶︎ Main 클래스: 프로그램을 시작시키고, 클래스들 간의 매개체가 된다. ◀︎◀︎◀︎-------*/
/* --------------------------------------------------------------------- */

/*
- [ ] this.fileReader.getFileData(); 랑 this.UIMaker.fillUpImg();를 비동기로 연결해주기.
- [ ] Template 클래스 생성해서 templating으로 DOM 채우기 (첫화면)
- [ ] 캐러셀의 기본 이미지 띄워주기
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
    init(){//json파일 받아서 저장(비동기) 프로미스? getFileData가 완료되어야 시작화면에 이미지 렌더링이 가능.
        //{ best, event, carousel, box }
        this.smallCarousel.addEvent(3);
        this.UIMaker.fillUpImg();
    }
}

const UIMAKER = new UIMaker(_, REFERENCE);
const SMALLCAROUSEL = new smallCarousel(_, REFERENCE);
new Main(UIMAKER, SMALLCAROUSEL);
