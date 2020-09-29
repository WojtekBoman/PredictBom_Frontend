import React from 'react';
import {Tab,Row,Col,Nav, Container,Button,InputGroup,FormControl} from 'react-bootstrap';
import MarketsList from './MarketsList';

class ModeratorMarketsPage extends React.Component {

    handleSelect() {

    }

    render() {
        return(
          //   <div>
          //   <Container className="bg-light border rounded shadow-container create-market-container">
          //   <Nav fill variant="tabs" defaultActiveKey="/home">
          //     <Nav.Item>
          //       <Nav.Link active="selected" eventKey="link-0">Rynki bez zakładów</Nav.Link>
          //     </Nav.Item>
          //     <Nav.Item>
          //       <Nav.Link eventKey="link-1">Prywatne</Nav.Link>
          //     </Nav.Item>
          //     <Nav.Item>
          //       <Nav.Link eventKey="link-2">Opublikowane</Nav.Link>
          //     </Nav.Item>
          //   </Nav>

          // </Container>
          
          // </div>
          <Container className="bg-light border rounded shadow-container create-market-container">
            <header>
              <h3>Rynki prognostyczne</h3>
              <br />
              <div>
  <InputGroup className="mb-3">
    <InputGroup.Prepend>
      <Button variant="outline-primary">Szukaj</Button>
    </InputGroup.Prepend>
    <FormControl aria-describedby="basic-addon1" />
  </InputGroup></div>
            </header>
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
  <Row>
    <Col sm={12} md={3}>
      <Nav variant="pills" className="flex-column">
        <Nav.Item>
          <Nav.Link eventKey="first">Rynki bez zakładów</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="second">Prywatne</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="third">Opublikowane</Nav.Link>
        </Nav.Item>
      </Nav>
      <br />    
      <h6>Filtry</h6>
      TODO !!!
    </Col>
    <Col sm={12} md={9}>
      <Tab.Content>
        <Tab.Pane eventKey="first" unmountOnExit={true}>
          <MarketsList typeOfMarkets="waitingForBets"/>
        </Tab.Pane>
        <Tab.Pane eventKey="second" unmountOnExit={true}>

        </Tab.Pane>
        <Tab.Pane eventKey="third" unmountOnExit={true}>
          
          </Tab.Pane>
      </Tab.Content>
    </Col>
  </Row>
</Tab.Container>
</Container>
        )
    }
}


export default ModeratorMarketsPage;