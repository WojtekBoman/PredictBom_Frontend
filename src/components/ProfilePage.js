import React from 'react';
import {connect} from 'react-redux';
import {Alert,Container,Form, Button,Spinner} from 'react-bootstrap';


class ProfilePage extends React.Component {

    render() {
        return(
            <Container className="bg-light border rounded shadow-container profile-container">
                <h3>Witaj {this.props.user.username} !</h3>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.login.user
    }
}

export default connect(mapStateToProps)(ProfilePage);