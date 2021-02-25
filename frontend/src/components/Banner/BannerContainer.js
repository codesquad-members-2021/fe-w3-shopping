import BannerPresentational from './BannerPresentational.js';
// import BannerCarouselContainer from './BannerCarouselContainer.js';

import API from "../../util/api.js"; // root를 alias하는 방법을 찾아보는 중입니다.

class BannerContainer {
  constructor({ $target }) {
    this.$target = $target;
    this.$BannerPresentational = null;
    this.$BannerCarousel = document.createElement("div");
    this.$BannerCarousel.class = "banner-carousel";
    
    this.$cached = {}; // for caching DOM

    // 상태
    this.fixedImage = "";
    this.bannerCarouselContainer = null;
    
    // let $target = this.$BannerPresentational.$target.querySelector("#banner-slide");
    // new BannerCarouselContainer({ $target: this.$BannerCarousel, carouselImages: data.mileageList });

    this.init();
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
    return !this.$cached.hasOwnProperty(nextProp) ? true : false;
  }

  isCacheHit(prop) {
    return this.$cached[prop];
  }
  
  loadIntoCache({prop, $dom}) {
    this.$cached[prop] = $dom;
  }


  render() { 
    if (this.$BannerPresentational === null || this.isMemorable(this.fixedImage)) {
      this.$BannerPresentational = new BannerPresentational({ $target: this.$target, fixedImage: this.fixedImage });
      // this.$BannerPresentational.$Banner.querySelector("#banner-carousel").appendChild(this.$BannerCarousel); // 배너 캐로셀 추가 예정
    } else { // cache hit
      this.$BannerPresentational = this.isCacheHit(this.fixedImage);
      this.$target.innerHTML = "";
      this.$BannerPresentational.reRender();
    }
  }
  
}

export default BannerContainer;