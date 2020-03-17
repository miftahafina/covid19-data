import React from 'react';

import 'normalize.css';
import './App.css';

import Header from '../../Components/Header/Header';
// import CounterPage from '../CounterPage/CounterPage';
import ChartPage from '../ChartPage/ChartPage';

const App = () => {
  return (
    <div className="container">
      <Header />
      {/* <CounterPage /> */}
      <ChartPage />
    </div>
  );
}

export default App;
