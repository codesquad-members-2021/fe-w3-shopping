import {
   _
} from "./util.js";

export class CarouselCtrl {
   constructor(prev, next, area, value) {
      this.prev = prev;
      this.next = next;
      this.area = area;
      this.value = value;
      this.size;
      this.speed = 0.4;
      this.init();
   }

   play() {
      let count = 1;
      this.area.style.transform = `translate(${-this.size*count}px)`;

      this.prev.addEventListener('click', () => {
         count--;
         this.area.style.transform = `translate(${-this.size*count}px)`;
         this.area.style.transition = `transform ${this.speed}s`;
      });

      this.next.addEventListener('click', () => {
         count++;
         this.area.style.transform = `translate(${-this.size*count}px)`;
         this.area.style.transition = `transform ${this.speed}s`;
      })

      this.area.addEventListener('transitionend', () => {
         let lastImg = _.$(`#first_clone_${this.value}`);
         let firstImg = _.$(`#last_clone_${this.value}`);
         if (this.area.children[count] === lastImg) {
            count = 1;
            this.area.style.transform = `translate(${-this.size*count}px)`;
            this.area.style.transition = 'none';
         }

         if (this.area.children[count] === firstImg) {
            count = this.area.children.length - 2;
            this.area.style.transform = `translate(${-this.size*count}px)`;
            this.area.style.transition = 'none';
         };
      })
   }

   init() {
      (this.value === 'carousel') ? this.size = 485: this.size = 1433;
      this.play();
   }
}