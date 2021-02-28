import {loadBannerData} from './main.js';
import {staticContainer, slideContainer, slideBundle} from './main.js';

function displayStaticImg(images) {
    staticContainer.innerHTML = `<a href="#" class="static__link">
    <img src="${images[2].imgurl}" alt="" class="static__img1">
</a>`;
}
function displaySlideImg(images) {
for(let i=1; i<=3; i++) {
    let img = document.createElement("img");
    let li = document.createElement("li");
    let a = document.createElement("a");
    img.className = `slide__img${i}`;
    a.className = `slide__link${i}`;
    li.className = "slide-list"
    img.src = `${images[i-1].imgurl}`;
    a.appendChild(img);
    li.appendChild(a);
    slideBundle.appendChild(li);
}
}
loadBannerData()
    .then(images => {
        displayStaticImg(images);
        displaySlideImg(images);
    })