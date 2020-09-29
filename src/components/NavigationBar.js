import React from 'react';
import { LinkContainer } from "react-router-bootstrap";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import {Link} from "react-router-dom"
import {logout} from '../actions/loginActions';
import history from '../history';

import {connect} from 'react-redux';

class NavigationBar extends React.Component {

 

    logout(e) {
      e.preventDefault();
      this.props.logout();
      // window.location.reload();
    }

    renderUserPanel() {
      switch(this.props.login.user.roles[0]) {
        case "ROLE_MODERATOR":
          return(
            <Nav className="mr-auto">
            <Nav.Link onClick={this.logout.bind(this)}>Wyloguj się</Nav.Link>
            <NavDropdown title="Rynki">
              <LinkContainer to="/markets/new">
                <NavDropdown.Item >
                    Dodaj nowy rynek
                </NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/modMarkets">
                <NavDropdown.Item >
                    Zarządzaj rynkami
                </NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
            </Nav>
          )
        case "ROLE_PLAYER":
          return ( 
          <Nav className="mr-auto">
          <Nav.Link onClick={this.logout.bind(this)}>Wyloguj się</Nav.Link>
          </Nav>
        )
      }
    }

    renderUnloggedUserPanel() {
      return(
      <Nav className="mr-auto">
      <LinkContainer to="/rejestracja">
        <Nav.Link>Rejestracja</Nav.Link>
      </LinkContainer>
      <LinkContainer to="/login">
        <Nav.Link>Logowanie</Nav.Link>
      </LinkContainer>
     
      </Nav>
      )
      
    }

    render(){
        return(
        <Navbar bg="primary" variant="dark" sticky="top">
            <LinkContainer to='/'>
            <Navbar.Brand>PredictBom</Navbar.Brand>
            </LinkContainer>
           {this.props.login.loggedIn ? (
             this.renderUserPanel()
           ) : (
              this.renderUnloggedUserPanel()
           )}
        </Navbar>
        )
    }
}

const mapStateToProps = state => {
 return{ 
   login: state.login,
  //  isModerator: state.login.user.roles.includes("ROLE_MODERATOR")
         }
}

export default connect(mapStateToProps,{logout})(NavigationBar);