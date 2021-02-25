import {
   _
} from "./util.js";

export class CarouselMaker {
   constructor(imgurl) {
      this.init(imgurl)
   }

   insertToFirstCloneTpl(imgurl) {

      const slideDiv = document.createElement('div');
      slideDiv.className = 'slide_panel';
      slideDiv.id = 'last_clone';
      slideDiv.innerHTML =
         `<a href="#">
               <img src="${imgurl[0]}"></img>
            </a>`;
      const slideArea = _.$('.slide_second_position');
      slideArea.insertAdjacentElement('afterBegin', slideDiv);
   }

   insertToLastCloneTpl(imgurl) {
      const slideDiv = document.createElement('div');
      slideDiv.className = 'slide_panel';
      slideDiv.id = 'first_clone';
      slideDiv.innerHTML =
         `<a href="#">
               <img src="${imgurl[imgurl.length-1]}"></img>
            </a>`;
      const slideArea = _.$('.slide_second_position');
      slideArea.insertAdjacentElement('beforeEnd', slideDiv);
   }

   makeBasicTpl(imgurl) {
      const slideArea = _.$('.slide_second_position');
      for (let i = 0; i < imgurl.length; i++) {
         const slideDiv = document.createElement('div');
         slideDiv.className = 'slide_panel';
         if (i === 1) slideDiv.classList.add('visible');
         slideDiv.innerHTML =
            `<a href="#">
               <img src="${imgurl[i]}"></img>
            </a>`
         slideArea.insertAdjacentElement('afterBegin', slideDiv);
      }
   }

   init(imgurl) {
      console.log(imgurl)
      new Promise(resolve => {
         resolve(this.makeBasicTpl(imgurl))
      }).then(() => {
         this.insertToFirstCloneTpl(imgurl)
         this.insertToLastCloneTpl(imgurl)
      });
   }
}

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

         console.log(count, this.area.childNodes, lastImg)
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