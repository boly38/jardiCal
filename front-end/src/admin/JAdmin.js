import React, { Component } from 'react'
import { Alert, Button, Table} from 'react-bootstrap';
import ApiV0 from '../services/ApiV0'
import {JConstants} from '../core/JConstants'
import {initGA, Event} from '../services/Tracking';

class JAdmin extends Component {
  state = {
      docs: null,
      errorMessage: null,
      infoMessage: null,
  }

  constructor(props) {
      super(props);
      this.onAddSample = this.onAddSample.bind(this);
      this.onRemoveDocuments = this.onRemoveDocuments.bind(this);
      this.onRemoveContribs = this.onRemoveContribs.bind(this);
  }

  componentDidMount() {
    initGA(JConstants.GOOGLE_ANALYTICS_CODE);
  }

  onRemoveDocuments() {
      var admin = this;
      ApiV0.removeAllDocs()
      .then((nbDeleted) => {
        var actionDone = nbDeleted + " échantillon(s) supprimé(s)";
        Event(JConstants.GG_CATEGORY.ADMIN, "removeAllDocs", actionDone)
        admin.props.onActionDone(actionDone);
      })
      .catch((getErrorMessage) => {
        this.setState({errorMessage: getErrorMessage})
      });
  }

  onRemoveContribs() {
      var admin = this;
      ApiV0.removeAllContribs()
      .then((nbDeleted) => {
        var actionDone = nbDeleted + " contribution(s) supprimé(s)";
        Event(JConstants.GG_CATEGORY.ADMIN, "removeAllContribs", actionDone)
        admin.props.onActionDone(actionDone);
      })
      .catch((getErrorMessage) => {
        this.setState({errorMessage: getErrorMessage})
      });
  }

  onAddSample() {
      var admin = this;
      ApiV0.samples()
        .then((nbSample) => {
          // DEBUG// console.info("samplesResult",nbSample);
          var actionDone = nbSample + " échantillons en base";
          Event(JConstants.GG_CATEGORY.ADMIN, "samples", actionDone)
          admin.props.onActionDone(actionDone);
        })
        .catch((getErrorMessage) => { this.setState({errorMessage: getErrorMessage}); } );
  }

  render() {
    var docName = null;
    var docCount = null;
    var contribName = null;
    var contribCount = null;
    var isOwner = this.props.about && this.props.about.roles.includes('owner');
    var isAdmin = this.props.about && this.props.about.roles.includes('admin');
    if (this.props.about) {
      docName = this.props.about.dbName
      docCount = this.props.about.documents
      contribName = this.props.about.adminDbName
      contribCount = this.props.about.contributions
    }
    return (
      <div className="jadmin">
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
        <div className="adminContent">
        <h1>Configuration</h1>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Base</th>
              <th>Nom</th>
              <th>Nombre d&apos;entrées</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Utilisateur</td>
              <td>{docName}</td>
              <td>{docCount}</td>
              <td>
                { isOwner ? ( <Button variant="secondary" size="sm" className="mr-2"
                                      onClick={this.onAddSample.bind(this)}
                                      >Ajout d&apos;un échantillon</Button> ) : (null) }
                { isOwner && docCount > 0 ? (<Button variant="secondary" size="sm"
                                      onClick={() => { if (window.confirm('Êtes-vous sûr de vouloir supprimer les documents ?')) this.onRemoveDocuments() } }
                                      >Supprimer</Button> ) : (null) }
              </td>
            </tr>
            { contribName ?
            (<tr>
              <td>Contribution</td>
              <td>{contribName}</td>
              <td>{contribCount}</td>
              <td>
                { isAdmin && contribCount > 0 ? (<Button variant="secondary" size="sm"
                                      onClick={() => { if (window.confirm('Êtes-vous sûr de vouloir supprimer les contributions ?')) this.onRemoveContribs() } }
                                      >Supprimer</Button> ) : (null) }
              </td>
            </tr>) : (null)
            }
          </tbody>
        </Table>
        </div>
      </div>
    );
  }
}

export default JAdmin;