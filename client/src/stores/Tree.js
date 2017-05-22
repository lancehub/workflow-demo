import { action, computed, extendObservable } from 'mobx';

class Tree {
  constructor(data) {
    this.id = data.id;
    
    extendObservable(this, {
      collapsed: data.collapsed || false,
      name: data.name || '',
      children: (data.children || []).map(item => new Tree(item)),
      parent: data.parent,
    });

    this.focus = data.focus || false;
  }

  @action.bound toggleCollapse() {
    this.collapsed = !this.collapsed;
  }

  @action.bound prependChild(item) {
    this.children.unshift(new Tree({...item, parent: this}));
  }

  @action.bound appendChild(item) {
    this.children.push(new Tree({...item, parent: this}));
  }

  @action.bound appendChildAt(item, index) {
    this.children.splice(index + 1, 0, new Tree({...item, parent: this}));
  }

  @action.bound edit(content) {
    this.name = content;
  }

  @action.bound delete() {
    this.parent.children.splice(this.index, 1);
  }

  @computed get index() {
    if(this.parent){
      return this.parent.children.indexOf(this);
    }
    return 0;
  }

  @computed get prev() {
    const index = this.index;
    if(index != 0){
      return this.parent.children[index - 1];
    }
    return this.parent;
  }
}

export default Tree;
