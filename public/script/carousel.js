export default class Carousel {
    constructor({bannerRef}) {
        this.prevBtn = bannerRef.prevBtn;
        this.nextBtn = bannerRef.nextBtn;
        this.slideWrap = bannerRef.slideWrap;
        this.pagingList = bannerRef.pagingList;
        this.pagingIcons = bannerRef.pagingIcons;
        this.setEvent();
    }
    setEvent() {
        this.prevBtn.addEventListener('click',this.translateWrap.bind(this, 1));
        this.nextBtn.addEventListener('click',this.translateWrap.bind(this, -1));
        this.pagingIcons.forEach(e => {
            e.addEventListener('mouseenter',this.switch.bind(this));
        })
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
    switch({target}) {
        const wrap = this.slideWrap;
        const currPage = wrap.children[1].dataset.index;
        const targetPage = target.dataset.index;
        const diff = targetPage - currPage;
        if(diff > 0) {
            for(let i = 0; i < Math.abs(diff); i++) {
                wrap.appendChild(wrap.firstElementChild);
            }
        } else if(diff < 0) {
            for(let i = 0; i < Math.abs(diff); i++) {
                wrap.insertBefore(wrap.lastElementChild, wrap.firstChild);
            }
        }
        this.fillPaging();
    }
    fillPaging() {
        const currPage = this.slideWrap.children[1].dataset.index;
        this.pagingList.forEach(e => {
            e.classList.remove('curr_page');
        });
        this.pagingList[currPage].classList.add('curr_page');
    }
}
