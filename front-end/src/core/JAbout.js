import React, { Component } from 'react'
import { Table} from 'react-bootstrap';
// import ApiV0 from '../services/ApiV0'
import { initGA } from '../services/Tracking';
import { GiSpottedBug, GiFlowerPot } from 'react-icons/gi';
import { GrWorkshop, GrHeroku } from 'react-icons/gr';
import { GoMarkGithub } from 'react-icons/go';
import { DiMongodb } from 'react-icons/di';

class JAbout extends Component {
  componentDidMount() {
    initGA();
  }

  render() {
    var apiVersion = this.props.about ? this.props.about.version.api : "N/A";
    var frontEndVersion = this.props.about ? this.props.about.version['front-end'] : "N/A";
    var jlVersion = this.props.about ? this.props.about.version['jardi-lib'] : "N/A";
    return (
      <div className="jabout">
        <div className="aboutContent">
        <h1><GiFlowerPot/> À propos</h1>
        <p>
          <b><GiFlowerPot/> JardiCal</b> est un service en ligne gratuit et sans publicité en version <GrWorkshop/> alpha .<br/>
          Ce service gratuit est possible grâce aux plans gratuits mis à disposition des projets open-source :<br/>
        </p>
        <ul style={{'marginLeft': '40px'}}>
          <li>Le code source est présent sur <a href="https://github.com" target="_dep"><GoMarkGithub/> Github</a>,</li>
          <li>L&apos;application est hébergée par <a href="https://heroku.com/" target="_dep"><GrHeroku/> Heroku</a>,</li>
          <li>La base de données par <a href="https://cloud.mongodb.com/" target="_dep"><DiMongodb/>Cloud MongoDB</a>.</li>
        </ul>
        <br/>
        <p>
          <code>version <GrWorkshop/> alpha</code> - le service est en cours de construction
          &#160;et peut comporter <a href="https://github.com/boly38/jardiCal/issues" target="_dep">des bugs <GiSpottedBug/></a>,
          &#160;ou connaître de longues périodes d&apos;indisponibilité.
        </p>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Composant</th>
              <th>Détails</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><a href="https://github.com/boly38/jardiCal" target="_dep">JardiCal</a> version</td>
              <td>{apiVersion} (front-end: {frontEndVersion})</td>
            </tr>
            <tr>
              <td><a href="https://github.com/boly38/jardiLib" target="_dep">JardiLib</a> version</td>
              <td>{jlVersion}</td>
            </tr>
          </tbody>
        </Table>
        </div>
      </div>
    );
  }
}

export default JAbout;