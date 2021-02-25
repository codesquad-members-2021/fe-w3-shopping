import {
   _
} from "./util.js";

export class CarouselCtrl {
   constructor(prev, next, area, status) {
      this.prev = prev;
      this.next = next;
      this.area = area;
      this.init();
   }

   init() {
      let count = 1;
      let size = 485;
      this.area.style.transform = `translate(${-size*count}px)`;

      this.prev.addEventListener('click', () => {
         count--;
         this.area.style.transform = `translate(${-size*count}px)`;
         this.area.style.transition = 'transform 0.4s';
      });

      this.next.addEventListener('click', () => {
         count++;
         this.area.style.transform = `translate(${-size*count}px)`;
         this.area.style.transition = 'transform 0.4s';
      })

      this.area.addEventListener('transitionend', () => {
         let lastImg = _.$('#first_clone');
         let firstImg = _.$('#last_clone');

         if (this.area.childNodes[count] === lastImg) {
            count = 1;
            this.area.style.transform = `translate(${-size*count}px)`;
            this.area.style.transition = 'none';
         }
         if (this.area.childNodes[count] === firstImg) {
            count = this.area.childNodes.length - 2;
            this.area.style.transform = `translate(${-size*count}px)`;
            this.area.style.transition = 'none';
         };
      })
   }
}

//!메소드간의 연결성을 지우는 방법->현재는 promise로 설정해봤음->트랜지션이 구현안되는 에러(clearClass가 바로실행되지 않아야함).