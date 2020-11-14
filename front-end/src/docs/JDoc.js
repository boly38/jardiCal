import React, { Component } from 'react'
import { Table, Button} from 'react-bootstrap';
import { AiOutlineCloseSquare, AiOutlineForm, AiOutlineDelete } from 'react-icons/ai';
import './JDoc.css';
import JPeriod from '../common/JPeriod';
import ApiV0 from '../services/ApiV0'

const ESCAPE_KEY = 27;
const DOWN_ARROW = 40;
const SUPPR_KEY = 46;

class JDoc extends Component {
  constructor(props) {
      super(props);
      this.state = {'editLink': '/contrib?id='+this.props.doc._id};
  }

  componentDidMount() {
    document.addEventListener("keydown", this._handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this._handleKeyDown);
  }

  _handleKeyDown = (event) => {
      switch( event.keyCode ) {
          case ESCAPE_KEY: this.onUnselect(); break;
          case DOWN_ARROW: this.onEdit(); break;
          case SUPPR_KEY: this.onRemove(); break;
          default:
            // DEBUG // console.info(event.keyCode);
            break;
      }
  }

  onUnselect() {
    this.props.onUnselect();
  }

  onEdit() {
    document.location = this.state.editLink;
  }

  onRemove() {
    ApiV0.removeDocument(this.props.doc._id)
      .then((deleteResult) => this.onUnselect())
      .catch((removeErrorMessage) => {
        console.error(removeErrorMessage);
      });
  }

  render() {
    return (
      <div className="doc-selected" >
        <table border='0' cellPadding='5px'><tbody><tr>
         <td valign='top'>
          <span className="entryName">{this.props.doc.nom}</span>
         </td>
         { this.props.roles && this.props.roles.includes('admin') ? (
          <td>
           <Button variant="secondary" size="sm mr-2 mt-2" href={this.state.editLink}
                   onClick={this.onEdit.bind(this)}
                   title="Modifier (raccourci: <Flèche du bas>)"
              >Modifier <AiOutlineForm /></Button>
          </td>
         ) : (null) }
         { this.props.roles && this.props.roles.includes('owner') ? (
          <td>
           <Button variant="secondary" size="sm mr-2 mt-2"
                   onClick={this.onRemove.bind(this)}
                   title="Supprimer (raccourci: <Suppr>)"
              >Supprimer <AiOutlineDelete /></Button>
          </td>
         ) : (null) }
         <td>
          <Button variant="secondary" size="sm mr-2 mt-2"
                                     onClick={this.onUnselect.bind(this)}
                                     title="Fermer (raccourci: Escape)"
                             >Fermer <AiOutlineCloseSquare /></Button>
         </td>
        </tr></tbody></table>
        <Table striped bordered hover>
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
              <td>{this.props.doc.familles.join(' - ')}</td>
            </tr>
            <tr>
              <td>Type</td>
              <td>{this.props.doc.type.join(' - ')}</td>
            </tr>
          </tbody>
        </Table>

      </div>
    );
  }
}

export default JDoc;