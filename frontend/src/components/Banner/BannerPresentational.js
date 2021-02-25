import "./banner.scss";

class BannerPresentational {
  constructor({ $target }) {
    this.$target = $target;

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
              <img src="http://shop4.daumcdn.net/shophow/sib/0_210219175151_tbehDsXzWnJKZNGWJxRuYhONIcINMfri" />
            </a>
          </div>
          <div class="contents right"> 
            <img src="http://shop4.daumcdn.net/shophow/sib/0_210219175151_tbehDsXzWnJKZNGWJxRuYhONIcINMfri" />
            <div id="banner-slide"> </div>
          </div>
        </div>
      </div>
    `
    this.$target.insertAdjacentHTML('beforeend', $Banner);
  }
}

export default BannerPresentational;