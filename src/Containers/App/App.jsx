import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import 'normalize.css';
import './App.css';

import Header from '../../Components/Header/Header';
import CounterPage from '../CounterPage/CounterPage';
import ChartPage from '../ChartPage/ChartPage';

const App = () => {
  return (
    <Router>
      <div className="container">
        <Header />

        <Switch>
          <Route exact path="/">
            <CounterPage />
          </Route>
          <Route path="/chart">
            <ChartPage />
          </Route>
        </Switch>

      </div>
    </Router>
  );
}

export default App;
