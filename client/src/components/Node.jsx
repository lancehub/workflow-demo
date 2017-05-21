import React from 'react';
import '../styles/node.less';

const Node = ({data}) => (
  <div className="node">
    <div className="name">{data.name}</div>
    <div className="children">
      {data.children.map((item) => <Node data={item} />)}
    </div>
  </div>
);

export default Node;
