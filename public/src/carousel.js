import {slideContainer, slideBundle, issueBundle} from './main.js';
class Carousel {
    constructor(slideBundle) {
        this.children = slideBundle.children;
        this.setTime = 500;
        this.eventSignal = this.eventSignal();
    }
    eventSignal() {
        this.decideClickDirection();
        this.decideMouseoverChange();
    }

    decideMouseoverChange() {
        slideContainer.addEventListener('mouseover', ({target}) => {
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
        slideContainer.addEventListener('click', ({target}) => {
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
        slideBundle.classList.toggle(this.dir);
        setTimeout(() => {
            this.moveList(this.dir);
            slideBundle.classList.toggle(this.dir);
        }, this.setTime);
    }
    moveList() {
        if(this.dir.includes('right')) {
            return slideBundle.insertBefore(this.children[2],this.children[0]);
        }
        else if(this.dir.includes('left')) {
            return slideBundle.appendChild(slideBundle.firstElementChild);
        }
    }
}

let slide = new Carousel(slideBundle);
// console.log(issueBundle.tagName)