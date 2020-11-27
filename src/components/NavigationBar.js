import React from 'react';
import { LinkContainer } from "react-router-bootstrap";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMoneyBillWave,faStar} from '@fortawesome/free-solid-svg-icons';
import {Link} from "react-router-dom"
import {logout} from '../actions/loginActions';
import history from '../history';
import {fetchPlayer} from '../actions/playerActions';
import _ from 'lodash';

import {connect} from 'react-redux';

class NavigationBar extends React.Component {

    

    componentDidMount() {
      if(this.props.login.loggedIn && this.props.login.user.roles[0] === "ROLE_PLAYER"){
          this.props.fetchPlayer(this.props.login.user.username);
      }
    }

    logout(e) {
      e.preventDefault();
      this.props.logout();
      // window.location.reload();
    }

    renderRankingLink() {
      return(
        <LinkContainer to="/ranking">
          <Nav.Link>Ranking</Nav.Link>
        </LinkContainer>
      )
    }

    renderUserPanel() {
      switch(this.props.login.user.roles[0]) {
        case "ROLE_MODERATOR":
          return(
            <Nav className="mr-auto">
              <LinkContainer to="/profile">
                <Nav.Link>
                  {this.props.login.user.username}
                </Nav.Link>
              </LinkContainer>  
            <Nav.Link onClick={this.logout.bind(this)}>Wyloguj się</Nav.Link>
            <NavDropdown title="Rynki">
              <LinkContainer to="/markets/new">
                <NavDropdown.Item >
                    Dodaj nowy rynek
                </NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/markets">
                <NavDropdown.Item >
                    Rynki publiczne
                </NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/markets/private">
                <NavDropdown.Item >
                    Rynki nieopublikowane
                </NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
            {this.renderRankingLink()}
            </Nav>
          )
        case "ROLE_PLAYER":
          return ( 
          <Nav className="mr-auto">
             <LinkContainer to="/profile">
                <Nav.Link>
                  {this.props.login.user.username}
                </Nav.Link>
              </LinkContainer> 
          <Nav.Link onClick={this.logout.bind(this)}>Wyloguj się</Nav.Link>
          <LinkContainer to="/markets">
                <Nav.Link>
                    Rynki
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/offers">
                <Nav.Link>
                    Oferty
                </Nav.Link>
              </LinkContainer>
            <LinkContainer to="/contracts">
                <Nav.Link>
                    Kontrakty
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/transactions">
                <Nav.Link>
                    Transakcje
                </Nav.Link>
              </LinkContainer>
              {this.renderRankingLink()}
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
      <LinkContainer to="/markets">
                <Nav.Link>
                    Rynki
                </Nav.Link>
              </LinkContainer>
      {this.renderRankingLink()}
      </Nav>
      )
      
    }

    renderData = () => {
      if(!_.isEmpty(this.props.player)){
        return(
          <Navbar.Collapse className="justify-content-end">
          <Navbar.Text style={{marginRight:"10px"}}>
              <FontAwesomeIcon icon={faMoneyBillWave} /> Budżet: {Math.round((this.props.player.budget + Number.EPSILON) * 100) / 100} 
          </Navbar.Text>
        </Navbar.Collapse>
        )
      }
    }

    render(){
        return(
        <Navbar bg="primary" variant="dark" sticky="top" collapseOnSelect>
            <LinkContainer to='/'>
            <Navbar.Brand>PredictBom</Navbar.Brand>
            </LinkContainer>
           {this.props.login.loggedIn ? (
             this.renderUserPanel()
           ) : (
              this.renderUnloggedUserPanel()
           )}
           {this.renderData()}
        </Navbar>
        )
    }
}

const mapStateToProps = state => {
 return{ 
   login: state.login,
   player: state.player,
   loading: state.loading.FETCH_PLAYER
         }
}

export default connect(mapStateToProps,{logout,fetchPlayer})(NavigationBar);