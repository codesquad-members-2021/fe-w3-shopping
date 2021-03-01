import {loadBannerData} from './main.js';
import {loadHomeContentsData} from './main.js'
import {staticContainer, slideContainer, slideBundle, issueContainer, issueBundle} from './main.js';
const moreBtn = document.querySelector('.sub-menu__more');
const subSlide = document.querySelector('.sub-menu__silde');
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

function displayissue(images) {
    let imageArr = images.map( e => e.eventContent.imgurl);
    let prodArr = images.map( e => e.eventContent.title);
    for(let i=1; i<=10; i++) {
        let list = document.createElement("li");
        let ul = document.createElement("ul");
        let liImg = document.createElement("li");
        let img = document.createElement("img");
        let liTitle = document.createElement("li");
        let liDesc = document.createElement("li");
        let liTheme = document.createElement("li");
        let titleStr = document.createTextNode(`${prodArr[i]}`);
        // calss name
        ul.className = "issue-slide";
        liImg.className = "issue-slide__img";
        img.className = "img__img";
        img.src = `${imageArr[i]}`;
        liTitle.className = "issue-slide__title";
        liDesc.className = "issue-slide__desc";
        liTheme.className = "issue-slide__theme";
        list.className = "issue-list";
        // appendchild
        liImg.appendChild(img);
        ul.appendChild(liImg);
        liTitle.appendChild(titleStr);
        ul.appendChild(liTitle);
        ul.appendChild(liDesc);
        ul.appendChild(liTheme);
        list.appendChild(ul);
        issueBundle.appendChild(list);
    }
    issueContainer.appendChild(issueBundle);
}
let cnt =1;
let cntSum=5;
let cnt2 =1;
function displaymoreContents(images) {
    cnt2++;
    let imageArr = images.map( e => e.eventContent.imgurl);
    let prodArr = images.map( e => e.eventContent.title);
    let div = document.createElement('div');
    div.className = "divBox";
    let ul;
    console.log(cnt);
    console.log(cntSum);
for(let i=cnt; i<=cntSum; i++) {
    ul = document.createElement("ul")
    let liImg = document.createElement("li");
    let img = document.createElement("img");
    let liTitle = document.createElement("li");
    let liDesc = document.createElement("li");
    let liTheme = document.createElement("li");
    let titleStr = document.createTextNode(`${prodArr[i]}`);
    liImg.className = `sub-slide__img${i}`;
    img.className = "img__more";
    img.src = `${imageArr[i]}`;
    liTitle.className = "sub-slide__title";
    liDesc.className = "sub-slide__desc";
    liTheme.className = "sub-slide__theme";
    ul.className = "sub-slide";
    // appendchild
    liImg.appendChild(img);
    ul.appendChild(liImg);
    liTitle.appendChild(titleStr);
    ul.appendChild(liTitle);
    ul.appendChild(liDesc);
    ul.appendChild(liTheme);
    div.appendChild(ul);
}
subSlide.appendChild(div);
// if(cnt<11) {
//     // return displaymoreContents(images);
// }
cnt = cnt+5;
cntSum = cntSum + 5;
// if(cnt2<3) {
//     return displaymoreContents(images);
// }
moreBtn.addEventListener('click', () => {
    console.log('a');
    return displaymoreContents(images);
})
}



loadBannerData()
    .then(images => {
        console.log(images);
        displayStaticImg(images);
        displaySlideImg(images);
        // displayissue(images);
    })

loadHomeContentsData()
    .then(images => {
        // let imageArr = images.map( e => e.eventContent.imgurl);
        // console.log(imageArr[2])
        displayissue(images);
        displaymoreContents(images);
    })

