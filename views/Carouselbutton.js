const cursor = document.querySelector(".slider_box");
const SLIDER_BOX = ".slider_box"
const RIGHT_BUTTON = document.querySelector(".right_button");
const LEFT_BUTTON = document.querySelector(".left_button");
const CAROUSEL_RIGHT_IMG = "carousel_right_img";
const CAROUSEL_LEFT_IMG = "carousel_left_img";
const CHANGE_RIGHT = "right_button";
const CHANGE_LEFT = "left_button";
const RIGHT_BUTTON_CURSOR = "right_button_cursor";
const LEFT_BUTTON_CURSOR = "left_button_cursor";

cursor.addEventListener("mouseover", IN_CURSOR);
cursor.addEventListener("mouseout", OUT_CURSOR);

function IN_CURSOR() {
    RIGHT_BUTTON.classList.remove(CHANGE_RIGHT);
    RIGHT_BUTTON.classList.add(CAROUSEL_RIGHT_IMG);
    LEFT_BUTTON.classList.remove(CHANGE_LEFT);
    LEFT_BUTTON.classList.add(CAROUSEL_LEFT_IMG);
    RIGHT_BUTTON.addEventListener("mouseover", RIGHT_IN_BUTTON_CURSOR);
    LEFT_BUTTON.addEventListener("mouseover", LEFT_IN_BUTTON_CURSOR);
};

function OUT_CURSOR() {
    RIGHT_BUTTON.classList.add(CHANGE_RIGHT);
    RIGHT_BUTTON.classList.remove(CAROUSEL_RIGHT_IMG);
    LEFT_BUTTON.classList.add(CHANGE_LEFT);
    LEFT_BUTTON.classList.remove(CAROUSEL_LEFT_IMG);
    RIGHT_BUTTON.addEventListener("mouseout", OUT_BUTTON_CURSOR);
    LEFT_BUTTON.addEventListener("mouseout", OUT_BUTTON_CURSOR);
};

function RIGHT_IN_BUTTON_CURSOR() {
    RIGHT_BUTTON.classList.remove(CHANGE_RIGHT);
    RIGHT_BUTTON.classList.remove(CAROUSEL_RIGHT_IMG);
    RIGHT_BUTTON.classList.add(RIGHT_BUTTON_CURSOR);
};

function LEFT_IN_BUTTON_CURSOR() {
    LEFT_BUTTON.classList.remove(CHANGE_LEFT);
    LEFT_BUTTON.classList.remove(CAROUSEL_LEFT_IMG);
    LEFT_BUTTON.classList.add(LEFT_BUTTON_CURSOR);
}

function OUT_BUTTON_CURSOR() {
    LEFT_BUTTON.classList.remove(LEFT_BUTTON_CURSOR);
    RIGHT_BUTTON.classList.remove(RIGHT_BUTTON_CURSOR);
};


