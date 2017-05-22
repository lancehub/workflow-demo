import { action, extendObservable } from 'mobx';

class Tree {
  constructor(data) {
    this.id = data.id;
    extendObservable(this, {
      name: data.name,
      children: data.children.map(item => new Tree(item)),
    });
    this.focus = !!data.focus;
  }

  @action.bound addChild(item) {
    this.children.push(new Tree(item));
  }

  @action.bound edit(content) {
    this.name = content;
  }
}

export default Tree;
