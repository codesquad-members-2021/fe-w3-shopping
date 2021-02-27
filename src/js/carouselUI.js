export default class CarouselUI {
    constructor() {
        this.carouselUI = document.querySelector('.carouselUI');
        this.imgurl1 = "http://localhost:8080/rightpannel1";
        this.imgurl2 = "http://localhost:8080/rightpannel2";
        this.imgurl3 = "http://localhost:8080/rightpannel3";
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
            .then(
                this.makeImageDOM(this.imgurl3),
                this.makeImageDOM(this.imgurl1),
                this.makeImageDOM(this.imgurl2),
                this.makeImageDOM(this.imgurl3),
                this.makeImageDOM(this.imgurl1),
            )
    }
}