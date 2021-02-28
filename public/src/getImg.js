import {loadBannerData} from './main.js';
// import {loadHomeContentsData} from './fetchData.js';
const staticContainer = document.querySelector('.main-banner__static');
const slideBundle = document.querySelector('.slide-bundle');

function displayStaticImg(images) {
    staticContainer.innerHTML = `<a href="#" class="static__link">
    <img src="${images[2].imgurl}" alt="" class="static__img1">
</a>`;
}

loadBannerData()
    .then(images => {
        displayStaticImg(images);
        // displaySlideImg(images);
    })