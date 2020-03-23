import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import 'normalize.css';
import './App.css';

import Header from '../Components/Header';
import CounterPage from './CounterPage';
import RankPage from './RankPage';
import ChartPage from './ChartPage';
import DoaPage from './DoaPage';
import AboutPage from './AboutPage';
import NotFoundPage from './NotFoundPage';
import NavBar from '../Components/NavBar';

const App = () => {
  return (
    <Router>
      <div className="container">
        <Header />

        <Switch>
          <Route exact path="/">
            <CounterPage />
          </Route>

          <Route path="/rank">
            <RankPage />
          </Route>

          <Route path="/chart">
            <ChartPage />
          </Route>

          <Route path="/doa">
            <DoaPage />
          </Route>

          <Route path="/about">
            <AboutPage />
          </Route>

          <Route exact path="*">
            <NotFoundPage />
          </Route>
        </Switch>
        
        <NavBar />
      </div>
    </Router>
  );
}

export default App;
