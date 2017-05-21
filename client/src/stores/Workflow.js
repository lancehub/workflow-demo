import { observable, action } from 'mobx';

class Workflow {
  @observable data = {
    name: 'Testing',
    children: [
      {
        name: 'Testing 1',
        children: [],
      },
      {
        name: 'Testing 2',
        children: [],
      },
    ],
  }
}

export default Workflow;
