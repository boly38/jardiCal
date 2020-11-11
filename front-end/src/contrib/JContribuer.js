import React, { Component } from 'react'
import { Alert, Badge, Button } from 'react-bootstrap';
// import ApiV0 from '../services/ApiV0'
import {JConstants} from '../core/JConstants'
import {initGA, Event} from '../services/Tracking';
import JContrib from './JContrib';
import JAddContrib from './JAddContrib';
import JSearchEntries from '../common/JSearchEntries';
import JContribsList from './JContribsList';
import ApiV0 from '../services/ApiV0'

const ESCAPE_KEY = 27;
const UP_ARROW = 38;
const RIGHT_ARROW = 39;

class JContribuer extends Component {
  state = {
      contribs: null,
      errorMessage: null,
      infoMessage: null,
      add: false,
      hasNext: true,
      searchString: '',
      bookmark: '',
      searchLocked: false, // toogle search form
      docTypes: [],
      docFamilies: []
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
    var jc = this;
    if (newEntry && newEntry.doc && newEntry.doc.nom) {
      this.setState({contribs: null, add:false, infoMessage: newEntry.doc.nom + " ajouté"}, () => jc.searchContribs());
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
    this.setState({contribs: null, searchString:'',bookmark:'', searchLocked: false}, () => jc.searchContribs())
  }

  onSearch(e) {
    if (e) {
      e.preventDefault();
    }
    var jc = this;
    var evt = "search " + this.state.searchString;
    Event(JConstants.GG_CATEGORY.ENTRIES, evt, evt)
    this.setState({contribs: null, searchString:this.state.searchString, bookmark:'', searchLocked:true}, () => jc.searchContribs());
  }

  onNext() {
    var jc = this;
    Event(JConstants.GG_CATEGORY.ENTRIES, "list next contributions", "list next contributions")
    var lastContribId = this.state.contribs[this.state.contribs.length-1]._id;
    this.setState({contribs: null, bookmark:lastContribId, searchLocked: false}, () => jc.searchContribs());
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
      this._refreshTypes();
      this._refreshFamilies();
  }

  _refreshTypes() {
      ApiV0.getTypes()
        .then((typesResult) => {
          this.setState({ docTypes: typesResult });
        })
        .catch((getErrorMessage) => console.info("getTypes", getErrorMessage));
  }

  _refreshFamilies() {
      ApiV0.getFamilies()
        .then((familiesResult) => {
          this.setState({ docFamilies: familiesResult });
        })
        .catch((getErrorMessage) => console.info("getFamilies", getErrorMessage));
  }

  onSelect(contrib) {
    var evt = "select " + contrib.doc.nom;
    Event(JConstants.GG_CATEGORY.ENTRIES, evt, evt)
    this.setState({contrib})
  }

  onUnselect() {
    var jc = this;
    var evt = "unselect" + this.state.contrib.doc.nom;
    Event(JConstants.GG_CATEGORY.ENTRIES, evt, evt)
    this.setState({contrib:null}, () => jc.searchContribs())
  }

  onAccept() {
    var jc = this;
    console.info("onAccept", this.state.contrib);
    ApiV0.acceptContrib(this.state.contrib._id)
    .catch((err) => { this.setState({errorMessage: err}, () => this._refocus()); })
    .then((acceptedContrib) => {
      this.setState({contribs: null, searchString:'',bookmark:'', searchLocked: false, contrib:null,
                     infoMessage: acceptedContrib + ' contribution acceptée' }, () => jc.searchContribs())
    });
  }

  onReject() {
    var jc = this;
    console.info("onReject", this.state.contrib);
    ApiV0.rejectContrib(this.state.contrib._id)
    .catch((err) => { this.setState({errorMessage: err}, () => this._refocus()); })
    .then((rejectedContrib) => {
      this.setState({contribs: null, searchString:'',bookmark:'', searchLocked: false, contrib:null,
                     infoMessage: rejectedContrib + ' contribution rejetée'}, () => jc.searchContribs())
    });
  }

  render() {
    return (
      <div className="jcontrib">
        { this.state.errorMessage ?(<Alert variant="warning">{this.state.errorMessage}</Alert>) : (null) }
        { this.state.infoMessage ?(<Alert variant="info">{this.state.infoMessage}</Alert>) : (null) }
        <div className="contribContent">
        { this.state.add === true
           ?(<JAddContrib onCancel={this.onCancelAdd.bind(this)}
                          onAdded={this.onAdded.bind(this)}
                          docTypes={this.state.docTypes}
                          docFamilies={this.state.docFamilies}
                   />)
           :
          this.state.contrib
           ?(<JContrib contrib={this.state.contrib}
                       onUnselect={this.onUnselect.bind(this)}
                       onAccept={this.onAccept.bind(this)}
                       onReject={this.onReject.bind(this)}
                   /> )
           :(<div className="contribShow">
                <p>Contributions</p>
                <JSearchEntries searchLocked={this.state.searchLocked}
                                searchString={this.state.searchString}
                                unLock={this.onUnlock.bind(this)}
                                unSearch={this.onUnSearch.bind(this)}
                                onSearchStringUpdated={(newSearchString) => this.setState({ searchString:newSearchString})}
                                onSearch={this.onSearch.bind(this)}
                                ref={(input) => { this.searchEntries = input; }}/>

                <JContribsList docs={this.state.contribs} onSelect={this.onSelect.bind(this)}/>
                { this.state.hasNext ?
                    (<div><Badge variant="info" size="sm mr-2 mt-2"
                            style={{cursor: 'pointer'}}
                            onClick={this.onNext.bind(this)}
                            title="Suivant (raccourci: <Flèche droite>)"
                            >...</Badge></div>) :
                    (<div><Badge variant="info" size="sm mr-2 mt-2"
                            style={{cursor: 'pointer'}}
                            onClick={this.onReload.bind(this)}
                            title="Raccourci (raccourci: <Flèche du haut>)"
                            >Recharger</Badge></div>)
                 }
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

export default JContribuer;