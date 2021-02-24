import RollingKeywordsPresentational from "./RollingKeywordsPresentational.js";
import API from "../../../util/api.js"; // root를 alias하는 방법을 찾아보는 중입니다.

class RollingKeywordsContainer {
  constructor({ $target }) {
    this.$RollingKeywordsPresentational = new RollingKeywordsPresentational({ $target });
    this.API = API;

    this.keywords = [];
  }

  setKeywords() {
    // 상태를 업데이트 해주는 형태
    // this.keywords.push()
  }  
  
}

export default RollingKeywordsContainer;
