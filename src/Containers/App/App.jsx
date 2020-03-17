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
          <Route path="/chart">
            <ChartPage />
          </Route>
          <Route exact path="/">
            <CounterPage />
          </Route>
        </Switch>

      </div>
    </Router>
  );
}

export default App;
