import { BannerCarouselPresentational, HotThemeCarouselPresentational } from './CarouselPresentational.js'

class CarouselContainer {
  constructor({ $target }) {
    this.$target = $target;
    this.$carousel = null;
    this.type = null;
    this.images = [];
  }

  init({ type, images }) {
    this.setState({type, images});
  }
  
  setState({type, images}) {
    if (this.type !== null || this.images.length !== 0 ) {
      this.resetState();  
    }
    this.setType(type);
    this.setImages(images);
  }

  resetState() {
    this.type = null;
    this.images = [];
    this.$carousel?.remove(); // 혹시모르는 에러를 방지하기 위함.
  }
  
  setType(type) {
    if (this.type !== null) {
      console.warn("carousel type was already declared !");
      return;
    }
    
    const $target = this.$target;
    switch (type) {
      case "banner":
        this.type = type;
        this.$carousel = new BannerCarouselPresentational({ $target, images: this.images });
        break;
      case "hotTheme":
        this.type = type;
        this.$carousel = new HotThemeCarouselPresentational({ $target, images: this.images });
        break;
      default:
        console.error("Wrong type was inserted. Please check carousel assign syntax.")
        break;
    }
  }

  setImages(images) {
    if (this.images !== null) {
      console.warn("carousel images was already declared !");
      return;
    }
    this.images = images;
  }

  // render() {
  //   this.$target.append
  // }
}

export default CarouselContainer;