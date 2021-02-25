import DD from "./core/DD.js";
import Header from "./components/Header.js";
import SearchBar from "./components/SearchBar.js";
import Menu from "./components/Menu.js";
export default class App extends DD {
  getTemplate() {
    return /*html*/ `
        <header></header>
        <main></main>
      `;
  }
  mount() {
    const headerParms = {
      $target: this.$target.querySelector("header"),
      props: {},
      name: "header",
    };
    const header = new Header(headerParms);

    const { searchBar, menu } = header.getInheritances();
    const searchBarComponent = new SearchBar(searchBar);
    const menuComponent = new Menu(menu);

    //setFamilyTree 함수로 따로 빼고 싶지만 mount에서 선언한 요소들을 써야해서 ...
    //this로 다 선언하기에는 너무 많고 this.~가 많아지는거 같아서 일단 여기에 둔다!
    const branch = this.branch.bind(this);
    this.familyTree = branch(
      "header",
      header,
      {},
      branch("searchBar", searchBarComponent, searchBar.props),
      branch("menu", menuComponent, menu.props)
    );
  }
  setFamilyTree() {}
  renderComponenets() {
    // for (const component in this.setFamilyTree) {
    // }
  }
  didmount() {}
}
const test = [
  {
    header: {
      component: "header",
      props: "props",
      children: [
        {
          searchBar: {
            component: "searchBar",
            props: "props2",
            children: [],
          },
        },
        {
          menu: {
            component: "menu",
            props: "props3",
            children: [],
          },
        },
      ],
    },
  },
];
