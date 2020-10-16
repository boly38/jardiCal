import React, { Component } from 'react'
import './JMenu.css';
import { Navbar, Nav} from 'react-bootstrap';
// import { Navbar, Nav, Form, FormControl, Button} from 'react-bootstrap';

class JMenu extends Component {
  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">JardiCal</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/documents">Entrées</Nav.Link>
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