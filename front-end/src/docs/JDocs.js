import React, { Component } from 'react'
import './JDocs.css';
import { Alert, Badge } from 'react-bootstrap';
import JDoc from './JDoc';
import JDocChoice from './JDocChoice';
import ApiV0 from '../services/ApiV0'
import {JConstants} from '../core/JConstants'
import {initGA, Event} from '../services/Tracking';

class JDocs extends Component {
  state = {
      docs: null,
      errorMessage: null,
      infoMessage: null,
      hasNext: true
  }

  componentDidMount() {
    initGA(JConstants.GOOGLE_ANALYTICS_CODE);
    this.searchDocs(null);
  }

  onNext() {
    Event(JConstants.GG_CATEGORY.ENTRIES, "list next", "list next")
    this.searchDocs(this.state.docs[this.state.docs.length-1]._id);
  }

  onSelect(doc) {
    Event(JConstants.GG_CATEGORY.ENTRIES, "select " + doc.nom, "select " + doc.nom)
    this.setState({doc})
  }

  onUnselect() {
    Event(JConstants.GG_CATEGORY.ENTRIES, "list back", "list back")
    this.setState({doc:null})
  }

  searchDocs(bookmark) {
    var filter = {"limit":5, "bookmark":bookmark};
    ApiV0.getDocs(filter,
         (docsResults) => {
           if (docsResults.length) {
               this.setState({
                 docs: docsResults,
                 errorMessage: null,
                 infoMessage: null,
                 hasNext: true
               })
           } else {
               this.setState({
                 infoMessage: "aucun résultat",
                 hasNext: false
               })
           }
         },
         (getErrorMessage) => {
             this.setState({errorMessage: getErrorMessage})
         }
     );
  }

  render() {
    return (
      <div className="jdocs">

        { this.state.errorMessage ?
            ( <Alert variant="warning">
                {this.state.errorMessage}
              </Alert> )
            : ( null)
        }
        { this.state.infoMessage ?
            ( <Alert variant="info">
                {this.state.infoMessage}
              </Alert> )
            : ( null)
        }
        { this.state.doc ?
          (<div> <JDoc doc={this.state.doc} onUnselect={this.onUnselect.bind(this)} /> </div> ) :
          (
          <div className="docsList">
              <h1>Entrées</h1>
              <p>
              Entrées liées au jardin
              </p>
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
                          onClick={this.onNext.bind(this)}>...</Badge></div>) :
                  (<div><Badge variant="info" size="sm mr-2 mt-2"
                                            style={{cursor: 'pointer'}}
                                            onClick={this.searchDocs.bind(this, null)}>Recharger</Badge></div>)
               }
          </div>
          )
        }
      </div>
    );
  }
}

export default JDocs;