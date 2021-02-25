import { LoadItem } from './loadItem.js';
import { Slider } from './slider.js';

const loadItems = () => {
  const loadItem = new LoadItem();
  loadItem.showImgContents();
  loadItem.onEvents();
};

const excuteSlide = () => {
  const slider = new Slider();
  slider.onEvents();
  slider.slideAutomatically();
};

const main = () => {
  loadItems();
  excuteSlide();
};

main();
