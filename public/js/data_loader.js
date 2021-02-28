import {
   _
} from "./util.js";

import {
   CarouselMaker
} from "./carousel.maker.js";

import {
   BannerImgMaker
} from "./banner_img.js";
import {
   ViewMoreManager
} from "./view_more_manager.js";

export class LoaderFromJson {
   constructor(url, requestInfo, value) {
      this.requestInfo = requestInfo;
      this.value = value;
      this.title;
      this.desc;
      this.imgurl;
      this.init(url);
   }

   populateDiv(parsedData) {
      let titleArr = [];
      let descArr = [];
      let imgUrlArr = [];

      parsedData.forEach(el => {
         let [title, desc, imgurl] = el;
         if (title) titleArr.push(title);
         if (desc) descArr.push(desc);
         if (imgurl) imgUrlArr.push(imgurl);
      })

      if (this.value === 'carousel') return new CarouselMaker(null, null, imgUrlArr, this.value);
      if (this.value === 'banner') return new BannerImgMaker(imgUrlArr);
      if (this.value === 'view_more' || this.value === 'view_more_basic') return new ViewMoreManager(titleArr, descArr, imgUrlArr, this.value);
      if (this.value === 'carousel_hot') return new CarouselMaker(titleArr, descArr, imgUrlArr, this.value);
   }

   dataParsing(data) {
      if (data.length == undefined) data = [data];

      return data.map(el => {
         if (el.eventContent) {
            el = el.eventContent;
            this.title = el.title;
            this.desc = el.subtitle;
            this.imgurl = el.imgurl;
         } else {
            this.title = el.text;
            this.desc = el.text2;
            this.imgurl = el.imgurl;
         }

         if (this.title || this.desc || this.imgurl) {
            return [this.title, this.desc, this.imgurl];
         }
      })
   }

   init(url) {

      fetch(url)
         .then((response) => {
            return response.json();
         }).then((json) => {
            return this.dataParsing(json[this.requestInfo]);
         }).then((result) => {
            this.populateDiv(result);
         })
   }
}


//*XMLHttpRequest
// let requestURL = 'https://shoppinghow.kakao.com/v1.0/shophow/top/planningEvent.json?_=1614126791478';
// let request = new XMLHttpRequest();
// request.open('GET', requestURL);
// request.responseType = 'json';
// request.send();
// request.onload = function () {
//    let mallEventjson = request.response;
//    dataParsing(mallEventjson.mallEventList);
// }