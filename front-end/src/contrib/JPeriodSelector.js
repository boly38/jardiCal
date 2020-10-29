import React, { Component } from 'react'
import {  Button, ButtonToolbar, ButtonGroup, Nav, Navbar } from 'react-bootstrap';
import { AiOutlineCloseSquare, AiOutlineCheck } from 'react-icons/ai';

class JPeriodSelector extends Component {
  state = {
      enabled: false,
      selected: []
  }

  onActivate() {
    this.setState({enabled:true});
  }

  onDeactivate() {
    this.setState({enabled:false});
  }

  toggleOption(e) {
    const key = e.target.value; // e.g. '1'
    var curSelection = this.state.selected;
    if (this.isSelected(key)) {
      curSelection.splice(curSelection.indexOf(key), 1);
    } else {
      curSelection.push(key);
    }
    this.setState({ selected: curSelection }, () => {
      if (!this.props.onChange) {
        throw new Error("JPeriodSelector need onChange(field, value) handler as property");
      }
      // DEBUG // console.info("onChange(",this.props.field,curSelection,")")
      this.props.onChange(this.props.field, curSelection);
    });
  }

  isSelected(month) {
    return this.state.selected && this.state.selected.includes(month)
  }

  getVariantStyle(key) {
   return this.isSelected(key) ? 'primary' : 'default';
  }

  render() {
    return this.state.enabled ? (
  <Navbar bg="light" variant="light">
    <Nav className="mr-auto">
      <Navbar.Text className="mr-2">Mois</Navbar.Text>
      <ButtonToolbar aria-label="Choix des mois de la période">
        <ButtonGroup className="mr-2" aria-label="Hiver" multiple>
          <Button onClick={this.toggleOption.bind(this)} value='1' variant={this.getVariantStyle('1')}>1</Button>
          <Button onClick={this.toggleOption.bind(this)} value='2' variant={this.getVariantStyle('2')}>2</Button>
          <Button onClick={this.toggleOption.bind(this)} value='3' variant={this.getVariantStyle('3')}>3</Button>
        </ButtonGroup>
        <ButtonGroup className="mr-2" aria-label="Printemps">
          <Button onClick={this.toggleOption.bind(this)} value='4' variant={this.getVariantStyle('4')}>4</Button>
          <Button onClick={this.toggleOption.bind(this)} value='5' variant={this.getVariantStyle('5')}>5</Button>
          <Button onClick={this.toggleOption.bind(this)} value='6' variant={this.getVariantStyle('6')}>6</Button>
        </ButtonGroup>
        <ButtonGroup className="mr-2" aria-label="Été">
          <Button onClick={this.toggleOption.bind(this)} value='7' variant={this.getVariantStyle('7')}>7</Button>
          <Button onClick={this.toggleOption.bind(this)} value='8' variant={this.getVariantStyle('8')}>8</Button>
          <Button onClick={this.toggleOption.bind(this)} value='9' variant={this.getVariantStyle('9')}>9</Button>
        </ButtonGroup>
        <ButtonGroup className="mr-2" aria-label="Automne">
          <Button onClick={this.toggleOption.bind(this)} value='10' variant={this.getVariantStyle('10')}>10</Button>
          <Button onClick={this.toggleOption.bind(this)} value='11' variant={this.getVariantStyle('11')}>11</Button>
          <Button onClick={this.toggleOption.bind(this)} value='12' variant={this.getVariantStyle('12')}>12</Button>
        </ButtonGroup>
        <Navbar.Text className="ml-2">Période de {this.props.name}</Navbar.Text>
        <ButtonGroup className="mr-2" aria-label="Actions">
          <Button onClick={this.onDeactivate.bind(this)} variant='secondary'
                  size="sm" className="ml-2">Désactiver <AiOutlineCloseSquare /></Button>
        </ButtonGroup>
      </ButtonToolbar>
    </Nav>
  </Navbar>

    ) : (
  <Navbar bg="light" variant="light">
    <Nav>
      <ButtonToolbar aria-label="Choix des mois de la période">
        <ButtonGroup className="mr-2" aria-label="Actions">
          <Button onClick={this.onActivate.bind(this)} variant='info'
                  size="sm" className="ml-2">Ajouter une période de {this.props.name}<AiOutlineCheck className="ml-2"/></Button>
        </ButtonGroup>
      </ButtonToolbar>
    </Nav>
  </Navbar>
    );
  }
}

export default JPeriodSelector;