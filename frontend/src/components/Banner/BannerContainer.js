import BannerPresentational from './BannerPresentational.js';
// import BannerCarouselContainer from './BannerCarouselContainer.js';

import API from "../../util/api.js"; // root를 alias하는 방법을 찾아보는 중입니다.

class BannerContainer {
  constructor({ $target }) {
    this.$target = $target;
    this.$BannerPresentational = null;
    
    this.fixedImage = "";
    
    // 배너 캐로셀 initialize
    // this.carouselImages = [];
    // let $target = this.$BannerPresentational.$target.querySelector("#banner-slide");
    // this.bannerCarouselContainer = new BannerCarouselContainer({ $target, state });
    // console.log(data.mallEventList.slice(0,10));
    // carouselImages: data.mileageList

    this.init();
  }

  init() {
    this.resetState();
    
    API.get.bannerInfo().then((data) => {
      this.setState({ fixedImage: data.event.imgurl });
    });
  }
  
  setState({ fixedImage }) {
    if (this.fixedImage !== "") {
      this.resetState();  
    }
    this.setFixedImages(fixedImage);
    this.render();
  }

  resetState() {
    this.fixedImage = "";
  }

  setFixedImages(fixedImage) {
    this.fixedImage = fixedImage;
  }

  // setCarouselImages(carouselImages) {
  //   this.carouselImages = carouselImages;
  // }

  render() {
    this.$BannerPresentational = new BannerPresentational({ $target: this.$target, fixedImage: this.fixedImage });
  }
}

export default BannerContainer;