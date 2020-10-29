import React, { Component } from 'react'
import { Alert, Button} from 'react-bootstrap';
// import ApiV0 from '../services/ApiV0'
import {JConstants} from '../core/JConstants'
import {initGA, Event} from '../services/Tracking';
import JAddContrib from './JAddContrib';
import JSearchEntries from '../common/JSearchEntries';
import JContribsList from './JContribsList';
import ApiV0 from '../services/ApiV0'

const ESCAPE_KEY = 27;
const UP_ARROW = 38;
const RIGHT_ARROW = 39;

class JContrib extends Component {
  state = {
      contribs: null,
      errorMessage: null,
      infoMessage: null,
      add: false,
      hasNext: true,
      searchString: '',
      bookmark: '',
      searchLocked: false // toogle search form
  }

  componentDidMount() {
    // DEBUG // console.info('componentDidMount')
    initGA(JConstants.GOOGLE_ANALYTICS_CODE);
    this.searchContribs();
    this._refocus();
    document.addEventListener("keydown", this._handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this._handleKeyDown);
  }

  _handleKeyDown = (event) => {
      switch( event.keyCode ) {
          case ESCAPE_KEY:
              this.onUnSearch();
              break;
          case RIGHT_ARROW:
              // this.onNext();
              break;
          case UP_ARROW:
              this.onReload();
              break;
          default:
              break;
      }
  }

  _refocus() {
    if (this.searchEntries) {
          this.searchEntries.focus();
    }
  }

  onContrib() {
    var evt = "open add contrib";
    Event(JConstants.GG_CATEGORY.CONTRIB, evt, evt);
    this.setState({add:true})
  }

  onCancelAdd() {
    this.setState({add:false})
  }

  onAdded(newEntry) {
    if (newEntry && newEntry.doc && newEntry.doc.nom) {
      this.setState({add:false, infoMessage: newEntry.doc.nom + " ajouté"});
      return;
    }
    console.info("no newEntry?")
  }

  onUnlock() {
    this.setState({searchLocked: false}, () => this._refocus());
  }

  onUnSearch() {
    this.onReload();
  }

  onReload() {
    var jc = this;
    this.setState({searchString:'',bookmark:'', searchLocked: false}, () => jc.searchContribs())
  }

  onSearch(e) {
    if (e) {
      e.preventDefault();
    }
    var jc = this;
    var evt = "search " + this.state.searchString;
    Event(JConstants.GG_CATEGORY.ENTRIES, evt, evt)
    this.setState({searchString:this.state.searchString,bookmark:'',searchLocked:true}, () => jc.searchContribs());
  }

  searchContribs() {
    var bookmark = this.state.bookmark;
    var searchString = this.state.searchString;
    var filter = {"limit":5, };
    if (bookmark && bookmark !== '') {
      filter.bookmark = bookmark;
    }
    if (searchString && searchString !== '') {
      filter.nom = searchString;
    }
    // DEBUG // console.info("searchContribs", filter);
    ApiV0.getContribs(filter)
      .then((contribsResults) => {
        if (contribsResults.length) {
          this.setState({ contribs: contribsResults, errorMessage: null, infoMessage: null, hasNext: true },
            () => this._refocus());
        } else {
          var newState = {hasNext: false};
          if (bookmark == null || bookmark === '') {
            newState.infoMessage = "aucune contribution";
            newState.docs = null;
          }
          this.setState(newState, () => this._refocus())
        }
      })
      .catch((getErrorMessage) => { this.setState({errorMessage: getErrorMessage}, () => this._refocus()); });
  }

  render() {
    return (
      <div className="jcontrib">
        { this.state.errorMessage ?(<Alert variant="warning">{this.state.errorMessage}</Alert>) : (null) }
        { this.state.infoMessage ?(<Alert variant="info">{this.state.infoMessage}</Alert>) : (null) }
        <div className="contribContent">
        { this.state.add === true
           ?(<JAddContrib onCancel={this.onCancelAdd.bind(this)} onAdded={this.onAdded.bind(this)} />)
           :(
              <div className="contribShow">
                <p>Contributions</p>
                <JSearchEntries searchLocked={this.state.searchLocked}
                                searchString={this.state.searchString}
                                unLock={this.onUnlock.bind(this)}
                                unSearch={this.onUnSearch.bind(this)}
                                onSearchStringUpdated={(newSearchString) => this.setState({ searchString:newSearchString})}
                                onSearch={this.onSearch.bind(this)}
                                ref={(input) => { this.searchEntries = input; }}/>

                <JContribsList docs={this.state.contribs}/>
                <Button variant="secondary" size="sm" className="mr-2" onClick={this.onContrib.bind(this)}
                    >Contribuer</Button>
              </div>
            )
        }

        </div>
      </div>
    );
  }
}

export default JContrib;