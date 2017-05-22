import React from 'react';
import { inject, observer } from 'mobx-react';
import Node from './Node';

@inject('tree')
class Canvas extends React.PureComponent {
  render() {
    const { tree } = this.props;
    return (
      <div className="canvas">
        <Node tree={tree} />
      </div>
    );
  }
}

export default Canvas;
