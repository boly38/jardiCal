import React, { Component } from 'react'
import './JDocs.css';
import { Alert, Badge } from 'react-bootstrap';
import JSearchEntries from '../common/JSearchEntries';
import JDoc from './JDoc';
import JDocChoice from './JDocChoice';
import ApiV0 from '../services/ApiV0'
import {JConstants} from '../core/JConstants'
import {initGA, Event} from '../services/Tracking';

const ESCAPE_KEY = 27;
const UP_ARROW = 38;
const RIGHT_ARROW = 39;

class JDocs extends Component {
  state = {
      docs: null,
      errorMessage: null,
      infoMessage: null,
      hasNext: true,
      searchString: '',
      bookmark: '',
      searchLocked: false // toogle search form
  }

  componentDidMount() {
    // DEBUG // console.info('componentDidMount')
    initGA(JConstants.GOOGLE_ANALYTICS_CODE);
    this._refocus();
    this.searchDocs();
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
              this.onNext();
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

  onReload() {
    var jd = this;
    this.setState({searchString:'',bookmark:'', searchLocked: false}, () => jd.searchDocs())
  }

  onSearch(e) {
    if (e) {
      e.preventDefault();
    }
    var jd = this;
    var evt = "search " + this.state.searchString;
    Event(JConstants.GG_CATEGORY.ENTRIES, evt, evt)
    this.setState({searchString:this.state.searchString,bookmark:'',searchLocked:true}, () => jd.searchDocs());
  }

  onNext() {
    var jd = this;
    Event(JConstants.GG_CATEGORY.ENTRIES, "list next", "list next")
    var lastDocId = this.state.docs[this.state.docs.length-1]._id;
    this.setState({bookmark:lastDocId,searchLocked: false}, () => jd.searchDocs());
  }

  onSelect(doc) {
    var evt = "select " + doc.nom;
    Event(JConstants.GG_CATEGORY.ENTRIES, evt, evt)
    this.setState({doc})
  }

  onUnselect() {
    var jd = this;
    var evt = "unselect" + this.state.doc.nom;
    Event(JConstants.GG_CATEGORY.ENTRIES, evt, evt)
    this.setState({doc:null}, () => jd.searchDocs())
  }

  onUnlock() {
    this.setState({searchLocked: false}, () => this._refocus());
  }

  onUnSearch() {
    this.onReload();
  }

  searchDocs() {
    var bookmark = this.state.bookmark;
    var searchString = this.state.searchString;
    var filter = {"limit":5, };
    if (bookmark && bookmark !== '') {
      filter.bookmark = bookmark;
    }
    if (searchString && searchString !== '') {
      filter.nom = searchString;
    }
    // DEBUG // console.info("searchDocs", filter);
    ApiV0.getDocs(filter)
      .then((docsResults) => {
        if (docsResults.length) {
          this.setState({ docs: docsResults, errorMessage: null, infoMessage: null, hasNext: true },
            () => this._refocus());
        } else {
          var newState = {hasNext: false};
          if (bookmark == null || bookmark === '') {
            newState.infoMessage = "aucun résultat";
            newState.docs = null;
          }
          this.setState(newState, () => this._refocus())
        }
      })
      .catch((getErrorMessage) => { this.setState({errorMessage: getErrorMessage}, () => this._refocus()); });
  }

  render() {
    return (
      <div className="jdocs">

        { this.state.errorMessage ? (<Alert variant="warning">{this.state.errorMessage}</Alert>) : (null) }
        <div className="infoBox">{this.state.infoMessage}&#160;</div>
        { this.state.doc ?
                  (<div> <JDoc doc={this.state.doc} onUnselect={this.onUnselect.bind(this)} /> </div> ) :
                  (
                  <div className="docsList">
                      <p>Entrées liées au jardin</p>
                      <JSearchEntries searchLocked={this.state.searchLocked}
                                      searchString={this.state.searchString}
                                      unLock={this.onUnlock.bind(this)}
                                      unSearch={this.onUnSearch.bind(this)}
                                      onSearchStringUpdated={(newSearchString) => this.setState({ searchString:newSearchString})}
                                      onSearch={this.onSearch.bind(this)}
                                      ref={(input) => { this.searchEntries = input; }}/>

                      { this.state.docs && this.state.docs.length ?
                        ( <div>
                          { this.state.docs.map( (doc, index) => { return(
                               <JDocChoice key={index} index={index} doc={doc} onSelect={this.onSelect.bind(this)} />)
                          }) }
                          </div>
                        ) :
                        ( null )
                      }
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
                  </div>
                  )
                }
      </div>
    );
  }
}

export default JDocs;