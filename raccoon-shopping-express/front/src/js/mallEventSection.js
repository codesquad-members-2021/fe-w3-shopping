export default class MallEventSection {
  constructor(data) {
    this.data = data;
    this.slide = document.querySelector('#mallEventSlide');
    this.count = 0;
  }

  getMallEventPanel() {
    const ITEM_BOX = 5;
    let listItems = ``;
    for (let i = 0; i < ITEM_BOX; i++) {
      listItems += this.getMallEventItem(this.data[this.count]);
      this.count++;
    }
    let panel = this.slide.insertAdjacentHTML(
      'beforeend',
      `
    <div class="panel" aria-hidden="true">
      <ul class="list--item">
      ${listItems}
      </ul>
    </div>
    `
    );
    return panel;
  }
  getMallEventItem(list) {
    const { dataseq, imgurl, text, text2, linkurl } = list;

    return `
    <li class=${dataseq}>
    <a href=${linkurl} class="link--product"
      ><span class="info--thumb"
        ><img
          src=${imgurl}
          width="200"
          height="200"
          class="imgage--top"
          alt=${text} /></span
      ><strong class="info--title">${text}</strong><span class="info--txt">${text2}</span
      ><span class="ico--background2 ico--theme">테마</span></a
    >
  </li>
    `;
  }
}
