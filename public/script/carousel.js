export default class Carousel {
    constructor({bannerRef}) {
        this.prevBtn = bannerRef.prevBtn;
        this.nextBtn = bannerRef.nextBtn;
        this.slideWrap = bannerRef.slideWrap;
        this.pagingIcons = bannerRef.pagingIcons;
        this.setEvent();
    }
    setEvent() {
        this.prevBtn.addEventListener('click',this.translateWrap.bind(this, 1));
        this.nextBtn.addEventListener('click',this.translateWrap.bind(this, -1));
        // this.pagingIcons.addEventListener('mouseenter', .bind(this));
    }
    translateWrap(direction) {
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
        this.fillPaging();
    }
    fillPaging() {
        const currPage = this.slideWrap.children[1].dataset.index;
        this.pagingIcons.forEach((e)=> {
            e.classList.remove('curr_page');
        });
        this.pagingIcons[currPage].classList.add('curr_page');
    }


}
