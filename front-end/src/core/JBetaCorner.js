import React, { Component } from 'react'
import './JBetaCorner.css';

class JBetaCorner extends Component {
  render() {
    var tooltip = (this.props.version)?this.props.version:"";
    return (
  <div className="corner-ribbon bottom-right sticky blue shadow">Alpha <sup>{tooltip}</sup></div>
    );
  }
}

export default JBetaCorner;
