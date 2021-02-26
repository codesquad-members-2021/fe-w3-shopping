import _ from './util.js';
import IndexControl from './index/IndexControl.js';
import DataManager from './index/DataManager.js';

const dataManager = new DataManager();
new IndexControl(
    dataManager, 
    '.content__more', 
    '.content__main__carousel',
    '.content__hot__carousel',
).init();