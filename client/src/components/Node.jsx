import React from 'react';
import '../styles/node.less';

const Node = ({ tree }) => (
  <div className="node">
    {console.log(tree)}
    <div className="name">{tree.name}</div>
    <div className="children">
      {tree.children && tree.children.length
        ? tree.children.map((item) => <Node key={item.id} tree={item} />)
        : null
      }
    </div>
  </div>
);

export default Node;
