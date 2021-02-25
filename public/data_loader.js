import {
   _
} from "./util.js";

import {
   CarouselMaker
} from "./carousel.maker.js";

import {
   BannerImg
} from "./banner_img.js";

export class LoaderFromJson {
   constructor(url, requestInfo, value) {
      this.requestInfo = requestInfo;
      this.value = value;
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

      if (this.value === 'carousel') return new CarouselMaker(imgUrlArr);
      if (this.value === 'banner') return new BannerImg(imgUrlArr);
   }

   dataParsing(data) {
      if (data.length == undefined) data = [data];

      return data.map(el => {
         let title = el.text;
         let desc = el.text2;
         let imgurl = el.imgurl;
         if (title || desc || imgurl) {
            return [title, desc, imgurl];
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