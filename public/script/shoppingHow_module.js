import Carousel from './carousel.js';

const ref = {
    bannerRef: {
        prevBtn: document.querySelector('.btn_prev'),
        nextBtn: document.querySelector('.btn_next'),
        slideWrap: document.querySelector('.slide__wrap'),
        pagingList: document.querySelectorAll('.ico_paging'),
        pagingIcons: document.querySelectorAll('.num_page')
    }
}

const carousel = new Carousel(ref);