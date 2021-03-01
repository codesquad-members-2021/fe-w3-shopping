import FetchAPI from './src/js/fetchAPI';
import EventSlider from './src/js/eventSlider';
import MallEventSlider from './src/js/mallEventSlider';
import RequestData from './src/js/requestData';

const PAGE = 2;
const ITEMS = 5;
const CURRENT = 0;

const $mileageEventSlide = document.querySelector('.event--slide');
const $topMileageSlide = document.querySelector('#topMileageSlide');
const $buttonGroup = document.querySelectorAll('.button-group');

const fetchAPI = new FetchAPI();
const eventSliderListener = new EventSlider($mileageEventSlide);
const mallEventSlider = new MallEventSlider($buttonGroup);
const requestData = new RequestData(PAGE, ITEMS, CURRENT);

fetchAPI.mileageList();
fetchAPI.mallEventList();
requestData.requestData();

eventSliderListener.init();
mallEventSlider.addEvent();
requestData.addEvent();

export { $topMileageSlide, PAGE };
