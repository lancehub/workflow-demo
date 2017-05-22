import React from 'react';
import { observer } from 'mobx-react';
import '../styles/node.less';

@observer
class Node extends React.PureComponent {
  state = {
    collapse: false,
  }
  switchCollapse = () => {
    this.setState({
      collapse: !this.state.collapse,
    });
  }
  render() {
    const { collapse } = this.state;
    const { tree } = this.props;
    console.log(tree);
    return (
      <div className="node">
        <div className="main">
          <a className="control" href="#">
            {tree.children ? <span className="symbol" onClick={this.switchCollapse}>{collapse ? '+' : '-'}</span> : null}
            <span onClick={() => tree.addChild({ id: Math.random(), name: 'Something', children: [] })} className={collapse ? 'dot collapse' : 'dot'} />
          </a>
          <div className="name">{tree.name}</div>
        </div>
        {collapse
          ? null
          : <div className="children">
            {tree.children && tree.children.map(item => <Node key={item.id} tree={item} />)}
          </div>
        }
      </div>
    );
  }
}

export default Node;
