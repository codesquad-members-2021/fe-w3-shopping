import CarouselUI from "./carouselUI";

const carouselUI = new CarouselUI();
carouselUI.insertDOM();

const leftBtn = document.querySelector('.carouselUI--leftBtn');
const rightBtn = document.querySelector('.carouselUI--rightBtn');
const ui = document.querySelectorAll('.carouselUI--img');
let x = -485;
// 1번째 페이지 보이기 위한 translate3d값 설정
ui.forEach(v => v.style.transform = `translate3d(${x}px,0,0)`);

leftBtn.addEventListener('click', function () {
    if (x == -1455) {
        setTimeout(function () {
            x = -485;
            ui.forEach(v => v.style.transition = "0ms");
            ui.forEach(v => v.style.transform = `translate3d(${x}px,0,0)`);
        }, 300)
    }
    x -= 485;
    ui.forEach(v => v.style.transition = "300ms");
    ui.forEach(v => v.style.transform = `translate3d(${x}px,0,0)`);
});

rightBtn.addEventListener('click', function () {
    if (x == -485) {
        setTimeout(function () {
            x = -1455;
            ui.forEach(v => v.style.transition = "0ms");
            ui.forEach(v => v.style.transform = `translate3d(${x}px,0,0)`);
        }, 300)
    }
    x += 485;
    ui.forEach(v => v.style.transition = "300ms");
    ui.forEach(v => v.style.transform = `translate3d(${x}px,0,0)`);
});




/* 개선 사항
1. 각 el를 잡지않고 똑같은 클래스의 querySelectorAll로 한번에 속성 부여
 (querySelectorAll은 유사배열이라 인덱스별로 지정을 해줘야 한다!!)
2. 슬라이더 구조를 3 / 1,2,3 / 1 로 앞뒤에 페이지를 추가해놓는다.
=> 마지막 페이지에서 다시 처음 or 마지막으로 가는 무빙을 취할 시, transition이 일어나고
=> 그 뒤에 setTimeout을 통해 x값을 변경해준다.
*/