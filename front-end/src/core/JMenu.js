import React, { Component } from 'react'
import './JMenu.css';
import { Navbar, Nav} from 'react-bootstrap';
// import { Navbar, Nav, Form, FormControl, Button} from 'react-bootstrap';
import {JConstants} from './JConstants'
import {initGA, Event} from '../services/Tracking';


class JMenu extends Component {
  constructor(props) {
      super(props);
      this.onMenuClic = this.onMenuClic.bind(this);
  }

  componentDidMount() {
    initGA(JConstants.GOOGLE_ANALYTICS_CODE);
  }

  onMenuClic(menuEntry) {
    console.info("onMenuClic", menuEntry)
    Event(JConstants.GG_CATEGORY.MENU, menuEntry, "Menu clic on " + menuEntry)
  }

  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/" onClick={this.onMenuClic.bind(this, 'logo')}>JardiCal</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/documents" onClick={this.onMenuClic.bind(this, 'entrées')}>Entrées</Nav.Link>
            {/* <Nav.Link href="/month">Par mois</Nav.Link> */}
          </Nav>
          {/*
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form>
          */}
        </Navbar.Collapse>
      </Navbar>

    );
  }

}

export default JMenu;
/*
            <div>
              <ul className="jmenu">
                  <li><NavLink activeClassName={"active"} exact={true}  to="/">Home</NavLink></li>
                  <li><NavLink activeClassName={"active"} to="/month">Par mois</NavLink></li>
                </ul>
            </div>
*/