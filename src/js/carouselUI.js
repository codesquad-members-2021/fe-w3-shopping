export default class CarouselUI {
    constructor() {
        this.el = document.querySelector('.carouselUI');
        this.imgurl__a = "http://localhost:8080/rightpannel1.05c10acb.png";
        this.imgurl__b = "http://localhost:8080/rightpannel2.9749f624.png";
        this.imgurl__c = "http://localhost:8080/rightpannel3.a20f5d1e.png";
        this.classCnt = 1;
    }

    makeImageDOM(img) {
        this.el.insertAdjacentHTML("beforeend", `<div id="img${this.classCnt++}" class="carouselUI--img"><img src="${img}" /></div>`);
    }

    insertDOM() {
        fetch(this.imgurl__a)
            .then(fetch(this.imgurl__b))
            .then(fetch(this.imgurl__c))
            .then(this.makeImageDOM(this.imgurl__a))
            .then(this.makeImageDOM(this.imgurl__b))
            .then(this.makeImageDOM(this.imgurl__c))
            .then(console.log(this.classCnt))
    }
}