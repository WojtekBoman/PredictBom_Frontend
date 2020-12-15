import React from 'react';
import {connect} from "react-redux";
import {Container,Row,Col} from 'react-bootstrap';
import ContractFilter from './ContractFilter';
import ContractList from './ContractList';
import {Range} from 'react-range';
import BackButton from '../../helpers/BackButton';

class UserOfferPage extends React.Component {

    render() {
        return(
            <Container className="bg-light border rounded shadow-container create-market-container">
                <header style={{display:"inline-block"}}>
                    <BackButton />
                    <h2 style={{display:"inline-block"}}>Twoje oferty</h2>
                    <p className="text-muted">Wybierz kontrakt w celu zarządzania ofertami</p>
                </header>
                <hr className="my-4"></hr>
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

export default UserOfferPage;