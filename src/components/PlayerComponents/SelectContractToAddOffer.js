import React from 'react';
import {connect} from "react-redux";
import {Container,Row,Col} from 'react-bootstrap';
import ContractFilter from './ContractFilter';
import ContractList from './ContractList';
import {Range} from 'react-range';

class AddOffer extends React.Component {

    render() {
        return(
            <Container className="bg-light border rounded shadow-container create-market-container">
                <header>
                    <h4>Tworzenie oferty</h4>
                    <p className="text-muted">Wybierz kontrakt z którego chcesz dodać ofertę i w szczegółach kontraktu wybierz opcję "Dodaj ofertę"</p>
                    <hr className="my-4"></hr>
                </header>
                <Row>
                    <Col sm={12} md={3}>
                        <ContractFilter />
                    </Col>
                    <Col sm={12} md={9}>
                        <ContractList />
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default AddOffer;