const LEFTBTN = document.querySelector("#left2");
const RIGHTBTN = document.querySelector("#right2");

const first2Slide = document.querySelector(".slider2__item:first-child");
const second2Slide = first2Slide.nextElementSibling;
const thrid2Slide = second2Slide.nextElementSibling;
console.log(first2Slide)
RIGHTBTN.addEventListener("click", function () {
    first2Slide.classList.add("slider_active");
    second2Slide.classList.add("slider_active");
    thrid2Slide.classList.add("slider_active");
    console.log("active")
})  