import { FetchAPI } from './src/js/fetchAPI';
import { EventSlider } from './src/js/eventSlider';
import { MallEventSlider } from './src/js/mallEventSlider';

const $mileageEventSlide = document.querySelector('.event--slide');
const $topMileageSlide = document.querySelector('#topMileageSlide');
const $buttonGroup = document.querySelectorAll('.button-group');

const fetchAPI = new FetchAPI();
const eventSliderListener = new EventSlider($mileageEventSlide);
const mallEventSlider = new MallEventSlider($buttonGroup);

fetchAPI.mileageList();
fetchAPI.mallEventList();
fetchAPI.hotDealList(0, 10);

eventSliderListener.init();

mallEventSlider.addEvent();

export { $topMileageSlide };
