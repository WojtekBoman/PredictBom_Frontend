import React from 'react';
import {connect} from 'react-redux';
import {Alert,Container,Form, Button,Spinner} from 'react-bootstrap';
import {fetchPlayer} from '../../actions/playerActions';


class ProfilePage extends React.Component {

    componentDidMount() {
        if(this.props.user.roles[0] === "ROLE_PLAYER") {
            console.log(this.props.user)
            this.props.fetchPlayer(this.props.user.username)
        }
    }

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

export default connect(mapStateToProps,{fetchPlayer})(ProfilePage);