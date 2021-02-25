import LoadDataManager from './LoadDataManager.js';
import LoadView from './LoadView.js';
import _ from './util.js';


window.addEventListener('DOMContentLoaded', () => {

  const mainImgJsonUrl = 'https://shoppinghow.kakao.com/v1.0/shophow/top/planningEvent.json?';
  const moreImgJsonUrl = 'https://shoppinghow.kakao.com/v1/event/homecontents.json?page=1&countPerPage=20&min_num=0';
  const loadDataManager = new LoadDataManager({ mainImgJsonUrl, moreImgJsonUrl });

  const leftTopImg = _.$('._left_top_image');
  const rightTopImgs = _.$All('._right_top_image');
  const middleImgs = _.$All('._middle_image');
  const bottomImgs = _.$All('._bottom_image');
  const moreDataButton = _.$('._more_data_button');
  const mainLeftButton = _.$('._main_left_button');
  const mainRightButton = _.$('._main_right_button');
  const threeImgBox = _.$('._three_image_box');

  const nodeObj = {
    leftTopImg,
    rightTopImgs,
    middleImgs,
    bottomImgs,
    moreDataButton,
    mainLeftButton,
    mainRightButton,
    threeImgBox
  }

  const loadView = new LoadView({ loadDataManager }, nodeObj);
})
