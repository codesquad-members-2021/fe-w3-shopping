import EventSlider from './eventSlider';

export default class MileageEventCarousel extends EventSlider {
  constructor(data) {
    super();
    this.data = data;
  }
  setMileageEventContents() {
    this.slide.insertAdjacentHTML('afterbegin', this.getMileageEventContents());
  }
  getMileageEventContents() {
    const imgurlArr = this.data.mileageList.map((el) => el.imgurl);
    const linkurlArr = this.data.mileageList.map((el) => el.linkurl);

    let panelDiv = ``;
    for (let i = 0; i < imgurlArr.length; i++) {
      panelDiv += `
      <div class="panel">
      <a href="${linkurlArr[i]}" class="link--event"
        ><img src="${imgurlArr[i]}" width="485" height="340" class="img_g" alt=""
      /></a>
      </div>`;
    }
    return panelDiv;
  }
}
