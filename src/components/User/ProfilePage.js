import React from 'react';
import {connect} from 'react-redux';
import {Alert,Container,Form, Button,Spinner,Row,Col} from 'react-bootstrap';
import {fetchPlayer} from '../../actions/playerActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import { LinkContainer } from "react-router-bootstrap";
import {logout} from '../../actions/loginActions';

class ProfilePage extends React.Component {

    componentDidMount() {
        if(this.props.user.roles[0] === "ROLE_PLAYER") {
            console.log(this.props.user)
            this.props.fetchPlayer(this.props.user.username)
        }
    }

    renderContentByRole = (role) => {
        switch(role) {
            case "ROLE_PLAYER":
                return(
                    <div>
                            <Button className="profile-button" variant="outline-dark">Przeglądaj rynki</Button>
                            <Button className="profile-button" variant="outline-dark">Przeglądaj kontrakty</Button>
                            <Button className="profile-button" variant="outline-dark">Przeglądaj twoje oferty</Button>
                            <Button className="profile-button" variant="outline-dark">Przeglądaj transakcje</Button>
                    </div>
                )
            case "ROLE_MODERATOR":
                return(
                    <div>
                        <Button className="profile-button" variant="outline-dark">Przeglądaj swoje rynki</Button>
                        <Button className="profile-button" variant="outline-dark">Dodaj nowy rynek</Button>
                    </div>
                )
            case "ROLE_ADMIN":
                return(
                    <div>
                        <Button className="profile-button" variant="outline-dark">Dodaj moderatora</Button>
                    </div>
                )
        }
    }

    render() {
        return(
            <Container className="bg-light border rounded shadow-container profile-container">
                <h3>Witaj {this.props.user.username} !</h3>
                <hr className="my-4"></hr>
                <Row>
                    <Col sm={6} className="text-center">
                        <FontAwesomeIcon size="6x" icon={faUser} />
                    </Col>
                    <Col>
                        <h5><b>Imię:</b> {this.props.user.firstName}</h5>
                        <h5><b>Nazwisko:</b> {this.props.user.surname}</h5>
                        <h5><b>Email:</b> {this.props.user.email}</h5>
                    </Col>
                </Row>
                <hr className="my-4"></hr>
                <div className="text-center">
                <LinkContainer to="/markets">
                <Button className="profile-button" variant="outline-dark">Przeglądaj swoje rynki</Button>
                </LinkContainer>
                <LinkContainer to="/markets/new">
                <Button className="profile-button" variant="outline-dark">Dodaj nowy rynek</Button>
                </LinkContainer>
                <LinkContainer to="/editPassword">
                <Button className="profile-button" variant="outline-dark">Zmień hasło</Button>
                </LinkContainer>
                <Button onClick={() => this.props.logout()} className="profile-button" variant="outline-dark">Wyloguj się</Button>
                </div>
            </Container>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        user: state.login.user
    }
}


export default connect(mapStateToProps,{fetchPlayer,logout})(ProfilePage);