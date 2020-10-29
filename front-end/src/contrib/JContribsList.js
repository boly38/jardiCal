import React, { Component } from 'react'
import JContribChoice from './JContribChoice';

class JContribsList extends Component {

  onSelect(doc) {
    var evt = "select " + doc.doc.nom;
    console.info(evt);
    // TODO // Event(JConstants.GG_CATEGORY.ENTRIES, evt, evt)
    // this.setState({doc});
  }

  render() {
    return (
        <div className="contribsList">
          { this.props.docs && this.props.docs.length ?
            ( <div>
              { this.props.docs.map( (doc, index) => {
                  return( <JContribChoice  key={index} index={index} doc={doc} onSelect={this.onSelect.bind(this)} /> )
              }) }
              </div>
            ) :
            ( null )
          }
        </div>
    );
  }
}
export default JContribsList;