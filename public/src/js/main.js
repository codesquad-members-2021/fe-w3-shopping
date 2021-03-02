import { domSelector, getData } from './util/util.js';
import { moreParser, slideParser, hotDealParser } from './util/parser.js';
import BannerSlider from './bannerSlider.js';
import MoreButtonView from './moreBtn.js';
import HotDealSlider from './hotDealSlider.js';
import { URL } from './util/data.js';

//슬라이드 DOM
const slideContainer = domSelector({ selector: '.slide' });
const slideList = domSelector({ selector: '.slide-list' });
const bannerSlideBtn = domSelector({ selector: '.slide-event__btn' });
const pagingBtn = domSelector({ selector: '.slide-event__paging' });
const BannerSelector = { container: slideContainer, slideList, slideBtn: bannerSlideBtn, pagingBtn };
const BannerAnimation = { oneStep: 515, transition: 'all 0.3s' };

//더보기 DOM
const moreContainer = domSelector({ selector: '.more-container' });
const moreBtn = domSelector({ selector: '.more-text-container' });
const moreSelectors = { container: moreContainer, moreBtn };

//핫딜 슬라이드 DOM
const hotDealContainer = domSelector({ selector: '.hot-deal__container' });
const hotDealSlideList = domSelector({ selector: '.hot-deal-list' });
const hotDealBtn = domSelector({ selector: '.hot-deal .slide-event__btn' });
const hotDealSelector = { container: hotDealContainer, slideList: hotDealSlideList, slideBtn: hotDealBtn };
const hotDealAnimation = { oneStep: 260.6, transition: 'all 0.3s' };

//슬라이더
getData(URL.SLIDE).then((res) => {
  const { mileageList: slideData, mallEventList: hotDealData } = res;

  const parsedBannerdata = slideParser(slideData);
  const bannerSlider = new BannerSlider(parsedBannerdata, BannerSelector, BannerAnimation);
  bannerSlider.init();

  const parsedHotDealData = hotDealParser(hotDealData);
  const hotDealSlider = new HotDealSlider(parsedHotDealData, hotDealSelector, hotDealAnimation);
  hotDealSlider.init();
});

// 더보기;
getData(URL.MORE).then((res) => {
  const { contents: moreData } = res;
  const parsedMoreData = moreParser(moreData);
  const moreButtonView = new MoreButtonView(parsedMoreData, moreSelectors);
  moreButtonView.init();
});
