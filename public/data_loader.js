import {
   _
} from "./util.js";

import {
   CarouselMaker
} from "./carousel.js";



export class LoaderFromJson {
   constructor(url, requestInfo) {
      this.requestInfo = requestInfo;
      this.init(url);
   }

   populateSlideDiv(parsedData) {
      parsedData.forEach(el => {
         let [title, desc, imgurl] = el;
         if (imgurl) new CarouselMaker(imgurl);
      })
   }

   dataParsing(data) {
      return data.map(el => {
         let title = el.text;
         let desc = el.text2;
         let imgurl = el.imgurl;
         if (title || desc || imgurl) {
            return [title, desc, imgurl];
         }
      })
   }

   init(link) {
      fetch(link)
         .then((response) => {
            return response.json();
         }).then((json) => {
            return this.dataParsing(json[this.requestInfo]);
         }).then((result) => {
            this.populateSlideDiv(result);
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