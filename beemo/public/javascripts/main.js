import LoadDataManager from './LoadDataManager.js';
import LoadView from './LoadView.js';
import BottomCarouselView from './BottomCarouselView.js';
import _ from './util.js';


window.addEventListener('DOMContentLoaded', () => {

  const mainImgJsonUrl = 'https://shoppinghow.kakao.com/v1.0/shophow/top/planningEvent.json?';
  const moreImgJsonUrl = 'https://shoppinghow.kakao.com/v1/event/homecontents.json?page=1&countPerPage=20&min_num=0';
  const loadDataManager = new LoadDataManager({ mainImgJsonUrl, moreImgJsonUrl });

  const nodeObj = {
    leftTopImg: _.$('._left_top_image'),
    rightTopImgs: _.$All('._right_top_image'),
    middleImgs: _.$All('._middle_image'),
    moreDataButton: _.$('._more_data_button'),
    mainCarouselBox: _.$('._main_carousel_box'),
    threeImgBox: _.$('._three_image_box'),
    dottedButtons: _.$All('._dotted_button'),
    radioButtons: _.$All('._radio')
  }

  const loadView = new LoadView({ loadDataManager }, nodeObj);

  const bottomElements = {
    carouselBox: _.$('.other'),
    carouselList: _.$('.other__list'),
    bottomImgs: _.$All('._bottom_image'),
    leftButton: _.$('.other__left_button'),
    rightButton: _.$('.other__right_button')
  }

  const bottomCarouselView = new BottomCarouselView({ loadDataManager }, bottomElements);
})
