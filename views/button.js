const TRANS_RIGHT = "trans_right";
const TRANS_LEFT = "trans_left";
const ON = "on";
const carouselSlide = document.querySelector(".carousel_slide");
const RIGHT = document.querySelector(".right_button"); 
const LEFT = document.querySelector(".left_button");

let counter = 1;
const size = carouselImg[0].clientWidth;

RIGHT.addEventListener('click', () => {
    carouselSlide.classList.add(TRANS_RIGHT);
    carouselSlide.classList.add(ON);
    setTimeout(() => {
        carouselSlide.classList.remove(ON);
        carouselSlide.classList.remove(TRANS_RIGHT);        
        carouselSlide.insertBefore(carouselSlide.firstElementChild, null);
    },300)
});


LEFT.addEventListener("click", () => {
    carouselSlide.classList.add(TRANS_LEFT);
    carouselSlide.classList.add(ON);
    setTimeout(() => {
        carouselSlide.classList.remove(ON);
        carouselSlide.classList.remove(TRANS_LEFT);        
        carouselSlide.insertBefore(carouselSlide.lastElementChild,carouselSlide.firstElementChild);
    },300)
});