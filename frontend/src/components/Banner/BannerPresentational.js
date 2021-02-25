import "./banner.scss";

class BannerPresentational {
  constructor({ $target, ...props }) {
    this.$target = $target;
    this.$Banner = document.createElement("div");
    this.$Banner.className = "banner";
    
    // props
    this.imgSrc = props.fixedImage;
    
    this.init();
  }

  init() { 
    this.$target.innerHTML = ""; // 먼저 타겟을 지우고 나서 렌더 진행
    this.render();
  }
  
  render() {
    const $Banner = /* html */ `
      <div class="container">
        <div class="wrapper">
          <div class="contents left"> 
            <a href="#"> 
              <img src="${this.imgSrc}" />
            </a>
          </div>
          <div class="contents right"> 
            <img src="http://shop4.daumcdn.net/shophow/sib/0_210219175151_tbehDsXzWnJKZNGWJxRuYhONIcINMfri" /> <!-- 임시 -->
            <div id="banner-carousel"></div>
          </div>
        </div>
      </div>
    `;
    this.$Banner.insertAdjacentHTML('beforeend', $Banner); // string -> HTMLDOMElement
    this.$target.appendChild(this.$Banner); // DOM -> DOM
  }

  reRender(){ 
    this.$target.appendChild(this.$Banner); // DOM -> DOM
  }
}

export default BannerPresentational;