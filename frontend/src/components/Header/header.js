import RollingKeywords from "./RollingKeywords/rollingKeywords.js"

import "./header.scss";

class Header {
  constructor({ $target }) {
    this.$target = $target;
    this.top10 = [];
    this.rollingKeywords = null;

    this.init();
  }
  init() {
    // fetch()를 통해 실시간 검색어를 불러오는 부분
    this.render();
  }
  render() {
    const $Header = /* html */ `
      <header>
        <section class="logo-and-search-area">
          <div class="container">
            <div class="wrapper">
              <div class="logo">
                <a href="#">
                  <img src="https://search1.daumcdn.net/search/cdn/simage/shopping/v2/common/nav/logo_shw.png" />
                </a>
              </div>
              <div class="search-bar">
                <div id="rolling-keywords" class="rolling-keywords-input">
                  <input type="text" /> <!-- 임시 , 향후 컴포넌트 import 형태로 변경 됨. -->
                  <!-- <ol>
                    <li></li>
                  </ol>  컴포넌트로 --> 
                </div>
              </div>
            </div>
          </div>
        </section>
        <section class="nav-area">
          <div class="container">
            <nav class="wrapper">
              <div class="contents left">
                카테고리
              </div>
              <div class="contents center">
                <ul>
                  <li>핫딜</li>
                  <li>베스트100</li>
                  <li>할인특가</li>
                  <li>기획전</li>
                </ul>
              </div>
              <div class="contents right">
                <ul>
                  <li>로그인</li>
                  <li>최근본 상품</li>
                </ul>
              </div>
            </nav>
          </div>
        </section>
      </header>
    `
    console.log(this.$target)
    this.$target.insertAdjacentHTML('beforeend', $Header);
    

    let $target = this.$target.querySelector("#rolling-keywords");
    this.rollingKeywords = new RollingKeywords($target);
  }
}

export default Header;