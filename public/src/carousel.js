class Carousel {
    constructor() {
        this.mainSlide = document.querySelector(".main-banner__slide");
        this.slideBundle = document.querySelector(".slide-bundle");
        this.children = this.slideBundle.children;
        this.len = this.children.length;
        this.setTime = 500;
        this.eventSignal = this.eventSignal();

    }
    eventSignal() {
        this.decideClickDirection();
        this.decideMouseoverChange();
    }
    decideMouseoverChange() {
        this.mainSlide.addEventListener('mouseover', ({target}) => {
            let targetKey = target.dataset.key;
            if(targetKey === undefined) {
                return;
            }
            let num = targetKey[targetKey.length-1]
            if(targetKey === `list${num}` && this.children[1].firstElementChild.className !== `slide__link${num}`) {
                this.setTime = 0;
                if(this.children[0].firstElementChild.className === `slide__link${num}`) {
                    this.dir = 'over-right';
                    return this.moveContent();
                }
                else {
                    this.dir = 'over-left';
                    return this.moveContent();
                }
            }
        });
    }

    decideClickDirection() {
        // let dir = '';
        this.mainSlide.addEventListener('click', ({target}) => {
            if(target.classList.contains('fa-chevron-right')) {
                this.dir = 'right'
                return this.moveContent();
            }
            else if(target.classList.contains('fa-chevron-left')) {
                this.dir = 'left'
                return this.moveContent();
            }
        })
    }
    moveContent() {
        this.slideBundle.classList.toggle(this.dir);
        setTimeout(() => {
            this.moveList(this.dir);
            this.slideBundle.classList.toggle(this.dir);
        }, this.setTime);
    }
    moveList() {
        if(this.dir.includes('right')) {
            return this.slideBundle.insertBefore(this.children[this.len-1],this.children[0]);
        }
        else if(this.dir.includes('left')) {
            return this.slideBundle.appendChild(this.slideBundle.firstElementChild);
        }
    }

}

let slide = new Carousel();
// slide.printCalo();