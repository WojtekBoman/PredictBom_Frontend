import React from 'react';
import {connect} from 'react-redux';
import {Form} from 'react-bootstrap';

class SolveMultiBetMarketForm extends React.Component {
    render() {
        return(
            <Form>
                <Form.Label className="my-1 mr-2">
                    Wybierz właściwy zakład
                </Form.Label>
                <Form.Control
                    as="select"
                >
                <option value="0">
                    Wybierz zakład...
                </option>
                {this.props.bets.map(bet => <option>{bet.chosenOption}</option>)}
                </Form.Control>
            </Form>
        )
    }
}

export default connect()(SolveMultiBetMarketForm);