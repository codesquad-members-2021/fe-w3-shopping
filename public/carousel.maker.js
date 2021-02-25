import {
   _
} from "./util.js";

export class CarouselMaker {
   constructor(imgurlArr) {
      this.init(imgurlArr)
   }

   insertToFirstCloneTpl(imgurlArr) {
      const slideDiv = document.createElement('div');
      slideDiv.className = 'slide_panel';
      slideDiv.id = 'last_clone';
      slideDiv.innerHTML =
         `<a href="#">
               <img src="${imgurlArr[0]}"></img>
            </a>`;
      const slideArea = _.$('.slide_second_position');
      slideArea.insertAdjacentElement('afterBegin', slideDiv);
   }

   insertToLastCloneTpl(imgurlArr) {
      const slideDiv = document.createElement('div');
      slideDiv.className = 'slide_panel';
      slideDiv.id = 'first_clone';
      slideDiv.innerHTML =
         `<a href="#">
               <img src="${imgurlArr[imgurlArr.length-1]}"></img>
            </a>`;
      const slideArea = _.$('.slide_second_position');
      slideArea.insertAdjacentElement('beforeEnd', slideDiv);
   }

   makeBasicTpl(imgurlArr) {
      const slideArea = _.$('.slide_second_position');
      for (let i = 0; i < imgurlArr.length; i++) {
         const slideDiv = document.createElement('div');
         slideDiv.className = 'slide_panel';
         slideDiv.innerHTML =
            `<a href="#">
               <img src="${imgurlArr[i]}"></img>
            </a>`
         slideArea.insertAdjacentElement('afterBegin', slideDiv);
      }
   }

   init(imgurlArr) {
      console.log(imgurlArr);
      new Promise(resolve => {
         resolve(this.makeBasicTpl(imgurlArr))
      }).then(() => {
         this.insertToFirstCloneTpl(imgurlArr)
         this.insertToLastCloneTpl(imgurlArr)
      });
   }
}