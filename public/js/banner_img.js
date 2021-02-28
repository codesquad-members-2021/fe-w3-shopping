import {
   _
} from "./util.js";

export class BannerImgMaker {
   constructor(arr) {
      this.imgUrl = arr;
      this.area = _.$('.banner_area a img');
      this.paste();
   }

   paste() {
      this.area.setAttribute('src', this.imgUrl);
   }
}