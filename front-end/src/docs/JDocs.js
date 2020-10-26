import React, { Component } from 'react'
import './JDocs.css';
import { Alert, Badge } from 'react-bootstrap';
import { Form, FormControl, Button} from 'react-bootstrap';
import { AiOutlineCloseSquare } from 'react-icons/ai';
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
      searchLocked: false
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
    if (this.entriesSearch) {
          this.entriesSearch.focus();
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
    var evt = "search " + this.entriesSearch.value;
    Event(JConstants.GG_CATEGORY.ENTRIES, evt, evt)
    this.setState({searchString:this.entriesSearch.value,bookmark:'',searchLocked:true}, () => jd.searchDocs());
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
    this.setState({searchLocked: false}, () => this.entriesSearch.focus());
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
    ApiV0.getDocs(filter,
         (docsResults) => {
           if (docsResults.length) {
               this.setState({
                 docs: docsResults,
                 errorMessage: null,
                 infoMessage: null,
                 hasNext: true
               }, () => this._refocus())
           } else {
               var newState = {hasNext: false};
               if (bookmark == null || bookmark === '') {
                 newState.infoMessage = "aucun résultat";
                 newState.docs = null;
               }
               this.setState(newState, () => this._refocus())
           }
         },
         (getErrorMessage) => {
             this.setState({errorMessage: getErrorMessage}, () => this._refocus())
         }
     );
  }

  render() {
    const searchString = this.state.searchString;
    return (
      <div className="jdocs">

        { this.state.errorMessage ?
            ( <Alert variant="warning">
                {this.state.errorMessage}
              </Alert> )
            : ( null)
        }
        <div className="infoBox">{this.state.infoMessage}&#160;</div>
        { this.state.doc ?
                  (<div> <JDoc doc={this.state.doc} onUnselect={this.onUnselect.bind(this)} /> </div> ) :
                  (
                  <div className="docsList">
                      <p>
                      Entrées liées au jardin
                      </p>
                      { this.state.searchLocked ?
                      (<div className="mb-3">
                        <Badge variant="secondary" size="sm mr-2 mt-2"
                           onClick={this.onUnlock.bind(this)}>search : {this.state.searchString}</Badge>
                        &#160;
                        <AiOutlineCloseSquare
                                    onClick={this.onUnSearch.bind(this)}
                                    style={{cursor: 'pointer'}}
                                    title="Annuler la recherche (raccourci: Escape)"/>
                       </div>) :
                      (<Form inline className="mb-3" onSubmit={this.onSearch.bind(this)}>
                           <FormControl key="entriesSearch"
                                        type="text"
                                        placeholder="Recherche par nom"
                                        value={searchString}
                                        className="mr-sm-2"
                                        onChange={e => this.setState({ searchString:e.target.value})}
                                        ref={(input) => { this.entriesSearch = input; }}
                           />
                           <Button key="entriesSearchButton"
                                   variant="outline-success"
                                   onClick={this.onSearch.bind(this)}
                                   title="Lancer la recherche (raccourci: Enter)"
                                   >Rechercher</Button>
                       </Form>
                      )}


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