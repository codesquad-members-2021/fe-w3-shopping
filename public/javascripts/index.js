import _ from './util.js';
import IndexController from './index/IndexController.js';
import DataManager from './index/DataManager.js';

const serverInfo = {serverURL: 'http://localhost:3001'};
const dataManager = new DataManager(serverInfo);

const indexWrappers = {
    mainBestWrapper: _.$('.content__main__one'),
    mainCarouselWrapper: _.$('.content__main__carousel'),
    moreWrapper: _.$('.content__more'),
    hotCarouselWrapper: _.$('.content__hot__carousel')
};

const  {mainBestWrapper, mainCarouselWrapper, moreWrapper, hotCarouselWrapper} = indexWrappers;
const controlItems = {
    mainSlideItems: _.$All('.slide > div', mainCarouselWrapper),
    mainSlidePagingInnerList: _.$All('.paging__inner > span', mainCarouselWrapper),
    mainBestItemImg: _.$('a > img', mainBestWrapper),    
    moreViewBtn: _.$('.content__more__btn', moreWrapper),
    moreViewFrame: _.$('ul',  _.$('.content__more__view', moreWrapper) ),
    hotSlideItems: _.$All('ul > li', hotCarouselWrapper),
};

const options = {
    mainCarouselAnimateInterval: 5000,
    mainCarouselAnimateDirection: 'next',
    mainCarouselTransitionDuration: '0.4s',
    hotCarouselTransitionDuration: '0.4s',
};

new IndexController(dataManager, indexWrappers, controlItems, options).init();