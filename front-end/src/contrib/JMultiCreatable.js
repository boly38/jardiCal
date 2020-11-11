import React, { Component } from 'react'
import CreatableSelect from 'react-select/creatable';
import { Alert } from 'react-bootstrap';

class JMultiCreatable extends Component {
  state = {
      selected: this.props.preset ? this.props.preset : [],
      errorMessage: '',
      selectedOptions : this.props.preset ? this.props.preset.map( v => { return {'label':v, 'value':v }}) : []
  }

  handleChange = (newValue: any, actionMeta: any) => {
    var flatValues = newValue ? newValue.map(nw => nw.value) : [];
    var maxIntValue = this.props.max ? parseInt(this.props.max, 10) : 10;
    if (flatValues.length > maxIntValue) {
      this.setState({errorMessage: 'maximum ' + this.props.max + ' entrées !',
                     selectedOptions:newValue.slice(0, maxIntValue)});
      return;
    }
    console.group('Value Changed');
    console.log(newValue, actionMeta);
    console.log(`action: ${actionMeta.action}`);
    console.info("onChange(",this.props.field,flatValues,")")
    console.groupEnd();
    this.setState({selectedOptions:newValue, errorMessage:''}, () => this.props.onChange(this.props.field, flatValues) );
  };

  render() {
    var typeOptions = this.props.docTypes ? this.props.docTypes.map(dt => { return {'value':dt, 'label': dt}; }) : [];
     /* [{ value: 'chocolate', label: 'Chocolate' }] */
     /*
     MenuPlacer Warnings => https://github.com/JedWatson/react-select/issues/3703
     fix merged on 27 aug => wait next release (last release 3.1.0 on 22 March dont include the fix)
     */
    var multiPlaceholder = 'Choisir ' + this.props.max ? '(maximum ' + this.props.max + ' choix)' : '';
    var multiCreateLabel = (inputValue) => { return 'Créer \'' + inputValue+ '\'';}
    return (
      <div>
        { this.state.errorMessage ? ( <Alert variant="warning">{this.state.errorMessage}</Alert> ) : ( null) }
        <CreatableSelect
          isMulti
          name={ this.props.name }
          onChange={ this.handleChange }
          options={typeOptions}
          value={ this.state.selectedOptions }
          placeholder={ multiPlaceholder}
          formatCreateLabel={ multiCreateLabel }
          ref={(input) => { this.multiCreatable = input; }}
        />
      </div>
    );
  }
}

export default JMultiCreatable;