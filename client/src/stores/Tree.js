import { action, extendObservable } from 'mobx';

class Tree {
  constructor(data) {
    this.id = data.id;
    extendObservable(this, {
      name: data.name,
      children: data.children.map(item => new Tree(item)),
      focus: !!data.focus,
      parent: data.parent,
    });

    this.myIndex = () => {
      if(this.parent){
        return this.parent.children.indexOf(this);
      }
      return 0;
    }
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

  @action.bound lossFocus(){
    this.focus = false;
  }

  @action.bound delete(){
    //this.parent.children.remove(this);
    this.parent.children.splice(tree.myIndex(), 1);
  }
}

export default Tree;
