class Slider {
    constructor() {
        this.sectionIndex = 0,
            this.slider = document.querySelector('.slider'),
            this.leftArrow = document.querySelector(".left"),
            this.rightArrow = document.querySelector(".right"),
            this.indicatorParents = document.querySelector(".controls ul"),
            this.comm = document.querySelectorAll(".controls li"),
            this.sliderImg = document.querySelectorAll(".slider section"),
            this.eventHandler();
    }

    eventHandler() {
        for(let i = 0; i < 3; i++) this.loadRandomImage(i);
        this.rightArrow.addEventListener('click', this.moveRight.bind(this));
        this.leftArrow.addEventListener('click', this.moveLeft.bind(this));
        this.comm.forEach((el, ind) => {
            el.addEventListener('mouseenter', () => {
                this.pagingComm(el, ind);
            });
        });
    }

    pagingComm(el, ind) {
        this.sectionIndex = ind;
        document.querySelector('.controls .selected').classList.remove('selected');
        el.classList.add('selected');
        this.slider.style.transform = `translate(` + (this.sectionIndex) * -33 + `%)`;
    }

    moveRight() {
        this.sectionIndex = (this.sectionIndex < 2) ? this.sectionIndex + 1 : 2;
        document.querySelector('.controls .selected').classList.remove('selected');
        this.indicatorParents.children[this.sectionIndex].classList.add('selected');
        this.slider.style.transform = `translate(` + (this.sectionIndex) * -33 + `%)`;
    }

    moveLeft() {
        this.sectionIndex = (this.sectionIndex > 0) ? this.sectionIndex - 1 : 0;
        document.querySelector('.controls .selected').classList.remove('selected');
        this.indicatorParents.children[this.sectionIndex].classList.add('selected');
        this.slider.style.transform = `translate(` + (this.sectionIndex) * -33 + `%)`;
    }

    getRandomNum(m, n) {
        return m + Math.floor((n - m + 1) * Math.random());
    }

    loadRandomImage(idx) {
        const URL = "http://localhost:3000/homeData.json";
        fetch(URL)
            .then(response => response.json())
            .then(json => this.renderImage(json.bigSlideList[idx].imgurl, idx))
            .catch(err => console.log(err));
    }

    renderImage(img, sliderIdx) {
            this.sliderImg[sliderIdx].innerHTML = `<img src = ${img}>`;
    }

}

new Slider();
