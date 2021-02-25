const SHOWING_CLASS = "showing";
const SELECT_CLASS = "select";

const firstSlide = document.querySelector(".slider__item:first-child");
const lastSlide = document.querySelector(".slider__item:last-child");

const firstPageBox = document.querySelector(".page_box:first-child");
const lastPageBox = document.querySelector(".page_box:last-child");

const RightIcon = document.querySelector(".iconRight");
const LeftIcon = document.querySelector(".iconLeft");

function slideRight() {
    const currentSlide = document.querySelector(`.${SHOWING_CLASS}`);
    const currentPageBox = document.querySelector(`.${SELECT_CLASS}`);
    if( currentSlide ){
        currentSlide.classList.remove(SHOWING_CLASS);
        currentPageBox.classList.remove(SELECT_CLASS);
        const nextSlide = currentSlide.nextElementSibling;
        const nextPageBox = currentPageBox.nextElementSibling;
        if( nextSlide ){
            nextSlide.classList.add(SHOWING_CLASS);
            nextPageBox.classList.add(SELECT_CLASS);
        } else {
            firstSlide.classList.add(SHOWING_CLASS);
            firstPageBox.classList.add(SELECT_CLASS);
        }
    } else {
        firstSlide.classList.add(SHOWING_CLASS);
        firstPageBox.classList.add(SELECT_CLASS);
    }
}

function slideLeft() {
    const currentSlide = document.querySelector(`.${SHOWING_CLASS}`);
    const currentPageBox = document.querySelector(`.${SELECT_CLASS}`);
    if( currentSlide ){
        currentSlide.classList.remove(SHOWING_CLASS);
        currentPageBox.classList.remove(SELECT_CLASS);
        const previousSlide = currentSlide.previousElementSibling;
        const previousPageBox = currentPageBox.previousElementSibling;
        if( previousSlide ){
            previousSlide.classList.add(SHOWING_CLASS);
            previousPageBox.classList.add(SELECT_CLASS);
        } else {
            lastSlide.classList.add(SHOWING_CLASS);
            lastPageBox.classList.add(SELECT_CLASS);
        }
    } else {
        lastSlide.classList.add(SHOWING_CLASS);
        lastPageBox.classList.add(SELECT_CLASS);
    }
}

RightIcon.addEventListener("click", function(){
    console.log("clicked");
    slideRight();
})

LeftIcon.addEventListener("click", function(){
    console.log("clicked");
    slideLeft();
})
