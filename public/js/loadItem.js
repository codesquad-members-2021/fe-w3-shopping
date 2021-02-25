export class LoadItem {
  #planningEventJSON = 'planningEvent.json';
  #homeContentsJSON = 'homeContents.json';

  constructor() {
    this.host = 'http://localhost';
    this.port = 3000;
    this.path = 'data';
  }

  showImgContents() {
    fetch(`${this.host}:${this.port}/${this.path}/${this.#planningEventJSON}`)
      .then((response) => response.json())
      .then((json) => {
        const urls = this.getSlideImgURL(json);
        this.insertSlideTemplate(urls);
      })
      .catch((error) => console.log('에러입니다', error));
  }

  getSlideImgURL(json) {
    return json.mileageList.map((list) => list.imgurl);
  }

  insertSlideTemplate(urls) {
    const mainTopSlideSection = document.querySelector('.main-top-slide-imgs');
    urls.forEach((url, idx) => {
      mainTopSlideSection.insertAdjacentHTML(
        'beforeend',
        `
      <a class="slide-img" href="#">
      <img src="${url}" alt="main-top-${idx}" />
    </a>
    `
      );
    });
  }
}
