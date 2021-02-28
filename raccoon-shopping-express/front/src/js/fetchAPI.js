import HotDealSection from './hotDealSection';
import MileageEventCarousel from './mileageEventCarousel';
import MallEventSection from './mallEventSection';

export default class FetchAPI {
  constructor() {
    this.url = {
      mileageList: 'http://localhost:3000/api/mileageList',
      mallEventList: 'http://localhost:3000/api/mallEventList',
      hotDealList: 'http://localhost:3000/api/hotDealList',
      shoppingPartner: 'http://localhost:3000/api/shoppingPartner',
    };
    this.req = {
      sucess: 'Request successful',
      failed: 'Request failed',
    };
    this.page = 2;
    this.dataLength = 0;
  }

  mileageList = () =>
    fetch(this.url.mileageList)
      .then((response) => response.json())
      .then((data) => {
        const mileageEventCarousel = new MileageEventCarousel(data);
        mileageEventCarousel.setMileageEventContents();
        return data;
      })
      .then((status) => console.log(this.req.sucess, status.code))
      .catch((error) => console.log(this.req.failed, error));

  mallEventList = () =>
    fetch(this.url.mallEventList)
      .then((response) => response.json())
      .then((data) => {
        const mallEventSection = new MallEventSection(data.mallEventList);
        mallEventSection.getMallEventPanel();
        mallEventSection.getMallEventPanel();
        mallEventSection.getMallEventPanel();
        return data;
      })
      .then((status) => console.log(this.req.sucess, status.code))
      .catch((error) => console.log(this.req.failed, error));

  hotDealList = (start, count) => {
    const param = { start: start, count: count };
    const queryParam = new URLSearchParams(param);
    fetch(`${this.url.hotDealList}/?${queryParam.toString()}`)
      .then((response) => response.json())
      .then((data) => {
        const hotDealSection = new HotDealSection(data);
        if (this.page === 2) {
          this.page++;
          hotDealSection.draw();
          return data;
        }
        this.page++;
        hotDealSection.moreListDraw();
        hotDealSection.updateMoreListNumber(10, this.dataLength);
        return data;
      })
      .then((status) => console.log(this.req.sucess, status.code))
      .catch((error) => console.log(this.req.failed, error));
  };
}
