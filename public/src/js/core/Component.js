export default class Component {
  constructor({ $target, props, name }) {
    this.$target = $target;
    this.props = props;
    this.name = name;
    this.setup();
    this.mount();
  }
  setup() {}
  mount() {
    this.render();
    this.setEvents();
  }
  shouldRender() {
    return true;
  }
  render() {
    this.$target.innerHTML = this.getTemplate();
  }
  getTemplate() {}

  setEvents() {}
  addEvent(eventType, selector, callback) {
    const children = [...this.$target.querySelectorAll(selector)];
    const isTarget = (target) => {
      return children.includes(target) || target.closest(selector);
    };
    this.$target.addEventListener(eventType, (event) => {
      if (!isTarget(event.target)) return false;
      callback(event);
    });
  }
  setState(newState) {
    this.state = { ...this.state, ...newState };
    if (this.shouldRender()) this.render();
  }
  setProps(newProps, shouldRender) {
    this.props = { ...this.props, ...newProps };
    if (shouldRender) this.render();
  }
  updateComponent() {}
  getInheritances() {}
  getInnerHTML() {
    return this.$target.innerHTML;
  }
  setTarget($target) {
    this.$target = $target;
  }
}
