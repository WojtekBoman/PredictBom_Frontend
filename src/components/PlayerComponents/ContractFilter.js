import React from 'react';
import { Form, Col } from 'react-bootstrap';
import {connect} from 'react-redux';

class ContractFilter extends React.Component {
    render() {
        return (
            <Form style={{width:"100%"}}>
                <header>
                    <h4>
                        Filtry
                    </h4>
                    
                </header>
                <Form.Row>
                <Form.Group as={Col} controlId="">
                {/* <Form.Label>Tytuł rynku</Form.Label> */}
                <Form.Control type="text" placeholder="Tytuł rynku" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                {/* <Form.Label>Tytuł zakładu</Form.Label> */}
                <Form.Control type="text" placeholder="Tytuł zakładu" />
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Col>
                <Form.Control placeholder="City" />
                </Col>
                <Col>
                <Form.Control placeholder="State" />
                </Col>
                <Col>
                <Form.Control placeholder="Zip" />
                </Col>
            </Form.Row>
            <hr className="my-4"></hr>
            </Form>
        )
    }
}

export default connect()(ContractFilter);