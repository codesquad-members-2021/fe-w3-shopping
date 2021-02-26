import { createEvtCardListElFrom } from './common-creator.js';

export class EvtCardTable {
  constructor({ target, jsonList, columnCnt }) {
    this.$target = target;
    this.$seeMoreBtn;
    this.jsonList = jsonList;
    this.columnCnt = columnCnt;
    this.nextJsonIdxToLoad = 0;
  }

  init() {
    this.initSeeMoreBtn();
    this.addEvtCardList(this.columnCnt);
    this.onEvents();
  }

  addEvtCardList(itemCnt) {
    const $evtCardList = createEvtCardListElFrom(this.jsonList.slice(this.nextJsonIdxToLoad, this.nextJsonIdxToLoad + itemCnt));
    this.$target.insertBefore($evtCardList, this.$seeMoreBtn);
    this.nextJsonIdxToLoad += itemCnt;

    if (this.nextJsonIdxToLoad >= this.jsonList.length)
      this.$seeMoreBtn.hidden = true;

    const hilightTxt = this.$seeMoreBtn.querySelector('.hilight-txt');
    hilightTxt.innerText = `${Number(hilightTxt.innerText) + itemCnt}`;
  }

  initSeeMoreBtn() {
    this.$seeMoreBtn = document.createElement('DIV');
    this.$seeMoreBtn.classList.add('evt-card-table__see-more-btn');
    this.$seeMoreBtn.innerHTML =
      `<span class="main-txt">더보기
      <span>&#40;</span>
      <span class="hilight-txt">0</span>
      <span>&#47;&#160;${this.jsonList.length}건&#41;</span>
      </span>`
    this.$target.appendChild(this.$seeMoreBtn);
  }

  onEvents() {
    this.$seeMoreBtn.addEventListener('click', () => {
      console.log('clk!');
      this.addEvtCardList(this.columnCnt - 1);
    });
  }
}