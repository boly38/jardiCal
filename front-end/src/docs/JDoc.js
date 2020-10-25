import React, { Component } from 'react'
import { Badge, Table} from 'react-bootstrap';
import { AiOutlineCloseSquare } from 'react-icons/ai';
import './JDoc.css';
import JPeriod from './JPeriod';

class JDoc extends Component {

  onUnselect() {
    this.props.onUnselect();
  }

  render() {
    return (
      <div className="doc-selected" >
        <Table striped bordered hover>
          <thead>
            <tr>
              <th colSpan="2">
                  <span className="entryName">{this.props.doc.nom}</span>
                  <Badge variant="info" size="sm mr-2 mt-2"
                       style={{cursor: 'pointer'}}
                       onClick={this.onUnselect.bind(this)}>
                    Fermer <AiOutlineCloseSquare />
                  </Badge>
              </th>
            </tr>
          </thead>
          <tbody>
            { this.props.doc.semi && this.props.doc.semi.m ? (
            <tr>
              <td>Semi</td>
              <td><JPeriod name="semi" value={this.props.doc.semi.m}/></td>
            </tr>
            ) : (null) }
            { this.props.doc.plantation && this.props.doc.plantation.m ? (
            <tr>
              <td>Plantation</td>
              <td><JPeriod name="plantation" value={this.props.doc.plantation.m}/></td>
            </tr>
            ) : (null) }
            { this.props.doc.floraison && this.props.doc.floraison.m ? (
            <tr>
              <td>Floraison</td>
              <td><JPeriod name="floraison" value={this.props.doc.floraison.m}/></td>
            </tr>
            ) : (null) }
            { this.props.doc.recolte && this.props.doc.recolte.m ? (
            <tr>
              <td>Récolte</td>
              <td><JPeriod name="recolte" value={this.props.doc.recolte.m}/></td>
            </tr>
            ) : (null) }
            <tr>
              <td>Nom scientifique</td>
              <td>{this.props.doc.nom_scientifique}</td>
            </tr>
            <tr>
              <td>Famille</td>
              <td>{this.props.doc.familles}</td>
            </tr>
            <tr>
              <td>Type</td>
              <td>{this.props.doc.type}</td>
            </tr>
          </tbody>
        </Table>

      </div>
    );
  }
}

export default JDoc;