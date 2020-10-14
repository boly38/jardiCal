import React from 'react';
import './App.css';
import JBetaCorner from './core/JBetaCorner';
import JMenu from './core/JMenu';
import JHome from './core/JHome';
import JMonth from './core/JMonth';
import JDocs from './docs/JDocs';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
     <Router>
      <JBetaCorner/>
      <div className="app">
        <div className="JMenu"><JMenu /></div>
        <div className="JContent">
          <Switch>
            <Route exact path="/" component={() => <JHome />} />
            <Route exact path="/month" component={() => <JMonth />} />
            <Route exact path="/documents" component={() => <JDocs />} />
          </Switch>
        </div>
      </div>
     </Router>
  );
}

export default App;
