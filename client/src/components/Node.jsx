import React from 'react';
import { observer } from 'mobx-react';
import ContentEditable from 'react-contenteditable';
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
  editContent = (evt) => {
    const { tree } = this.props;
    const content = evt.target.value;
    tree.edit(evt.target.value);
  }
  handleKeyPress = (evt) => {
    const { tree } = this.props;
    const code = evt.keyCode || evt.which;
    if(code == 13) {
      evt.preventDefault();
      tree.addChild({
        id: Math.random(),
        name: '',
        children: [],
      });
    }
  }
  render() {
    const { collapse } = this.state;
    const { tree } = this.props;
    console.log(tree, tree.name);
    return (
      <div className="node">
        <div className="main">
          <a className="control" href="#">
            {tree.children ? <span className="symbol" onClick={this.switchCollapse}>{collapse ? '+' : '-'}</span> : null}
            <span onClick={() => tree.addChild({ id: Math.random(), name: 'Something', children: [] })} className={collapse ? 'dot collapse' : 'dot'} />
          </a>
          <div className="name">
            <ContentEditable
              html={tree.name}
              disabled={false}
              onChange={this.editContent}
              onKeyPress={this.handleKeyPress}
            />
          </div>
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
