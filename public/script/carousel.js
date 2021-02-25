export default class Carousel {
    constructor({bannerRef}) {
        this.prevBtn = bannerRef.prevBtn;
        this.nextBtn = bannerRef.nextBtn;
        this.slideWrap = bannerRef.slideWrap;
        this.setEvent();
    }
    setEvent() {
        this.prevBtn.addEventListener('click',this.moveWrap.bind(this, 1));
        this.nextBtn.addEventListener('click',this.moveWrap.bind(this, -1));
    }
    moveWrap(direction) {
        this.slideWrap.style.transitionDuration = '400ms';
        this.slideWrap.style.transform = `translateX(${direction * 100/3}%)`;
        const btn = (direction == 1) ? 'prev' : 'next';
        setTimeout(this.switchList.bind(this, btn), 400);
    }
    switchList(btn) {
        const wrap = this.slideWrap;
        wrap.removeAttribute('style');
        if(btn == 'next') wrap.appendChild(wrap.firstElementChild);
        else wrap.insertBefore(wrap.lastElementChild, wrap.firstChild);
    }

}
