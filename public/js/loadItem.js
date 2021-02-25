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
        const slideURL = this.getSlideImgURL(json);
        const eventProducts = this.getEventProductList(json);
        this.insertSlideTemplate(slideURL);
        this.insertSecondLineTemplate(eventProducts);
      })
      .catch((error) => console.log('에러입니다', error));
  }

  getSlideImgURL(json) {
    return json.mileageList.map((list) => list.imgurl);
  }

  getEventProductList(json) {
    return json.mallEventList.map((list) => list);
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

  insertSecondLineTemplate(eventProducts) {
    const mainTopSecondLine = document.querySelector(
      '.main-top-article-secondline'
    );

    for (let i = 0; i < 5; i += 1) {
      mainTopSecondLine.insertAdjacentHTML(
        'beforeend',
        `<li class="main-top-article-sec-imgs">
      <a class="main-top-sec-img" href="#"
        ><img src="${eventProducts[i].imgurl}" alt="${eventProducts[i].dataseq}"
      /></a>
      <div class="main-top-article-description">
        <h6>${eventProducts[i].text}</h6>
        <p>${eventProducts[i].text2}</p>
      </div>
    </li>`
      );
    }
  }
}
