import CarouselUI from "./carouselUI";

const carouselUI = new CarouselUI();
carouselUI.insertDOM();

const testFn = () => {
    const leftBtn = document.querySelector('.carouselUI--leftBtn');
    const rightBtn = document.querySelector('.carouselUI--rightBtn');
    const el1 = document.querySelector(`#img1`);
    const el2 = document.querySelector(`#img2`);
    const el3 = document.querySelector(`#img3`);
    let x = 0;

    leftBtn.addEventListener('click', function () {
        x -= 485;
        el1.style.transform = `translate3d(${x}px,0px,0px)`;
        el2.style.transform = `translate3d(${x}px,0px,0px)`;
        el3.style.transform = `translate3d(${x}px,0px,0px)`;
        if (x == -970) { x = 485 }
    });
    rightBtn.addEventListener('click', function () {
        if (x == 970) { x = -485 }
        x += 485;
        el1.style.transform = `translate3d(${x}px,0px,0px)`;
        el2.style.transform = `translate3d(${x}px,0px,0px)`;
        el3.style.transform = `translate3d(${x}px,0px,0px)`;
    });
}

testFn();