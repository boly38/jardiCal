import React, { Component } from 'react'
import { Alert, Button, Form } from 'react-bootstrap';
import { AiOutlineCloseSquare, AiOutlineCheck } from 'react-icons/ai';
import {initGA, Event} from '../services/Tracking';
import ApiV0 from '../services/ApiV0'
import JPeriodSelector from './JPeriodSelector';
import JMultiCreatable from './JMultiCreatable';
import { JConstants } from '../core/JConstants'
import { Formik } from 'formik';
import * as Yup from 'yup';

const ESCAPE_KEY = 27;
const ENTER_KEY = 13;

class JAddContrib extends Component {
  state = {
      errorMessage: null,
  }

  componentDidMount() {
    initGA(JConstants.GOOGLE_ANALYTICS_CODE);
    this._refocus()
    document.addEventListener("keydown", this._handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this._handleKeyDown);
  }

  _refocus() {
    this.contribNom.focus()
  }

  _handleKeyDown = (event) => {
      switch( event.keyCode ) {
          case ESCAPE_KEY:
              this.onCancelAdd();
              break;
          case ENTER_KEY:
              // this.handleAddSubmit();
              break;
          default:
              // DEBUG // console.info("key", event.keyCode)
              break;
      }
  }

  _isNotEmpty(myVar) {
    return Array.isArray(myVar)&&myVar.length>0;
  }

  handleAddSubmit(entryToAdd) {
    console.info("handleAddSubmit ", entryToAdd)
    entryToAdd.semi = (this._isNotEmpty(entryToAdd.semi)) ? {m:  entryToAdd.semi } : undefined;
    entryToAdd.plantation = (this._isNotEmpty(entryToAdd.plantation)) ? {m:  entryToAdd.plantation } : undefined;
    entryToAdd.floraison = (this._isNotEmpty(entryToAdd.floraison)) ? {m:  entryToAdd.floraison } : undefined;
    entryToAdd.recolte = (this._isNotEmpty(entryToAdd.recolte)) ? {m:  entryToAdd.recolte } : undefined;
    ApiV0.contribute(entryToAdd)
      .then((addResult) => {
           console.info("addResult", addResult)
           this.props.onAdded(addResult);
         })
      .catch((addErrorMessage) => {
           this.setState({errorMessage: addErrorMessage}, () => this._refocus())
         });
  }

  onCancelAdd() {
    var evt = "cancel add contrib";
    Event(JConstants.GG_CATEGORY.CONTRIB, evt, evt);
    this.props.onCancel();
  }

  handlePeriodChange(name, value){
    // DEBUG //
    console.info("handlePeriodChange", name, value);
  }

  render() {

    const addContribSchema = Yup.object({
      contribNom: Yup.string().required(),
      contribNomScientifique: Yup.string().required()
    });


    return (
<div className="add-contrib" >

      <h1>Ajout d&apos;une entrée</h1>
        { this.state.errorMessage ?
            ( <Alert variant="warning">
                {JSON.stringify(this.state.errorMessage)}
              </Alert> )
            : ( null)
        }
      {/*
        DOC https://formik.org/
        https://react-bootstrap.netlify.app/components/forms/#forms-validation-libraries
       */}
      <div className="add-contrib-form">
        <Formik validationSchema={addContribSchema}
                onSubmit={this.handleAddSubmit.bind(this)}
                initialValues={{
                  contribNom: 'MaFleur',
                  contribNomScientifique: 'MaFleurLatine'
                }}
        >
         {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            touched,
            isValid,
            errors,
            setFieldValue
          }) => (
             <Form noValidate onSubmit={handleSubmit}>
              <Form.Group controlId="addContrib.Nom">
                <Form.Label>Nom</Form.Label>
                <Form.Control
                        required
                        type="text"
                        key="contribNom"
                        name="contribNom"
                        value={values.contribNom}
                        onChange={handleChange}
                        isValid={touched.contribNom && !errors.contribNom}
                        isInvalid={!!errors.contribNom}
                        ref={(input) => { this.contribNom = input; }}
                        placeholder="nom commun court"
                        />
                <Form.Control.Feedback>Valide</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">Merci de choisir un nom</Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="addContrib.NomScientifique">
                <Form.Label>Nom scientifique</Form.Label>
                <Form.Control
                        required
                        type="text"
                        key="contribNomScientifique"
                        name="contribNomScientifique"
                        value={values.contribNomScientifique}
                        onChange={handleChange}
                        isValid={touched.contribNomScientifique && !errors.contribNomScientifique}
                        isInvalid={!!errors.contribNomScientifique}
                        ref={(input) => { this.contribNomScientifique = input; }}
                        placeholder="nom scientifique (latin)"
                        />
                <Form.Control.Feedback>Valide</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">Le nom scientifique est requis</Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="addContrib.Types">
                <Form.Label>Type(s)</Form.Label>
                <JMultiCreatable field="type"
                                 name="type"
                                 max="3"
                                 onChange={setFieldValue}
                                 docTypes={this.props.docTypes}
                                 />
              </Form.Group>
              <Form.Group controlId="addContrib.Families">
                <Form.Label>Famille(s)</Form.Label>
                <JMultiCreatable field="familles"
                                 name="familles"
                                 max="5"
                                 onChange={setFieldValue}
                                 docTypes={this.props.docFamilies}
                                 />
              </Form.Group>
              <Form.Group controlId="addContrib.Semi">
                <JPeriodSelector field="semi" name="semi" onChange={setFieldValue}/>
              </Form.Group>
              <Form.Group controlId="addContrib.Plantation">
                <JPeriodSelector field="plantation" name="plantation" onChange={setFieldValue}/>
              </Form.Group>
              <Form.Group controlId="addContrib.Floraison">
                <JPeriodSelector field="floraison" name="floraison" onChange={setFieldValue}/>
              </Form.Group>
              <Form.Group controlId="addContrib.Récolte">
                <JPeriodSelector field="recolte" name="récolte" onChange={setFieldValue}/>
              </Form.Group>

              <Button type="submit" variant="primary" size="sm" className="mr-2"
                      >Ajouter <AiOutlineCheck /></Button>
              <Button variant="secondary" size="sm" className="mr-2"
                      onClick={this.onCancelAdd.bind(this)}>Annuler <AiOutlineCloseSquare /></Button>
            </Form>

          )}
        </Formik>
      </div>
  {/* TODO: Famille / Type */}
</div>
    );
  }
}

export default JAddContrib;