import "./banner.scss";

class BannerPresentational {
  constructor({ $target, ...props }) {
    this.$target = $target;
    this.imgSrc = props.fixedImage;
    
    this.init();
  }

  init() { 
    this.render();
  }
  
  render() {
    const $Banner = /* html */ `
      <div class="container">
        <div class="wrapper">
          <div class="contents left"> 
            <a href="#"> 
              <img src=${this.imgSrc} />
            </a>
          </div>
          <div class="contents right"> 
            <img src="http://shop4.daumcdn.net/shophow/sib/0_210219175151_tbehDsXzWnJKZNGWJxRuYhONIcINMfri" /> <!-- 임시 -->
            <div id="banner-slide"> </div>
          </div>
        </div>
      </div>
    `
    this.$target.insertAdjacentHTML('beforeend', $Banner);
  }
}

export default BannerPresentational;