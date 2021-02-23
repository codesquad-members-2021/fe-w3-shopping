import API from "./src/util/api.js";
import Header from "./src/components/Header/header.js"


class App {
  constructor({ $target }) {
    this.$target = $target; 
    this.api = API;
  }
}

export default App;