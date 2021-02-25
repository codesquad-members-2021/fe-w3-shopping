import { _ } from './util.js'

//////////////////////////////////////////////////
const slideWrapper = _.$('.slide--wrapper')
const leftButton = _.$('.left-button')
const rightButton = _.$('.right-button')

console.log(slideWrapper)

_.E(leftButton, 'click', () => {
    slideWrapper.style.transform = 'translate3d(484px,0,0)'
    slideWrapper.style.transition = '300ms'
    //대충 이다음에 .then으로 순서 돌려놓고 렌더링
    //그다음에 translate3d(000)때리기
})
_.E(rightButton, 'click', () => {
    slideWrapper.style.transform = 'translate3d(-484px,0,0)'
    slideWrapper.style.transition = '300ms'
})
///////////////////////////////////////////////////

class Slide {
    constructor(wrapper, leftButton, rightButton, items = _.$A('.slide--item')) {
        //main.js에서 준 dom을 붙이자
        //slide--item 1 2 3을 받아서 인덱스 기록 필요
        //안쪽 이미지는 나중에 fetch로 따로 붙일테니 여기서 고려 ㄴㄴ
        this.content = [...items]//spread operator iterable한 애들만 됐었나?
    }
    currentIndex; //내가 현재 보고있는 아이템 인덱스
    // <--->버튼에서 불들어올 '-' 정하는데 쓰일 속성


    render() {
        //바뀐 content 순서대로 다시 렌더링
    }

    slideRight() {
        //위에 이벤트 진행. 후에 .then
        //[0,1,2] -> [1,2,0]
        //temp = 0 /innerHTML 0=1 / 1=2 / 2=temp
        //this.render()
        //.style.transform = tr(000)
    }

    slideLeft() {

    }
}