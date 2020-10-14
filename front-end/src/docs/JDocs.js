import React, { Component } from 'react'
import { Alert } from 'react-bootstrap';
import JDocChoice from './JDocChoice';
import ApiV0 from '../services/ApiV0'

class JDocs extends Component {
  state = {
      docs: null,
      errorMessage: null,
      infoMessage: null,
  }

  componentDidMount() {
    console.log("fetch json");
    this.searchDocs();
  }

  searchDocs() {
    var filter = {"limit":10};
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
                 infoMessage: "aucun résultat"
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
       </div>
      </div>
    );
  }
}

export default JDocs;