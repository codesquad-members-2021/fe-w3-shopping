import { _ } from './util.js';
import { createMainEvtCardElFrom } from './common-creator.js';

// class ISlide {
  // constructor($target) {
    // this.$target = $target;
    // [this.$pages, this.$pageCtrl] = _.$All('div', $target);
  // }

  // createSlideElFrom(json) { throw new Error('Abstract method!'); }

  // appendSlideElsToTarget() { throw new Error('Abstract method!'); }
// }

/*
  COMMENT:
    Later, the codes for 'PageCtrl*' maybe seperated from this.
*/

export class MainEvtSlide {
  constructor($target, jsonList) {
    this.$target = $target;
    [this.$pages, this.$pageCtrl] = $target.children;
    this.jsonList = jsonList;
    this.currSelectedIdx = 0;
  }

  init() {
    this.initPageEls();
    this.initPageCtrl();
    this.onEvents();
  }

  initPageEls() {
    this.jsonList.forEach(json => this.$pages.appendChild(this.createPageElFrom(json)));
  }

  initPageCtrl() {
    for (let i = 0; i < this.jsonList.length; i++)
      this.$pageCtrl.appendChild(this.createPageCtrlIdxBtn(i));

    this.$pageCtrl.appendChild(this.createPageCtrlLeftBtn());
    this.$pageCtrl.appendChild(this.createPageCtrlRightBtn());
    this.$pageCtrl.children[0].classList.add('select');
  }

  createPageElFrom(json) {
    const $page = createMainEvtCardElFrom(json);
    $page.classList.add('page');
    return $page;
  }

  createPageCtrlIdxBtn(idx) {
    return _.genEl('DIV', {
        classNames: ['slide__page-ctrl__idx-btn'],
        template: `<div class="page-ctrl__idx-btn__bar"></div>`,
        attributes: {
          'data-index': idx,
        },
    });
  }

  createPageCtrlLeftBtn() {
    return _.genEl('BUTTON', {
      classNames: ['slide__page-ctrl__left-btn'],
      template:  `<div class="page-ctrl__left-btn__icon"></div>`,
    });
  }

  createPageCtrlRightBtn() {
    return _.genEl('BUTTON', {
      classNames: ['slide__page-ctrl__right-btn'],
      template: `<div class="page-ctrl__right-btn__icon"></div>`,
    });
  }

  select(idx) {
    if (this.currSelectedIdx === idx) 
      return;

    this.$pageCtrl.children[this.currSelectedIdx].classList.remove('select');
    this.$pageCtrl.children[idx].classList.add('select');
    
    for (let idxDiff = idx - this.currSelectedIdx; idxDiff > 0; idxDiff--)
      this.$pages.appendChild(this.$pages.firstElementChild);
    
    for (let idxDiff = idx - this.currSelectedIdx; idxDiff < 0; idxDiff++)
      this.$pages.insertBefore(this.$pages.lastElementChild, this.$pages.firstElementChild);

    this.currSelectedIdx = idx;
  }

  onEvents() {
    this.$pages.addEventListener('transitionend', () => {
      if (this.$pages.classList.contains('move-to-left')) {
        this.select((this.currSelectedIdx + this.jsonList.length - 1) % this.jsonList.length);
        this.$pages.classList.remove('move-to-left');
      } else if (this.$pages.classList.contains('move-to-right')) {
        this.select((this.currSelectedIdx + this.jsonList.length + 1) % this.jsonList.length);
        this.$pages.classList.remove('move-to-right');
      }
    });

    this.$pageCtrl.addEventListener('mouseover', ({target}) => {
      if (!target.classList.contains('slide__page-ctrl__idx-btn'))
        return;

      this.select(target.dataset.index);
      // TODO: arrow button hover effect
    });

    _.$('.slide__page-ctrl__left-btn', this.$pageCtrl).addEventListener('click', () => {
      this.$pages.classList.add('move-to-left');
    });

    _.$('.slide__page-ctrl__right-btn', this.$pageCtrl).addEventListener('click', () => {
      this.$pages.classList.add('move-to-right');
    });
  }
}

import { HotdealEvtCardListItem } from './list-item.js';

export class HotdealEvtSlide {
  constructor({ target, jsonList, itemCnt }) {
    this.$target = target;
    [this.$cardListCont, this.$cardCtrl] = target.children;
    this.$cardList;
    this.jsonList = jsonList;
    this.itemCnt = itemCnt;
  }

  init() {
    _.$('.slide__card-list-cont', this.$target).classList.add(`item-cnt-${this.itemCnt}`);
    this.initCardList();
    this.initCardCtrl();
    this.onEvents();
  }

  initCardList() {
    const $cardList = _.genEl('UL', {
      classNames: ['evt-card-list', `item-cnt-${this.itemCnt}`],//, `total-item-cnt-${this.jsonList.length}`],
    });

    this.jsonList.forEach(json => {
      const cardListItem = new HotdealEvtCardListItem(json);
      $cardList.appendChild(cardListItem.element());
    });

    this.$cardList = $cardList;
    this.$cardListCont.appendChild($cardList);
  }

  initCardCtrl() {
    const $leftBtn = _.genEl('BUTTON', {
      classNames: ['card-ctrl__left-btn'],
    });

    const $rightBtn = _.genEl('BUTTON', {
      classNames: ['card-ctrl__right-btn'],
    });

    this.$cardCtrl.appendChild($leftBtn);
    this.$cardCtrl.appendChild($rightBtn);
  }

  onEvents() {
    this.$target.addEventListener('transitionend', ({ target }) => {
      if (target.classList.contains('move-to-left')) {
        this.$cardList.classList.remove('move-to-left');
        this.$cardList.insertBefore(this.$cardList.lastElementChild, this.$cardList.firstElementChild);
      } else if(target.classList.contains('move-to-right')) {
        this.$cardList.classList.remove('move-to-right');
        this.$cardList.appendChild(this.$cardList.firstElementChild);
      }
    });

    _.$('.card-ctrl__left-btn', this.$cardCtrl).addEventListener('click', () => {
      this.$cardList.classList.add('move-to-left');
    }, true);

    _.$('.card-ctrl__right-btn', this.$cardCtrl).addEventListener('click', () => {
      this.$cardList.classList.add('move-to-right');
    }, true);
  }
}