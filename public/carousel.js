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
   constructor(prev, next, area) {
      this.prev = prev;
      this.next = next;
      this.area = area;
      this.init();
   }

   classClear() {
      if (this.area.classList.contains("moveLeft")) this.area.classList.remove('moveLeft');
      if (this.area.classList.contains("moveRight")) this.area.classList.remove('moveRight');
   }

   moveChildToFirst() {
      let firstDiv = _.$All('.slide_panel')[0];
      let lastDiv = _.$All('.slide_panel')[2];
      this.area.insertBefore(lastDiv, firstDiv)
      this.classClear()
   }

   moveChildToLast() {
      let firstDiv = _.$All('.slide_panel')[0];
      this.area.insertBefore(firstDiv, null)
      this.classClear()
   }

   moveRight() {
      this.area.classList.add('moveRight');
      this.moveChildToLast();
   }

   moveLeft() {
      console.log('파라미터가 아닌, 여기서 바로 this.area를 가져오면 왜 undefined였을까?')
      this.area.classList.add('moveLeft');
      this.moveChildToLast()
   }


   init() {
      this.prev.addEventListener('click', () => this.moveRight(this.area));
      this.next.addEventListener('click', () => this.moveLeft(this.area));
   }
}