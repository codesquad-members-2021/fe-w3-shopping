import { _ } from './util.js';

export function createMainEvtCardElFrom(json) {
  return _.genEl('DIV', {
    classNames: ['main-evt'],
    template:
      `<a href="${json.linkurl}" class="main-evt__link">
        <img src="${json.imgurl}" alt="Image not found"/>
      </a>`
  });
};