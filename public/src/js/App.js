import DD from "./core/DD.js";
import Header from "./components/Header.js";
import SearchBar from "./components/SearchBar.js";
import Menu from "./components/Menu.js";
export default class App extends DD {
  getTemplate() {
    return `
        <header></header>
        <main></main>
      `;
  }
  mount() {
    const $header = new Header(document.createElement("div"), {});
    const [searchBar, menu] = $header.getInheritances();
    const $searchBar = new SearchBar(
      document.createElement("div"),
      searchBar.props
    );
    const $menu = new Menu(document.createElement("div"), menu.props);
    $header.setChildren({ searchBar: $searchBar, menu: $menu });
    this.renderComponenet($searchBar, searchBar.target);
    this.renderComponenet($menu, menu.target);
    this.renderComponenet($header, this.$target.querySelector("header"));
  }
  didmount() {}
}
