import React from 'react';
import { inject, observer } from 'mobx-react';
import Node from './Node';

@inject('workflow')
@observer
class Canvas extends React.PureComponent {
  render() {
    const { workflow } = this.props;
    return (
      <div className="canvas">
        <Node tree={workflow.tree} />
      </div>
    );
  }
}

export default Canvas;
