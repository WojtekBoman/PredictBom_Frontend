import React from 'react';
import {Container,Row,Col} from 'react-bootstrap';
import ContractFilter from './ContractFilter';
import ContractList from './ContractList';
import BackHeader from '../BackHeader';

class UserOfferPage extends React.Component {

    render() {
        return(
            <Container className="bg-light border rounded shadow-container create-market-container">
               <BackHeader title="Twoje oferty" />
                <p className="text-muted">Wybierz kontrakt w celu zarządzania ofertami</p>
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