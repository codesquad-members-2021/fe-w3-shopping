import BannerPresentational from './BannerPresentational.js';
// import BannerCarouselContainer from './BannerCarouselContainer.js';

import API from "../../util/api.js"; // root를 alias하는 방법을 찾아보는 중입니다.

class BannerContainer {
  constructor({ $target }) {
    this.$target = $target;
    this.$BannerPresentational = null;

    // for caching
    this.$cached = {};

    // 상태
    this.fixedImage = "";
    
    // 배너 캐로셀 initialize
    // this.carouselImages = [];
    // let $target = this.$BannerPresentational.$target.querySelector("#banner-slide");
    // this.bannerCarouselContainer = new BannerCarouselContainer({ $target, state });
    // console.log(data.mallEventList.slice(0,10));
    // carouselImages: data.mileageList

    this.init();
    window.bc = this;
  }

  init() {
    API.get.bannerInfo().then((data) => {
      this.setState({ fixedImage: data.event.imgurl });
    });
  }
  
  // 상태 업데이트 영역
  setState({ fixedImage }) {
    this.setFixedImages(fixedImage);
    this.render();
    if (this.isMemorable(fixedImage)) {
      this.loadIntoCache({ prop: this.fixedImage, $dom: this.$BannerPresentational });
    }
  }

  setFixedImages(fixedImage) {
    this.fixedImage = fixedImage;
  }

  // 최적화 영역
  isMemorable(nextProp) {
    if (!this.$cached.hasOwnProperty(nextProp)) {
      return true;
    }
    return false;
  }

  isCacheHit(prop) {
    return this.$cached[prop];
  }
  
  loadIntoCache({prop, $dom}) {
    this.$cached[prop] = $dom;
  }


  render() { 
    if (this.$BannerPresentational === null) { // initial render
      this.$BannerPresentational = new BannerPresentational({ $target: this.$target, fixedImage: this.fixedImage });
    }
    else if (this.isMemorable(this.fixedImage)) {  // cache not hit 
      this.$BannerPresentational = new BannerPresentational({ $target: this.$target, fixedImage: this.fixedImage });
    }
    else { // cache hit
      this.$BannerPresentational = this.isCacheHit(this.fixedImage);
      this.$target.innerHTML = "";
      this.$BannerPresentational.reRender();
    }
  }
  
}

export default BannerContainer;