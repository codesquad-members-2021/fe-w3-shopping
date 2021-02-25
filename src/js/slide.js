import { _ } from './util.js';

class ISlide {
  constructor($target) {
    [this.$pages, this.$ctrl] = _.$All('div', $target);
  }

  createSlideElFrom(json) { throw new Error('Abstract method!'); }

  appendSlideElsToTarget() { throw new Error('Abstract method!'); }
}


/*
  COMMENT:
    Later, the 'PageCtrl*' part maybe seperated from this.
*/
export class MainEvtSlide extends ISlide {
  constructor($target, jsonList) {
    super($target);
    this.jsonList = jsonList;
  }

  init() {
    this.appendPageEls();
    this.appendPageCtrl();
  }

  appendPageEls() {
    this.jsonList.forEach(json => this.$pages.appendChild(this.createPageElFrom(json)));
  }

  appendPageCtrl() {
    for (let i = 0; i < this.jsonList.length; i++)
      this.$ctrl.appendChild(this.createPageCtrlIdxBtn());

    this.$ctrl.appendChild(this.createPageCtrlLeftBtn());
    this.$ctrl.appendChild(this.createPageCtrlRightBtn());
  }

  createPageElFrom(json) {
    const $ = document.createElement('DIV');
    $.innerHTML =
      `<a href="${json.linkurl}" class="main-evt__link">
        <img src="${json.imgurl}" alt="Image not found"/>
      </a>`;
    return $;
  }

  createPageCtrlIdxBtn() {
    const $ = document.createElement('DIV');
    $.classList.add('slide__page-ctrl__idx-btn');
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
}