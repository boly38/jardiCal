import React, { Component } from 'react'
import { Badge } from 'react-bootstrap';
import { GiFireFlower, GiPear, GiCarrot, GiHighGrass } from 'react-icons/gi'; // https://react-icons.github.io/react-icons/icons?name=gi

class JDocChoice extends Component {
  render() {
    return (
      <div className="doc-choice" >
        {/*
        <Button variant="secondary" size="sm">
          {this.props.index} - {this.props.doc.nom} - ({this.props.doc.type})
        </Button>

        badge doc: https://react-bootstrap.github.io/components/badge/#badge-props
        */}
        <Badge variant="success" size="sm mr-2 mt-2" title={this.props.doc.type}>
          {this.props.doc.nom}
          &#160;
          { this.props.doc.type.map( (docType, index) => {
              if (docType === "fleur") {
                return ( <GiFireFlower key={index} />)
              }
              if (docType === "fruit") {
                return ( <GiPear key={index} />)
              }
              if (docType === "légume") {
                return ( <GiCarrot key={index} />)
              }
              return ( <GiHighGrass key={index} />)
            }) }
        </Badge>
      </div>
    );
  }
}

export default JDocChoice;
//onClick={(e) => this.props.onChoice(this.props.index, e)}