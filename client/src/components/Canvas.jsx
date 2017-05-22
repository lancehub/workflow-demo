import React from 'react';
import { toJS } from 'mobx';
import { inject } from 'mobx-react';
import Node from './Node';
import '../styles/canvas.less';

@inject('tree')
class Canvas extends React.PureComponent {
  render() {
    return (
      <div className="container">
        <div className="canvas">
          <Node tree={this.props.tree} />
        </div>
        <div className="footer">
          <a onClick={() => console.log(toJS(this.props.tree))}>Export</a>
        </div>
      </div>
    );
  }
}

export default Canvas;
