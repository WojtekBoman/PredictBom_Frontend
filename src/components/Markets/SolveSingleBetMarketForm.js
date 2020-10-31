import React from 'react';
import {connect} from 'react-redux';
import {Form} from 'react-bootstrap';

class SolveSingleBetMarketForm extends React.Component {
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
                        Wybierz opcję dla zakładu "{this.props.bets[0].chosenOption}"
                    </option>
                    <option value={true}>
                        Tak
                    </option>
                    <option value={false}>
                        Nie
                    </option>
             <Form.Control
                        as="select"
                    >
                    </Form.Control>
            </Form.Control>
        </Form>
        )
    }
}

export default connect()(SolveSingleBetMarketForm);