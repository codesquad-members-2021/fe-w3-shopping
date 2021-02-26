export default class DD {
  constructor($target) {
    this.$target = $target;
    this.inheritances = {};
    this.familyTree = {};
    this.render();
  }
  render() {
    this.$target.innerHTML = this.getTemplate();
    this.familyTree = this.mount();
    this.didMount();
  }

  getTemplate() {}
  mount() {}
  didMount() {}
  renderComponenets($component, $target) {
    $target.appendChild($component.$target);
  }
  branch(componentName, Constructor, props, ...children) {
    this.combineProps(componentName, props);
    const component = new Constructor(this.getInheritances(componentName));
    const inheritances = component.getInheritances();
    this.setInheritances(inheritances);
    return {
      [componentName]: {
        component,
        children: children.map((child) => this.branch(...child)),
      },
    };
  }
  combineProps(componentName, newProps) {
    this.inheritances[componentName].props = {
      ...this.inheritances[componentName]?.props,
      ...newProps,
      ...{
        receiveComponentUpdateCall: this.receiveComponentUpdateCall.bind(this),
      },
    };
    console.log("3", this.inheritances[componentName]);
  }
  setInheritances(inheritances) {
    this.inheritances = { ...this.inheritances, ...inheritances };
  }
  getInheritances(componentName) {
    return this.inheritances[componentName] ?? {};
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
