import { observable, computed, action } from 'mobx';
import LTT from 'list-to-tree';

class Workflow {
  @observable list = [
    {
      id: 1,
      name: 'test-1',
      parentId: 0,
    }, {
      id: 2,
      name: 'test-2',
      parentId: 1,
    }, {
      id: 3,
      name: 'test-3',
      parentId: 1,
    }, {
      id: 4,
      name: 'test-4',
      parentId: 2,
    }, {
      id: 5,
      name: 'test-5',
      parentId: 2,
    }, {
      id: 6,
      name: 'test-6',
      parentId: 0,
    }, {
      id: 7,
      name: 'test-7',
      parentId: 0,
    }, {
      id: 8,
      name: 'test-8',
      parentId: 7,
    }, {
      id: 9,
      name: 'test-9',
      parentId: 8,
    }, {
      id: 10,
      name: 'test-10',
      parentId: 0,
    },
  ]

  @computed get tree() {
    const ltt = new LTT(this.list, {
      key_id: 'id',
      key_parent: 'parentId',
      key_child: 'children',
    });
    return {
      name: 'Root',
      children: ltt.GetTree(),
    };
  }
}

export default Workflow;
