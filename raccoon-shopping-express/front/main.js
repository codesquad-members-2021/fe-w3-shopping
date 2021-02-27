import { FetchAPI } from './src/js/fetchAPI';
import { EventSlider } from './src/js/eventSlider';
import { MallEventSlider } from './src/js/mallEventSlider';

const $mileageEventSlide = document.querySelector('.event--slide');
const $topMileageSlide = document.querySelector('#topMileageSlide');
const $buttonGroup = document.querySelectorAll('.button-group');

const fetchAPI = new FetchAPI();
const eventSliderListener = new EventSlider($mileageEventSlide);

fetchAPI.init();
eventSliderListener.init();

const mallEventSlider = new MallEventSlider($buttonGroup);
mallEventSlider.addEvent();

export { $topMileageSlide };
