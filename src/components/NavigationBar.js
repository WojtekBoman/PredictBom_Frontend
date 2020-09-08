import React from 'react';
import { LinkContainer } from "react-router-bootstrap";
import { Nav, Navbar } from "react-bootstrap";
import {logout} from '../actions/loginActions';
import history from '../history';

import {connect} from 'react-redux';

class NavigationBar extends React.Component {

    logout(e) {
      e.preventDefault();
      this.props.logout();
      window.location.reload();
    }

    render(){
        return(
        <Navbar bg="primary" variant="dark">
            <LinkContainer to='/'>
            <Navbar.Brand>PredictBom</Navbar.Brand>
            </LinkContainer>
           {this.props.loggedIn ? (
            <Nav className="mr-auto">
      
                <Nav.Link onClick={this.logout.bind(this)}>Wyloguj się</Nav.Link>
           
            </Nav>
           ) : (
            <Nav className="mr-auto">
            <LinkContainer to="/rejestracja">
              <Nav.Link>Rejestracja</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/login">
              <Nav.Link>Logowanie</Nav.Link>
            </LinkContainer>
            </Nav>
           )}
        </Navbar>
        )
    }
}

const mapStateToProps = state => {
 return{ loggedIn: state.login.loggedIn }
}

export default connect(mapStateToProps,{logout})(NavigationBar);