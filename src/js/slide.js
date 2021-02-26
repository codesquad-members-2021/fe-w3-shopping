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
    this.appendPageEls();
    this.appendPageCtrl();
    this.$pageCtrl.children[0].classList.add('select');
    this.onEvents();
  }

  appendPageEls() {
    this.jsonList.forEach(json => this.$pages.appendChild(this.createPageElFrom(json)));
  }

  appendPageCtrl() {
    for (let i = 0; i < this.jsonList.length; i++)
      this.$pageCtrl.appendChild(this.createPageCtrlIdxBtn(i));

    this.$pageCtrl.appendChild(this.createPageCtrlLeftBtn());
    this.$pageCtrl.appendChild(this.createPageCtrlRightBtn());
  }

  createPageElFrom(json) {
    const $page = createMainEvtCardElFrom(json);
    $page.classList.add('page');
    return $page;
  }

  createPageCtrlIdxBtn(idx) {
    const $ = document.createElement('DIV');
    $.classList.add('slide__page-ctrl__idx-btn');
    $.setAttribute('data-index', idx);
    $.innerHTML = `<div class="page-ctrl__idx-btn__bar"></div>`;
    return $;
  }

  createPageCtrlLeftBtn() {
    const $ = document.createElement('BUTTON');
    $.classList.add('slide__page-ctrl__left-btn');
    $.innerHTML = `<div class="page-ctrl__left-btn__icon"></div>`;
    return $;
  }

  createPageCtrlRightBtn() {
    const $ = document.createElement('BUTTON');
    $.classList.add('slide__page-ctrl__right-btn');
    $.innerHTML = `<div class="page-ctrl__right-btn__icon"></div>`;
    return $;
  }

  select(idx) {
    if (this.currSelectedIdx === idx) 
      return;

    this.$pageCtrl.children[this.currSelectedIdx].classList.remove('select');
    this.$pageCtrl.children[idx].classList.add('select');
    
    for (let idxDiff = idx - this.currSelectedIdx; idxDiff > 0; idxDiff--)
      this.$pages.appendChild(this.$pages.removeChild(this.$pages.firstElementChild));
    
    for (let idxDiff = idx - this.currSelectedIdx; idxDiff < 0; idxDiff++)
      this.$pages.insertBefore(this.$pages.removeChild(this.$pages.lastElementChild), this.$pages.firstElementChild);

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
