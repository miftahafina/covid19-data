import React from 'react';

import 'normalize.css';
import './App.css';

import Header from '../../Components/Header/Header';
import CounterPage from '../CounterPage/CounterPage';

const App = () => {
  return (
    <div className="container">
      <Header />
      <CounterPage />
    </div>
  );
}

export default App;
