import {
   _
} from "./util.js";

export class CarouselMaker {
   constructor(imgurl) {
      this.makeBasicTpl(imgurl);
   }

   makeBasicTpl(imgurl) {
      const slideDiv = document.createElement('div');
      slideDiv.className = 'slide_panel';
      slideDiv.innerHTML =
         `<a href="#">
            <img src="${imgurl}"></img>
         </a>`
      const slideArea = _.$('.slide');
      slideArea.insertAdjacentElement('afterBegin', slideDiv);
   }
}

export class CarouselCtrl {
   constructor(prev, next, area, status) {
      this.prev = prev;
      this.next = next;
      this.area = area;
      this.status = status;
      this.init();
   }

   classCheck() {
      if (this.area.classList.contains("moveLeft")) this.area.classList.replace('moveLeft');
      if (this.area.classList.contains("moveRight")) this.area.classList.remove('moveRight');
   }

   moveChildToFirst() {
      let firstDiv = _.$All('.slide_panel')[0];
      let lastDiv = _.$All('.slide_panel')[2];
      this.area.insertBefore(lastDiv, firstDiv)
   }

   moveChildToLast() {
      let firstDiv = _.$All('.slide_panel')[0];
      this.area.insertBefore(firstDiv, null)
   }

   moveRight() {
      this.area.classList.add('moveRight');
      // this.moveChildToLast();
   }

   moveLeft() {
      if (this.area.classList.contains("moveRight")) this.area.classList.replace('moveLeft')
      else this.area.classList.add('moveLeft');
      this.moveChildToLast();
      //!console.log('파라미터가 아닌, 여기서 바로 this.area를 가져오면 왜 undefined였을까?')
   }

   init() {
      this.prev.addEventListener('click', () => this.moveRight(this.area));
      this.next.addEventListener('click', () => this.moveLeft(this.area));

      // this.next.addEventListener('click', () => {
      //    new Promise(resolve => {
      //       resolve(this.moveLeft(this.area))
      //    }).then(() => this.moveChildToFirst(this.area))
      // })
   }
}

//!메소드간의 연결성을 지우는 방법->현재는 promise로 설정해봤음->트랜지션이 구현안되는 에러(clearClass가 바로실행되지 않아야함).