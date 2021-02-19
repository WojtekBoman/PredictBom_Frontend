import React from "react";
import { connect } from "react-redux";
import { Container, Button, Row, Col } from "react-bootstrap";
import { fetchPlayer } from "../../actions/playerActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../../actions/loginActions";
import "./ProfilePage.scss";

class ProfilePage extends React.Component {
  componentDidMount() {
    if (this.props.user && this.props.user.roles.includes("ROLE_PLAYER")) {
      this.props.fetchPlayer(this.props.user.username);
    }
  }

  renderContentByRole = (role) => {
    switch (role) {
      case "ROLE_PLAYER":
        return (
          <div>
            <LinkContainer to="/markets">
              <Button className="profile-button" variant="outline-dark">
                Przeglądaj rynki
              </Button>
            </LinkContainer>
            <LinkContainer to="/contracts">
              <Button className="profile-button" variant="outline-dark">
                Przeglądaj kontrakty
              </Button>
            </LinkContainer>
            <LinkContainer to="/offers">
              <Button className="profile-button" variant="outline-dark">
                Przeglądaj twoje oferty
              </Button>
            </LinkContainer>
            <LinkContainer to="/transactions">
              <Button className="profile-button" variant="outline-dark">
                Przeglądaj transakcje
              </Button>
            </LinkContainer>
          </div>
        );
      case "ROLE_MODERATOR":
        return (
          <div>
            <LinkContainer to="/markets">
              <Button className="profile-button" variant="outline-dark">
                Przeglądaj rynki prognostyczne
              </Button>
            </LinkContainer>
            <LinkContainer to="/createMarket">
              <Button
                id="addNewMarket"
                className="profile-button"
                variant="outline-dark"
              >
                Dodaj nowy rynek
              </Button>
            </LinkContainer>
          </div>
        );
      case "ROLE_ADMIN":
        return (
          <div>
            <Button className="profile-button" variant="outline-dark">
              Dodaj moderatora
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  renderContent() {
    if(this.props.user) {
      return (
        <Container className="bg-light border rounded shadow-container profile-container">
          <h3>Witaj {this.props.user.username} !</h3>
          <hr className="my-4"></hr>
          <Row>
            <Col sm={6} className="text-center">
              <FontAwesomeIcon size="6x" icon={faUser} />
            </Col>
            <Col>
              <h5>
                <b>Imię:</b> {this.props.user.firstName}
              </h5>
              <h5>
                <b>Nazwisko:</b> {this.props.user.surname}
              </h5>
              <h5>
                <b>Email:</b> {this.props.user.email}
              </h5>
              {this.props.player.budget && (
                <h5>
                  <b>Budżet: </b>
                  {Math.round((this.props.player.budget + Number.EPSILON) * 100) /
                    100}{" "}
                  $
                </h5>
              )}
            </Col>
          </Row>
          <hr className="my-4"></hr>
          <div className="text-center">
            {this.renderContentByRole(this.props.user.roles[0])}
            <LinkContainer to="/ranking">
              <Button className="profile-button" variant="outline-dark">
                Wyświetl ranking
              </Button>
            </LinkContainer>
            <LinkContainer to="/editPassword">
              <Button
                id="openEditPasswordButton"
                className="profile-button"
                variant="outline-dark"
              >
                Zmień hasło
              </Button>
            </LinkContainer>
            <Button
              onClick={() => this.props.logout()}
              className="profile-button"
              variant="outline-dark"
            >
              Wyloguj się
            </Button>
          </div>
        </Container>
      );
    }
    }

  render() {
    return(
      <div>
        {this.renderContent()}
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    user: state.login.user,
    player: state.player,
  };
};

export default connect(mapStateToProps, { fetchPlayer, logout })(ProfilePage);
