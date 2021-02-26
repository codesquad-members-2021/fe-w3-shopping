import { DataManager } from './dataManager.js';
import { LoadItem } from './loadItem.js';
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
  const dataManager = new DataManager();
  const rawData = dataManager.responsedJSONData();
  loadItems(rawData);
  excuteSlide();
};

main();
