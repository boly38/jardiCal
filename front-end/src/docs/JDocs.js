import React, { Component } from 'react'
import { Alert } from 'react-bootstrap';
import { Badge } from 'react-bootstrap';
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

  constructor(props) {
      super(props);
      this.onNext = this.onNext.bind(this);
  }


  componentDidMount() {
    initGA(JConstants.GOOGLE_ANALYTICS_CODE);
    this.searchDocs(null);
  }

  onNext() {
    Event(JConstants.GG_CATEGORY.ENTRIES, "list", "next")
    this.searchDocs(this.state.docs[this.state.docs.length-1]._id);
  }

  searchDocs(bookmark) {
    var filter = {"limit":5, "bookmark":bookmark};
    ApiV0.getDocs(filter,
         (docsResults) => {
           if (docsResults.length) {
               this.setState({
                 docs: docsResults,
                 errorMessage: null,
                 infoMessage: null
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
       <div className="docsList">
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

        <h1>Entrées</h1>
        <p>
        Entrées liées au jardin
        </p>
        { this.state.docs && this.state.docs.length ?
          ( <div>
            { this.state.docs.map( (doc, index) => { return( <JDocChoice key={index} index={index} doc={doc}/>) }) }
            </div>
          ) :
          ( null )
        }
        { this.state.hasNext ?
            (<div><Badge variant="info" size="sm mr-2 mt-2"
                    style={{cursor: 'pointer'}}
                    onClick={this.onNext.bind(this)}>...</Badge></div>) : (null) }
       </div>
      </div>
    );
  }
}

export default JDocs;