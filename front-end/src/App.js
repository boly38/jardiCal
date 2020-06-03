import React from 'react';
import './App.css';
import JMenu from './JMenu';
import JHome from './JHome';
import JMonth from './JMonth';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
     <Router>
      <div className="app">
        <div className="JMenu"><JMenu /></div>
        <div className="JContent">
          <Switch>
            <Route exact path="/" component={() => <JHome />} />
            <Route exact path="/month" component={() => <JMonth />} />
          </Switch>
        </div>
      </div>
     </Router>
  );
}

export default App;
