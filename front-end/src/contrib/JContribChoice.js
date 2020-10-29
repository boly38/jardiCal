import React, { Component } from 'react'
import { Badge } from 'react-bootstrap';

class JContribChoice extends Component {

  onSelect(doc) {
    this.props.onSelect(doc);
  }

  render() {
    return (
      <div className="contrib-choice" >
        <Badge variant="success" size="sm mr-2 mt-2"
               style={{cursor: 'pointer'}}
               title={this.props.doc.doc.type}
               onClick={this.onSelect.bind(this, this.props.doc)}>
          {this.props.doc.doc.nom}
        </Badge>
      </div>
    );
  }
}

export default JContribChoice;