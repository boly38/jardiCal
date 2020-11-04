import React, { Component } from 'react'
import { Badge, Button, Table} from 'react-bootstrap';
import { AiOutlineClose, AiOutlineCloseSquare, AiOutlineCheck } from 'react-icons/ai';
import JPeriod from '../common/JPeriod';

const ESCAPE_KEY = 27;

class JContrib extends Component {
  componentDidMount() {
    document.addEventListener("keydown", this._handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this._handleKeyDown);
  }

  _handleKeyDown = (event) => {
      switch( event.keyCode ) {
          case ESCAPE_KEY:
              this.onUnselect();
              break;
          default:
              break;
      }
  }

  onUnselect() {
    this.props.onUnselect();
  }

  onAccept() {
    this.props.onAccept();
  }

  onReject() {
    this.props.onReject();
  }

  render() {
    var contribDoc = this.props.contrib && this.props.contrib.doc ? this.props.contrib.doc : {};
    return (
      <div className="doc-selected" >
        <Table striped bordered hover>
          <thead>
            <tr>
              <th colSpan="2">
                  <span className="entryName"><span style={{color:"grey"}}>Contribution - </span>{this.props.contrib.doc.nom}</span>
                  <Badge variant="info" size="sm mr-2 mt-2"
                       style={{cursor: 'pointer'}}
                       onClick={this.onUnselect.bind(this)}
                       title="Fermer (raccourci: Escape)">
                    Fermer <AiOutlineCloseSquare />
                  </Badge>
              </th>
            </tr>
          </thead>
          <tbody>
            { contribDoc.semi && contribDoc.semi.m ? (
            <tr>
              <td>Semi</td>
              <td><JPeriod name="semi" value={contribDoc.semi.m}/></td>
            </tr>
            ) : (null) }
            { contribDoc.plantation && contribDoc.plantation.m ? (
            <tr>
              <td>Plantation</td>
              <td><JPeriod name="plantation" value={contribDoc.plantation.m}/></td>
            </tr>
            ) : (null) }
            { contribDoc.floraison && contribDoc.floraison.m ? (
            <tr>
              <td>Floraison</td>
              <td><JPeriod name="floraison" value={contribDoc.floraison.m}/></td>
            </tr>
            ) : (null) }
            { contribDoc.recolte && contribDoc.recolte.m ? (
            <tr>
              <td>Récolte</td>
              <td><JPeriod name="recolte" value={contribDoc.recolte.m}/></td>
            </tr>
            ) : (null) }
            <tr>
              <td>Nom scientifique</td>
              <td>{contribDoc.nom_scientifique}</td>
            </tr>
            <tr>
              <td>Famille</td>
              <td>{contribDoc.familles.join(' - ')}</td>
            </tr>
            <tr>
              <td>Type</td>
              <td>{contribDoc.type.join(' - ')}</td>
            </tr>
          </tbody>
        </Table>
        <Button variant="success" size="sm" className="mr-2"
                onClick={this.onAccept.bind(this)}
                >Accepter <AiOutlineCheck /></Button>
        <Button variant="secondary" size="sm" className="mr-2"
                onClick={this.onReject.bind(this)}
                >Refuser <AiOutlineClose /></Button>
      </div>
    );
  }
}

export default JContrib;