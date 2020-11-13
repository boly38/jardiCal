import React, { Component } from 'react'
import './JMenu.css';
import { Navbar, Nav, NavLink, NavDropdown } from 'react-bootstrap';
import {JConstants} from './JConstants'
import {initGA, Event} from '../services/Tracking';
import { GiFlowerPot } from 'react-icons/gi';

class JMenu extends Component {
  constructor(props) {
      super(props);
      this.onMenuClic = this.onMenuClic.bind(this);
  }

  componentDidMount() {
    initGA();
  }

  onMenuClic(menuEntry) {
    console.info("onMenuClic", menuEntry)
    Event(JConstants.GG_CATEGORY.MENU, menuEntry, "Menu clic on " + menuEntry)
  }


  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand as={NavLink}
                      active={(document.location.pathname === '/')}
                      href="/"
                      onClick={this.onMenuClic.bind(this, 'logo')}><GiFlowerPot/> JardiCal</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={NavLink}
                      active={document.location.pathname.startsWith('/docs')}
                      href="/docs"
                      onClick={this.onMenuClic.bind(this, 'entrées')}
                      >Entrées</Nav.Link>
            {/* <Nav.Link href="/month">Par mois</Nav.Link> */}
        { this.props.roles && this.props.roles.includes('admin') ?
          ( <Nav.Link as={NavLink}
                      active={document.location.pathname.startsWith('/contrib')}
                      href="/contrib"
                      onClick={this.onMenuClic.bind(this, 'contrib')}
                      >Contribuer</Nav.Link> )
          : ( null)
        }
        { this.props.roles && this.props.roles.includes('owner') ?
          ( <Nav.Link as={NavLink}
                      active={document.location.pathname.startsWith('/owner')}
                      href="/owner"
                      onClick={this.onMenuClic.bind(this, 'admin')}
                      >Admin</Nav.Link> )
          : ( null)
        }
          </Nav>
          <Nav>
            <NavDropdown alignRight title="Aide" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/about" onClick={this.onMenuClic.bind(this, 'about')}>À propos</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="https://github.com/boly38/jardiCal" target="_dep">Github - source</NavDropdown.Item>
            </NavDropdown>
          </Nav>
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