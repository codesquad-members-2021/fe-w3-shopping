class Slider {
    constructor() {
        this.sectionIndex = 0,
            this.slider = document.querySelector('.slider'),
            this.leftArrow = document.querySelector(".left"),
            this.rightArrow = document.querySelector(".right"),
            this.indicatorParents = document.querySelector(".controls ul"),
            this.comm = document.querySelectorAll(".controls li"),
            this.sliderImg = document.querySelectorAll(".slider section"),
            this.itemSize = 33,
            this.onEvent();
            this.loadRandomImage(3);
        }
        
        onEvent() {
        this.rightArrow.addEventListener('click', () => {
            this.move("right");
        });
        this.leftArrow.addEventListener('click', () => {
            this.move("left");
        });

        this.indicatorParents.addEventListener('mouseover', (event) => {
            this.onOver(event);
        });
    }

    onOver(event) {
        const action = event.target.dataset.action;
        if(action) this[action](event.target, event.target.id);
    }

    pagingComm(el, ind) {
        console.log("hi");
        this.sectionIndex = Number(ind);
        document.querySelector('.controls .selected').classList.remove('selected');
        el.classList.add('selected');
        this.slider.style.transform = `translate(` + (this.sectionIndex) * -this.itemSize + `%)`;
    }

    move(direction) {
        const firstSection = 0;
        const lastSection = 2;
        if(direction === "right") {
            this.sectionIndex = (this.sectionIndex < lastSection) ? this.sectionIndex + 1 : firstSection;
        }
        if(direction === "left") {
            this.sectionIndex = (this.sectionIndex > firstSection) ? this.sectionIndex - 1 : lastSection;
        }
        document.querySelector('.controls .selected').classList.remove('selected');
        this.indicatorParents.children[this.sectionIndex].classList.add('selected');
        this.slider.style.transform = `translate(` + (this.sectionIndex) * -this.itemSize + `%)`;
    }


    getRandomNum(m, n) {
        return m + Math.floor((n - m + 1) * Math.random());
    }

    loadRandomImage(count) {
        const URL = "http://localhost:3000/homeData.json";
        fetch(URL)
            .then(response => response.json())
            .then(json => {
                for(let i = 0; i < count; i++) this.renderImage(json.bigSlideList[i].imgurl, i)
            })
            .catch(err => console.log(err));
    }

    renderImage(img, sliderIdx) {
            this.sliderImg[sliderIdx].innerHTML = `<img src = ${img}>`;
    }

}

export default Slider;
