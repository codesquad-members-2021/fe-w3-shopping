import FetchAPI from './src/js/fetchAPI';
import EventSlider from './src/js/eventSlider';
import { MallEventSlider } from './src/js/mallEventSlider';

const $mileageEventSlide = document.querySelector('.event--slide');
const $topMileageSlide = document.querySelector('#topMileageSlide');
const $buttonGroup = document.querySelectorAll('.button-group');
const $moreItemButton = document.querySelector('.more-item__button');

$moreItemButton.addEventListener('click', requestData);

const fetchAPI = new FetchAPI();
const eventSliderListener = new EventSlider($mileageEventSlide);
const mallEventSlider = new MallEventSlider($buttonGroup);

let PAGE = 2;
const ITEMS = 5;
let CURRENT = 0;

function requestData() {
  const requestItems = PAGE * ITEMS;
  fetchAPI.hotDealList(CURRENT, requestItems);
  CURRENT = requestItems;
  PAGE++;
}

fetchAPI.mileageList();
fetchAPI.mallEventList();
requestData();

eventSliderListener.init();

mallEventSlider.addEvent();

export { $topMileageSlide };
