import React from 'react';
import '../styles/index.less';
import Node from './Node';

const data = {
  name: 'Testing',
  children: [
    {
      name: 'Testing 1',
      children: [],
    },
    {
      name: 'Testing 2',
      children: [],
    },
  ]
}

const App = () => (
  <div className="canvas">
    <Node data={data} />
  </div>
);

export default App;
