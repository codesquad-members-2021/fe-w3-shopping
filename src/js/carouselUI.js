export default class CarouselUI {
    constructor() {
        this.carouselUI = document.querySelector('.carouselUI');
        this.imgurl1 = "http://localhost:8080/rightpannel1.05c10acb.png";
        this.imgurl2 = "http://localhost:8080/rightpannel2.9749f624.png";
        this.imgurl3 = "http://localhost:8080/rightpannel3.a20f5d1e.png";
    }

    makeImageDOM(imgurl) {
        this.carouselUI.insertAdjacentHTML("beforeend",
            `<div class="carouselUI--img">
                <img src="${imgurl}" />
            </div>`);
    }

    insertDOM() {
        fetch(this.imgurl1)
            .then(fetch(this.imgurl2))
            .then(fetch(this.imgurl3))
            .then(this.makeImageDOM(this.imgurl3))
            .then(this.makeImageDOM(this.imgurl1))
            .then(this.makeImageDOM(this.imgurl2))
            .then(this.makeImageDOM(this.imgurl3))
            .then(this.makeImageDOM(this.imgurl1))
    }
}