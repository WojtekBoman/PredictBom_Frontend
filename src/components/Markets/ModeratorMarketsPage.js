import React from 'react';
import {Tab,Row,Col,Nav, Container} from 'react-bootstrap';
import MarketsList from './MarketsList';
import MarketsFilter from './MarketsFilter'
import SearchBar from './SearchBar'


class ModeratorMarketsPage extends React.Component {

    state = {
      search:""
    }

    handleSelect() {

    }

    componentWillUnmount() {
      
    }

    onInputSearchChange = (e) => {
      this.setState({search:e.target.value});
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
              <SearchBar />
            </header>
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
  <Row>
    <Col sm={12} md={3}>
      <Nav variant="pills" className="flex-column" color="dark" >
        <Nav.Item >
          <Nav.Link className="dark-link" eventKey="first">Rynki bez zakładów</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="second">Prywatne</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="third">Opublikowane</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="fourth">Wszystkie</Nav.Link>
        </Nav.Item>
      </Nav>
      <MarketsFilter />
    </Col>
    <Col sm={12} md={9}>
      <Tab.Content>
        <Tab.Pane eventKey="first" unmountOnExit={true}>
          <MarketsList typeOfMarkets="filteredWaitingForBets" search={this.state.search}/>
        </Tab.Pane>
        <Tab.Pane eventKey="second" unmountOnExit={true}>

        </Tab.Pane>
        <Tab.Pane eventKey="third" unmountOnExit={true}>
          
          </Tab.Pane>
          <Tab.Pane eventKey="fourth" unmountOnExit={true}>

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