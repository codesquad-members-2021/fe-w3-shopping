import { dataManager } from './dataManager.js';
import { LoadItem } from './LoadItem.js';
import { Slider } from './Slider.js';

const loadItems = (rawData) => {
  const loadItem = new LoadItem(rawData);
  loadItem.showImgContents();
  loadItem.onEvents();
};

const excuteSlide = () => {
  const slider = new Slider();
  slider.onEvents();
  slider.slideAutomatically();
};

const main = () => {
  const rawData = dataManager(
    'http://localhost:3000',
    'data',
    'planningEvent.json'
  );
  loadItems(rawData);
  excuteSlide();
};

main();
