import BannerPresentational from './BannerPresentational.js';
// import BannerCarouselContainer from './BannerCarouselContainer.js';

import API from "../../util/api.js"; // root를 alias하는 방법을 찾아보는 중입니다.

class BannerContainer {
  constructor({ $target }) {
    this.$target = $target;
    this.$BannerPresentational = new BannerPresentational({ $target });
    
    this.fixedImages = "";
    this.carouselImages = [];
    // 배너 캐로셀 initialize
    // let $target = this.$BannerPresentational.$target.querySelector("#banner-slide");
    // this.bannerCarouselContainer = new BannerCarouselContainer({ $target, state });
  }

  init() {
    this.resetState();
    // API에서 받아 옴.
    API.get.banner((response) => {
      // 받아와서
      this.setState(response);
    });
  }
  
  setState({ fixedImages, carouselImages }) {
    if (this.fixedImages !== "" || this.carouselImages.length !== 0 ) {
      this.resetState();  
    }
    this.setFixedImages(fixedImages);
    this.setCarouselImages(carouselImages);
  }

  resetState() {
    this.fixedImages = "";
    this.carouselImages = [];
  }

  setFixedImages(fixedImages) {
    this.fixedImages = fixedImages;
  }

  setCarouselImages(carouselImages) {
    this.carouselImages = carouselImages;
  }

}

export default BannerContainer;