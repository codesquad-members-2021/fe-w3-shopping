const url = {
  mileageList: 'http://localhost:3000/api/mileageList',
  mallEventList: 'http://localhost:3000/api/mallEventList',
  hotDealList: 'http://localhost:3000/api/hotDealList',
  shoppingPartner: 'http://localhost:3000/api/shoppingPartner',
};

const REQUEST_SUCESS = 'Request successful';
const REQUEST_FAILED = 'Request failed';

const $mileageEventSlide = document.querySelector('.event--slide');
const $prevEventButton = document.querySelector('.slide--button--prev');
const $nextEventButton = document.querySelector('.slide--button--next');

const $topMileageSlide = document.querySelector('#topMileageSlide');
const $mileageSlidePage = document.querySelector('#mileageSlidePage');
const $mallEventList = document.querySelector('#mallEventList');
const $mallEventSlide = document.querySelector('#mallEventSlide');
const $hotDealWrapper = document.querySelector('#hot-deal__wrapper');

export { url, REQUEST_SUCESS, REQUEST_FAILED, $mileageEventSlide, $prevEventButton, $nextEventButton, $topMileageSlide, $mileageSlidePage, $mallEventList, $mallEventSlide, $hotDealWrapper };
