import API from "./util/api.js";

class App {
  constructor({ $target }) {
    this.$target = $target; 
    this.api = API;
  }
}

export default App;