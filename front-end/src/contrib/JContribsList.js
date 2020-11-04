import React, { Component } from 'react'
import JContribChoice from './JContribChoice';

class JContribsList extends Component {

  onSelect(contrib) {
    if (this.props.onSelect) {
      this.props.onSelect(contrib);
    }
  }

  render() {
    return (
        <div className="contribsList">
          { this.props.docs && this.props.docs.length ?
            ( <div>
              { this.props.docs.map( (contrib, index) => {
                  return( <JContribChoice  key={index} index={index} contrib={contrib} onSelect={this.onSelect.bind(this)} /> )
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