import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Minesweeper from './Minesweeper';
import reportWebVitals from './reportWebVitals';
import { ContextProvider } from './components/Context';

ReactDOM.render(
  <ContextProvider>
    <React.StrictMode>
      <Minesweeper />
    </React.StrictMode>
  </ContextProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
