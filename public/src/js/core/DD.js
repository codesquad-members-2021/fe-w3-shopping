export default class DD {
  constructor($target) {
    this.$target = $target;
    this.familyTree = {};
    this.render();
  }
  render() {
    this.$target.innerHTML = this.getTemplate();
    this.mount();
    this.setFamilyTree();
    this.didMount();
  }
  createComponent(Constructor, $target, props = {}, child = null) {
    const component = new Constructor($target, props);
  }
  setFamilyTree() {}
  getTemplate() {}
  mount() {}
  didMount() {}
  renderComponenets($component, $target) {
    $target.appendChild($component.$target);
  }
  branch(componentName, component, props, ...children) {
    component.setProps(
      {
        receiveComponentUpdateCall: this.receiveComponentUpdateCall.bind(this),
      },
      false
    );
    return { [componentName]: { component, props, children } };
  }
  receiveComponentUpdateCall(component) {
    const inheritances = component.getInheritances();
    const children = getChildrenOfTargetComponent(component);
    children.forEach((child) => {
      const { $target, props } = inheritances[child.name];
      child.setTarget($target);
      child.setProps(props, true);
    });
  }
  getChildrenOfTargetComponent(targetComponent, tree) {
    if (tree.length === 0) return;
    if (!Object.keys(tree).includes(targetComponent.name)) {
      Object.keys(tree).getChildrenOfTargetComponent(targetComponent, tree);
    }
    const branch = tree[targetComponent.name];
    if (branch.component === targetComponent) return branch.children;
    branch.children.forEach((child) => {
      return getChildrenOfTargetComponent(targetComponent, child);
    });
  }
  findKeyOftargetComponent(component, tree = this.familyTree) {}
  // findComponentInTree(componentName) {
  //   let result = {}
  //   for (const name in this.familyTree) {
  //     if()
  //   }
  // }
}
