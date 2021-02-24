import BannerPresentational from './BannerPresentational.js';
import BannerCarouselContainer from './BannerCarouselContainer.js';

class BannerContainer {
  constructor({ $target }) {
    this.$BannerPresentational = new BannerPresentational({ $target });
    
    // 배너 캐로셀 initialize
    // let $target = this.$target.querySelector("#banner-slide");
    // this.bannerCarouselContainer = new BannerCarouselContainer({ $target, state });
  }
}

export default BannerContainer;