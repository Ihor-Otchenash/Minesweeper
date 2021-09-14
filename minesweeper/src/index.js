import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Minesweeper from './Minesweeper';
import { ContextProvider } from './components/Context';

ReactDOM.render(
  <ContextProvider>
    <React.StrictMode>
      <Minesweeper />
    </React.StrictMode>
  </ContextProvider>,
  document.getElementById('root')
);
