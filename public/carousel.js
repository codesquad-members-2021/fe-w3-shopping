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

   moveRight() {

   }
   moveLeft() {
      this.area.classList.add('moveLeft');
   }

   init() {
      this.prev.addEventListener('click', this.moveRight);
      this.next.addEventListener('click', this.moveLeft);
   }
}