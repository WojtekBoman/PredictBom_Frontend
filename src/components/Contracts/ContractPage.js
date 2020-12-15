import React from 'react';
import {connect} from 'react-redux';
import {Tab,Row,Col,Nav, Container} from 'react-bootstrap';
import ContractFilter from './ContractFilter'
import ContractList from './ContractList'
import BackButton from '../../helpers/BackButton';

class ContractPage extends React.Component {
    render() {
        return(
            <Container className="bg-light border rounded shadow-container create-market-container">
            <header style={{display:"inline-block"}}>
            <BackButton />
              <h2 style={{display:"inline-block"}}>Twoje kontrakty</h2>
            </header>
            <hr className="my-4"></hr>
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row>
            <Col sm={12} md={3}>
                <ContractFilter />
            </Col>
            <Col sm={12} md={9}>
                <ContractList />
            </Col>
        </Row>
        </Tab.Container>
        </Container>
        )
    }
}

export default connect()(ContractPage);