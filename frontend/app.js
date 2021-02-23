import API from "./src/util/api.js";

class App {
  constructor({ $target }) {
    this.$target = $target; 
    this.api = API;
  }
}

export default App;