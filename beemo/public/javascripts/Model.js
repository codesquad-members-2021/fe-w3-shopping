import fetch from 'cross-fetch';

class Model {
  constructor({ url }) {
    this.url = url;
  }

  getResponseData() {
    return fetch(this.url)
      .then((response) => response.json());
  }

  getEventImgUrl() {
    return this.getResponseData()
      .then((data) => data.event.imgurl);
  }

  getMileageImgUrlList() {
    return this.getResponseData()
      .then((data) => data.mileageList.map(item => item.imgurl));
  }

  getMallEventList() {
    return this.getResponseData()
      .then((data) => data.mallEventList.map(data => {
        const { imgurl, text, text2 } = data
        return { imgurl, text, text2 };
      }));
  }
}

const url = 'https://shoppinghow.kakao.com/v1.0/shophow/top/planningEvent.json?_=1614072773662';
const model = new Model({ url });

// console.log(model.getResponseData())
// console.log(model.getEventImgUrl())
// console.log(model.getMileageImgUrlList().then(e => console.log(e)))
// console.log(model.getMallEventList())

export default Model;