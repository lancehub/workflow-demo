import React from 'react';
import { observer } from 'mobx-react';
import ContentEditable from 'react-contenteditable';
import '../styles/node.less';

@observer
class Node extends React.PureComponent {

  componentDidMount = () => {
    if (this.props.tree.focus) {
      this.input.htmlEl.focus();
      this.props.tree.focus = false;
    }
  }
  handleChange = (evt) => {
    this.props.tree.edit(evt.target.value);
  }
  handleKeyPress = (evt) => {
    const { tree } = this.props;
    const code = evt.keyCode || evt.which;
    if (code === 13) { // this is enter
      evt.preventDefault();
      const newTree = {
        id: Math.random(),
        name: '',
        focus: true,
      };
      if (tree.parent && tree.children.length === 0) {
        tree.parent.appendChildAt(newTree, tree.index);
      } else {
        tree.prependChild(newTree);
      }
    }
  }
  handleKeyDown = (evt) => {
    const { tree } = this.props;
    const code = evt.keyCode || evt.which;
    if (code === 8) { // this is backspace
      if (tree.name === '') {
        evt.preventDefault();
        tree.delete();
      }
    }
    if (code === 9) { // this is tab
      evt.preventDefault();
      if (evt.shiftKey) { // shift + tab
        const parent = tree.parent;
        parent.parent.appendChildAt({ ...tree, focus: true }, parent.index);
        tree.delete();
      } else {
        const index = tree.index;
        if (index !== 0) {
          const prev = tree.prev;
          prev.appendChild({ ...tree, focus: true });
          tree.delete();
        }
      }
    }
  }
  render() {
    const { tree } = this.props;
    return (
      <div className="node">
        <div className="main">
          <a className="control" href="#">
            {tree.children.length ? <span className="symbol" onClick={tree.toggleCollapse}>{tree.collapsed ? '+' : '-'}</span> : null}
            <span onClick={() => tree.appendChild({ id: Math.random(), name: 'Something', children: [] })} className={tree.collapsed ? 'dot collapse' : 'dot'} />
          </a>
          <div className="name">
            <ContentEditable
              ref={me => this.input = me}
              html={tree.name}
              disabled={false}
              onChange={this.handleChange}
              onKeyPress={this.handleKeyPress}
              onKeyDown={this.handleKeyDown}
            />
          </div>
        </div>
        {tree.collapsed
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
