import { _ } from './util.js';

export function createMainEvtCardElFrom(json) {
  const $div = document.createElement('DIV');
  $div.classList.add('main-evt');
  $div.innerHTML = 
    `<a href="${json.linkurl}" class="main-evt__link">
      <img src="${json.imgurl}" alt="Image not found"/>
    </a>`;
  return $div;
};

function createEvtCardListItemElFrom(json) {
  const $li = document.createElement('LI');
  $li.classList.add('evt-card-list__item');
  $li.innerHTML = 
    `<a href="${json.linkurl}" class="item__link">
      <div class="item__link__thumb"><img src="${json.imgurl}" alt="Image not found"/></div>
      <div class="item__link__title">${json.text}</div>
      <div class="item__link__desc">${json.text2}</div>
      <div class="item__link__theme" data-theme="${json.theme}"></div>
    </a>`;
  return $li;
}

export function createEvtCardListElFrom(jsonList) {
  const $ul = document.createElement('UL');
  $ul.classList.add('evt-card-list');
  $ul.classList.add(`item-cnt-${jsonList.length}`);

  jsonList.forEach(json => $ul.appendChild(createEvtCardListItemElFrom(json)));

  return $ul;
}