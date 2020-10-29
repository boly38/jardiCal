import React, { Component } from 'react'
import './JApp.css';
import { Alert } from 'react-bootstrap';
import JBetaCorner from './core/JBetaCorner';
import JMenu from './core/JMenu';
import JHome from './core/JHome';
import JMonth from './core/JMonth';
import JDocs from './docs/JDocs';
import JAdmin from './admin/JAdmin';
import JContrib from './contrib/JContrib';
import JAbout from './core/JAbout';
import {JConstants} from './core/JConstants'
import {PageView, initGA} from './services/Tracking';
import ApiV0 from './services/ApiV0'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';

class JApp extends Component {
  state = {
      errorMessage: null,
      about: null
  }

  constructor(props) {
      super(props);
      this.onActionDone = this.onActionDone.bind(this);
  }

  componentDidMount() {
    initGA(JConstants.GOOGLE_ANALYTICS_CODE);
    PageView();
    if (this.state.about != null || this.state.errorMessage != null) {
      return;
    }
    this.doAbout();
  }

  doAbout() {
      ApiV0.about()
        .then((aboutResults) => { this.setState({ about: aboutResults }); })
        .catch((getErrorMessage) => { this.setState({errorMessage: getErrorMessage}); });
  }

  onActionDone(actionMessage) {
    console.info("onActionDone",actionMessage);
    this.doAbout();
  }

  render() {
    var roles = [];
    if (this.state.about && this.state.about.roles) {
      roles = this.state.about.roles;
    }
    return (
     <Router>
      <JBetaCorner/>
      { this.state.about ?
         ( <JBetaCorner version={this.state.about.version.api} /> )
          : ( <JBetaCorner/> )
      }
      <div className="app">
        { this.state.errorMessage ?
            ( <Alert variant="warning">
                {this.state.errorMessage}
              </Alert> )
            : ( null)
        }
        <div className="JMenu"><JMenu roles={roles}/></div>
        <div className="JContent">
          <Switch>
            <Route exact path="/" component={() => <JHome />} />
            <Route exact path="/month" component={() => <JMonth />} />
            <Route exact path="/docs" component={() => <JDocs />} />
        { roles.includes('admin') ?
          ( <Route exact path="/contrib" component={() =>
                    <JContrib about={this.state.about} />
            } /> )
          : ( null)
        }
        { roles.includes('owner') ?
          ( <Route exact path="/owner" component={() =>
                    <JAdmin about={this.state.about} onActionDone={this.onActionDone} />
            } /> )
          : ( null)
        }
            <Route exact path="/about" component={() => <JAbout about={this.state.about}/>} />
          </Switch>
        </div>
      </div>
     </Router>
    );
  }
}

export default JApp;
