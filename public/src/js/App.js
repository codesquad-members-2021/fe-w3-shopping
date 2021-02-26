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
    const headerProps = {
      $target: this.$target.querySelector("#header"),
      props: {},
      name: "header",
    };
    return branch(
      "header",
      Header,
      headerProps,
      ["searchBar", SearchBar, { props: { test2: "test2" } }],
      ["menu", Menu, { props: { test3: "test3" } }]
    );
  }
  didmount() {}
}
