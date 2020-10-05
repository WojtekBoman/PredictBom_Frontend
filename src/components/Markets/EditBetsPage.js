import React from 'react';
import {connect} from 'react-redux';
import {Container,Form} from 'react-bootstrap';

class EditBetsPage extends React.Component {
    render(){
        return( <Container className="bg-light border rounded shadow-container create-market-container">
            <h3>Edytuj zakłady</h3>
            <Form>
            
            </Form>
        </Container>)
    }
}



export default connect()(EditBetsPage);