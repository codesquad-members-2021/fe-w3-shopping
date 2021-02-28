import { _ } from './util.js';
import { EvtCardListItem } from './list-item.js';

class ITable {
  constructor(target, columnCnt) {
    this.$target = target;
    this.columnCnt = columnCnt;
  }

  addRow(itemCnt = this.columnCnt) { throw new Error('Abstact method!'); }
}

export class EvtCardTable extends ITable {
  constructor({ target, jsonList, columnCnt }) {
    super(target, columnCnt);
    this.$seeMoreBtn;
    this.jsonList = jsonList;
    this.nextJsonIdxToLoad = 0;
  }

  init() {
    this.initSeeMoreBtn();
    this.addRow();
    this.onEvents();
  }

  initSeeMoreBtn() {
    this.$seeMoreBtn = _.genEl('DIV', {
      classNames: ['evt-card-table__see-more-btn'],
      template:
        `<span class="main-txt">더보기
          <span>&#40;</span>
          <span class="hilight-txt">${this.columnCnt}</span>
          <span>&#47;&#160;${this.jsonList.length}건&#41;</span>
        </span>`,
    });
    
    this.$target.appendChild(this.$seeMoreBtn);
  }

  addRow(itemCnt = this.columnCnt) {
    const $ul = _.genEl('UL', {
      classNames: ['evt-card-list', `item-cnt-${itemCnt}`]
    });

    this.jsonList
        .slice(this.nextJsonIdxToLoad, this.nextJsonIdxToLoad + itemCnt)
        .forEach(json => {
          const evtCardLi = new EvtCardListItem(json);
          $ul.appendChild(evtCardLi.element());
        });

    this.$target.insertBefore($ul, this.$seeMoreBtn);
    this.nextJsonIdxToLoad += itemCnt;
  }

  onEvents() {
    this.$seeMoreBtn.addEventListener('click', this.onClickSeeMorebtn.bind(this));
  }

  onClickSeeMorebtn() {
    const itemCnt = this.columnCnt - 1;
    this.addRow(itemCnt);

    if (this.nextJsonIdxToLoad >= this.jsonList.length)
      this.$seeMoreBtn.hidden = true;
    
    const hilightTxt = _.$('.hilight-txt', this.$seeMoreBtn);
    hilightTxt.innerText = `${Number(hilightTxt.innerText) + itemCnt}`;
  }
}