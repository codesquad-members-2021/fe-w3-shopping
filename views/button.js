const SHOWING_CLASS = "showing";
const carouselSlide = document.querySelector(".carousel_slide")
const slide_ITEM = document.querySelectorAll(".items");
const RIGHT = document.querySelector(".right"); 
const LEFT = document.querySelector(".left");

console.log(slide_ITEM.length)
let counter = 1;
const size = slide_ITEM[0].clientWidth;

carouselSlide.style.transform = 'translateX('+ (-size*counter) + 'px)';

RIGHT.addEventListener("click", () => {
    if(counter >= slide_ITEM.length - 1) return;
    carouselSlide.style.transition = "transform 0.4s ease-in-out";
    counter++;
    carouselSlide.style.transform = 'translateX('+ (-size*counter) + 'px)';
});

LEFT.addEventListener("click", () => {
    if(counter <= 0) return;
    carouselSlide.style.transition = "transform 0.4s ease-in-out";
    counter--;
    carouselSlide.style.transform = 'translateX('+ (-size*counter) + 'px)';
});

carouselSlide.addEventListener("transitionend", () => {
    if(slide_ITEM[counter].id === "lastClone") {
        carouselSlide.style.transition = "none";
        counter = slide_ITEM.length - 2;
        carouselSlide.style.transform = 'translateX('+ (-size*counter) + 'px)';
    }
    if(slide_ITEM[counter].id === "firstClone") {
        carouselSlide.style.transition = "none";
        counter = slide_ITEM.length - counter;
        carouselSlide.style.transform = 'translateX('+ (-size*counter) + 'px)';
    }
});



// const slide = () => {
//     const currentslide = document.querySelector(SHOWING_CLASS);
    
//     if(currentslide) {
//         currentslide.classList.remove(SHOWING_CLASS);
//         const nextslide = currentslide.nextElementSibling;
//         if(nextslide) {
//             nextslide.classList.add(SHOWING_CLASS);
//         } else {
//             firstslide.classList.add(SHOWING_CLASS);    
//         }
//     } else {
//         firstslide.classList.add(SHOWING_CLASS);
//     }
// }