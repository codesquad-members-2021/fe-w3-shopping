import Model from './Model.js';
import View from './View.js';
import _ from './util.js';
// const leftTopImg = document.querySelector('.main__first_line__left__box > img');
// const rightTopImg = document.querySelectorAll('.main__first_line__right__box >div> img');

window.addEventListener('DOMContentLoaded', () => {

  const url = 'https://shoppinghow.kakao.com/v1.0/shophow/top/planningEvent.json?_=1614072773662';

  const model = new Model({ url });

  const view = new View({ model });
})
