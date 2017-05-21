import React from 'react';
import ReactPropTypes from 'prop-types';
import '../styles/node.less';

class Node extends React.PureComponent {
  static propTypes = {
    tree: ReactPropTypes.object.isRequired,
  }
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
    return (
      <div className="node">
        <div className="main">
          <a className="control" href="#">
            {tree.children ? <span className="symbol" onClick={this.switchCollapse}>{collapse ? '+' : '-'}</span> : null}
            <span className={collapse ? 'dot collapse' : 'dot'} />
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
