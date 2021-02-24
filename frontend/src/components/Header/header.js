import RollingKeywords from "./RollingKeywords/rollingKeywords.js"

import "./header.scss";

class Header {
  constructor({ $target }) {
    console.log($target)
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
        <section class="search">
          <div class="container">
            <a href="#">
              <img src="https://search1.daumcdn.net/search/cdn/simage/shopping/v2/common/nav/logo_shw.png" />
            </a>
            <div class="search-bar">
              <div class="rolling-keywords" id="rolling-keywords">
                <!-- <ol>
                  <li></li>
                </ol>  컴포넌트로 --> 
              </div>
              <input type="text" />
            </div>
          </div>
        </section>
        <section class="nav">
          <div class="container">
            <nav>
              <div class="left">
                카테고리
              </div>
              <div class="center">
              </div>
              <div class="right">
              </div>
              <ul>
                <li>핫딜</li>
                <li>베스트100</li>
                <li>할인특가</li>
                <li>기획전</li>
              </ul>
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