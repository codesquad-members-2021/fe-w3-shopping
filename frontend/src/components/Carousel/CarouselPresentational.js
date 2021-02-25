import './carousel.scss';

// 부모 클래스
class CarouselPresentational {
  constructor({ $target, images }) {
    this.$target = $target;
    this.images = images;
  }
}

export class BannerCarouselPresentational extends CarouselPresentational {
  constructor({ $target, images }) {
    super({ $target, images });
  }
} 

export class HotThemeCarouselPresentational extends CarouselPresentational {
  constructor() {
    super({ $target, images });  
  }
}