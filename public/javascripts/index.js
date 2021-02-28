import _ from './util.js';
import IndexControl from './index/IndexControl.js';
import DataManager from './index/DataManager.js';

const serverInfo = {serverURL: 'http://localhost:3001'};
const dataManager = new DataManager(serverInfo);

const indexWrappers = {
    mainBestWrapper: _.$('.content__main__one'),
    mainCarouselWrapper: _.$('.content__main__carousel'),
    moreWrapper: _.$('.content__more'),
    hotCarouselWrapper: _.$('.content__hot__carousel')
};
const options = {
    mainCarouselAnimateInterval: 5000,
}

new IndexControl(dataManager, indexWrappers, options).init();