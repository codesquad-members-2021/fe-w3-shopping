import {
   _
} from "./util.js";

export class ViewMoreManager {
   constructor(titleArr, descArr, imgUrlArr, value) {
      this.title = titleArr;
      this.desc = descArr;
      this.img = imgUrlArr;
      this.value = value;
      this.range;
      this.init();
   }

   makeTpl() {
      for (let i = 0; i < this.range; i++) {
         const viewMoreLi = document.createElement('li');
         viewMoreLi.className = "panel_list";
         viewMoreLi.innerHTML =
            `
         <a href="#">
            <img src="${this.img[i]}"></img>
            <p>${this.title[i]}</p>
            <span>${this.desc[i]}</span>
            <span class="theme_icon">테마</span>
         </a>
         `
         const viewMoreArea = _.$('.evt_list ul');
         viewMoreArea.insertAdjacentElement('beforeEnd', viewMoreLi);
      }
   }

   init() {
      (this.value === 'view_more_basic') ? this.range = 5: this.range = this.img.length;
      this.makeTpl();
   }





}