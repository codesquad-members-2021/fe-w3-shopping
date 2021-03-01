import HotDealSection from './hotDealSection';
import MileageEventCarousel from './mileageEventCarousel';
import MallEventSection from './mallEventSection';
import { PAGE } from '../../main';

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
  }

  getMileageList = () =>
    fetch(this.url.mileageList)
      .then((response) => response.json())
      .then((data) => {
        const mileageEventCarousel = new MileageEventCarousel(data);
        mileageEventCarousel.setMileageEventContents();
        return data;
      })
      .then((status) => console.log(this.req.sucess, status.code))
      .catch((error) => console.log(this.req.failed, error));

  getMallEventList = () =>
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

  getHotDealList = (start, count) => {
    const param = { start: start, count: count };
    const queryParam = new URLSearchParams(param);
    fetch(`${this.url.hotDealList}/?${queryParam.toString()}`)
      .then((response) => response.json())
      .then((data) => {
        const hotDealSection = new HotDealSection(data.list);
        if (this.page === PAGE + 1) {
          hotDealSection.draw();
          hotDealSection.updateMoreListNumber(count, data.dataLength);
          return data.list;
        }
        hotDealSection.drawExtraList();
        hotDealSection.updateMoreListNumber(count, data.dataLength);
        return data.list;
      })
      .then((status) => console.log(this.req.sucess, status.code))
      .catch((error) => console.log(this.req.failed, error));
  };
}
