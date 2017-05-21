import React from 'react';
import { Provider } from 'mobx-react';
import '../styles/index.less';
import * as stores from '../stores';
import Canvas from './Canvas';

const App = () => (
  <Provider {...stores}>
    <Canvas />
  </Provider>
);

export default App;
