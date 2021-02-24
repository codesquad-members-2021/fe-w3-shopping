import HeaderPresentational from "./src/components/Header/HeaderPresentational.js"

import "./app.scss";

class App {
  constructor({ $target }) {
    this.$target = $target;
    this.header = null;
  }
  
  init() {
    let $target = null;
    
    $target = this.$target.querySelector("div#header");
    this.header = new HeaderPresentational({ $target });
    
  }
}

export default App;