import React from 'react';
import { inject } from 'mobx-react';
import Node from './Node';

@inject('tree')
class Canvas extends React.PureComponent {
  render() {
    return (
      <div className="canvas">
        <Node tree={this.props.tree} />
      </div>
    );
  }
}

export default Canvas;
