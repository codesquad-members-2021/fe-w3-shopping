import { _ } from './util.js'

export class Slide {
    constructor(selectors) {
        this.wrapper = selectors.wrapper
        this.slideItems = selectors.slideItems
        this.rightButton = selectors.rightButton
        this.leftButton = selectors.leftButton
        this.scrollButtons = selectors.scrollButtons
        this.addEvent()
    }
    currentIndex = 1;
    direction;

    slideRight() {
        this.wrapper.style.transform = 'translate3d(-484px,0,0)'
        this.wrapper.style.transition = '300ms'
        this.direction = 'right';
        _.CT(this.scrollButtons[this.currentIndex], 'slide-on')
        this.currentIndex = this.currentIndex === 2 ? 0 : ++this.currentIndex
        _.CT(this.scrollButtons[this.currentIndex], 'slide-on')
    }
    
    slideLeft() {
        this.wrapper.style.transform = 'translate3d(484px,0,0)'
        this.wrapper.style.transition = '300ms'
        this.direction = 'left';
        _.CT(this.scrollButtons[this.currentIndex], 'slide-on')
        this.currentIndex = this.currentIndex === 0 ? 2 : --this.currentIndex
        _.CT(this.scrollButtons[this.currentIndex], 'slide-on')
    }

    slideEnd() {
        let temp;
        if (this.direction === 'right') {
            temp = this.slideItems[0].innerHTML
            this.slideItems[0].innerHTML = this.slideItems[1].innerHTML
            this.slideItems[1].innerHTML = this.slideItems[2].innerHTML
            this.slideItems[2].innerHTML = temp;
        } else if (this.direction === 'left') {
            temp = this.slideItems[2].innerHTML
            this.slideItems[2].innerHTML = this.slideItems[1].innerHTML
            this.slideItems[1].innerHTML = this.slideItems[0].innerHTML
            this.slideItems[0].innerHTML = temp;
        }
        this.wrapper.style.transition = '0ms'
        this.wrapper.style.transform = 'translate3d(0,0,0)'
        this.direction = '';
    }

    addEvent() {
        _.E(this.leftButton, 'click', this.slideLeft.bind(this))
        _.E(this.rightButton, 'click', this.slideRight.bind(this))
        _.E(this.wrapper, 'transitionend', this.slideEnd.bind(this))
    }
}
