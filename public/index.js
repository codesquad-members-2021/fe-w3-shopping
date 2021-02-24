import {
   _
} from "./util.js";

class CarouselMaker {
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

class LoaderFromJson {
   constructor(url, requestInfo) {
      requestInfo;
      this.init(url);
   }

   populateSlideDiv(parsedData) {
      console.log(parsedData)
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
      console.log(requestInfo)
      fetch(link)
         .then((response) => {
            return response.json();
         }).then((json) => {
            return this.dataParsing(json[requestInfo]);
         }).then((result) => {
            this.populateSlideDiv(result);
         })
   }
}

const requestUrl = 'https://shoppinghow.kakao.com/v1.0/shophow/top/planningEvent.json?_=1614126791478';
const requestInfo = 'mileageList';
const carouselImg = new LoaderFromJson(requestUrl, requestInfo);

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