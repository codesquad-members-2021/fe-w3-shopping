// class Carousel {
//     constructor() {

//     }
// }


const mainSlide = document.querySelector(".main-banner__slide");
const slideBundle = document.querySelector(".slide-bundle");
// let lastList = 
let children = slideBundle.children;
let len = children.length;
// console.log(children);
// console.log(slideBundle.lastElementChild);
mainSlide.addEventListener('click', ({target}) => {
    if(target.className === "fas fa-chevron-right") {
        slideBundle.classList.toggle('active');
        slideBundle.insertBefore(children[len-1],children[0]);
        slideBundle.classList.toggle('active');
    }

    else if(target.className === "fas fa-chevron-left") {
        slideBundle.classList.toggle('left');
        slideBundle.appendChild(slideBundle.firstElementChild);
        slideBundle.classList.toggle('left');
    }
})


