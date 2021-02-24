import API from "./src/util/api.js";
import Header from "./src/components/Header/header.js"

class App {
  constructor({ $target }) {
    this.$target = $target;
    this.api = API;
    this.header = null;
  }
  init() {
    let $target = null;
    
    $target = this.$target.querySelector("div#header");
    this.header = new Header({ $target });
    
  }
}

export default App;