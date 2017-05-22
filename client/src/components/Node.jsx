import React from 'react';
import { observer } from 'mobx-react';
import ContentEditable from 'react-contenteditable';
import '../styles/node.less';

@observer
class Node extends React.PureComponent {
  
  handleEditContent = (evt) => {
    this.props.tree.edit(evt.target.value);
  }
  handleKeyPress = (evt) => {
    const { tree } = this.props;
    const code = evt.keyCode || evt.which;
    if(code == 13) {
      evt.preventDefault();
      if(tree.parent && tree.children.length == 0) {
        const index = tree.myIndex();
        tree.parent.appendChildAt({
          id: Math.random(),
          name: '',
          children: [],
          focus: true,
        }, index);
      }else{
        tree.prependChild({
          id: Math.random(),
          name: '',
          children: [],
          focus: true,
        });
      }
    }
  }
  handleKeyDown = (evt) => {
    const { tree } = this.props;
    const code = evt.keyCode || evt.which;
    if(code == 8){
      if(tree.name == ''){
        tree.delete();
      }
    }
  }
  componentDidMount = () => {
    if(this.props.tree.focus){
      this.input.htmlEl.focus();
      this.props.tree.loseFocus();
    }
  }
  render() {
    const { tree } = this.props;
    return (
      <div className="node">
        <div className="main">
          <a className="control" href="#">
            {tree.children ? <span className="symbol" onClick={tree.toggleCollapse}>{tree.collapsed ? '+' : '-'}</span> : null}
            <span onClick={() => tree.appendChild({ id: Math.random(), name: 'Something', children: [] })} className={tree.collapsed ? 'dot collapse' : 'dot'} />
          </a>
          <div className="name">
            <ContentEditable
              ref={(me)=>this.input = me}
              html={tree.name}
              disabled={false}
              onChange={this.editContent}
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
