import React, { Component } from 'react'
import { Badge } from 'react-bootstrap';

class JContribChoice extends Component {

  onSelect(doc) {
    this.props.onSelect(doc);
  }

  render() {
    return (
      <div className="contrib-choice" >
        <Badge variant="secondary" size="sm mr-2 mt-2"
               style={{cursor: 'pointer'}}
               title={this.props.contrib.doc.type}
               onClick={this.onSelect.bind(this, this.props.contrib)}>
          {this.props.contrib._id.substr(17)} - {this.props.contrib.doc.nom}
        </Badge>
      </div>
    );
  }
}

export default JContribChoice;