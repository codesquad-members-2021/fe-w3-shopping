import DD from "./core/DD.js";
import Header from "./components/Header.js";
import SearchBar from "./components/SearchBar.js";
import Menu from "./components/Menu.js";
export default class App extends DD {
  getTemplate() {
    return /*html*/ `
        <header id="header"></header>
        <main></main>
      `;
  }
  mount() {
    const branch = this.branch.bind(this);
    const headerInheritance = {
      header: {
        $target: this.$target.querySelector("#header"),
        props: {},
        name: "header",
      },
    };
    this.setInheritances(headerInheritance);

    return branch(
      "header",
      Header,
      {},
      ["searchBar", SearchBar, { test2: "test2" }],
      ["menu", Menu, { test3: "test3" }]
    );
  }
  didmount() {}
}
