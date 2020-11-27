import React from 'react';
import {connect} from "react-redux";
import {Container,Row,Col} from 'react-bootstrap';
import ContractFilter from './ContractFilter';
import ContractList from './ContractList';
import {Range} from 'react-range';

class SelectContractToAddOffer extends React.Component {

    render() {
        return(
            <Container className="bg-light border rounded shadow-container create-market-container">
                <header>
                    <h2>Twoje oferty</h2>
                    <p className="text-muted">Wybierz kontrakt w celu zarządzania ofertami</p>
                    <hr className="my-4"></hr>
                </header>
                <Row>
                    <Col sm={12} md={3}>
                        <ContractFilter offerPage={true} />
                    </Col>
                    <Col sm={12} md={9}>
                        <ContractList offerPage={true} />
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default SelectContractToAddOffer;