import "./banner.scss";

class BannerPresentational {
  constructor({ $target }) {

  }

  init() { 
    this.render();


  }
  
  render() {
    const $Banner = /* html */ `
      <div class="">
      </div>
    `
    this.$target.insertAdjacentHTML('beforeend', $Banner);
  }
}

export default BannerPresentational;