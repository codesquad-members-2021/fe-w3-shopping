export default class DD {
  constructor($target) {
    this.$target = $target;
    this.render();
  }
  render() {
    this.$target.innerHTML = this.getTemplate();
    this.mount();
    this.didMount();
  }
  getTemplate() {}
  mount() {}
  didMount() {}
  renderComponenet($component, $target) {
    $target.appendChild($component.$target);
  }
}
