import React from 'react';
import {connect} from 'react-redux';
import {Tab,TabContainer,Tabs,Row,Col,Nav, Container} from 'react-bootstrap';
import MarketsList from './MarketsList';
import MarketsFilter from './MarketsFilter'
import ModeratorMarketsPage from './ModeratorMarketsPage';
import SearchBar from './SearchBar'
import {updateSearch} from '../../actions/filterActions';

class MarketsPage extends React.Component {

    
    render() {
        // if(this.props.user && this.props.user.roles[0] === "ROLE_MODERATOR") {
        //   return <ModeratorMarketsPage/>
        // }

        return (

          <Container className="bg-light border rounded shadow-container create-market-container">
            <header>
              <h2>Rynki prognostyczne</h2>
            </header>
            <Tabs id="controlled-tab-example" style={{marginTop:"15px"}}>
            <Tab eventKey="home" title="Trwające" unmountOnExit>
              <MarketsList title="Trwające rynki" typeOfMarkets="/"/>
            </Tab>
            <Tab eventKey="profile" title="Zakończone" unmountOnExit>
            <MarketsList title="Zakończone rynki" typeOfMarkets="/solved"/>
            </Tab>
            
          </Tabs>
          </Container>
        );

        return(
          <Container className="bg-light border rounded shadow-container create-market-container">
            <header>
              <h3>Twoje rynki prognostyczne</h3>
              <br />
              <SearchBar search={updateSearch}/>
            </header>
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
  <Row>
    <Col sm={12} md={3}>
      <Nav variant="pills" className="flex-column" color="dark" >
        <Nav.Item >
          <Nav.Link className="dark-link" eventKey="first">W trakcie</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="second">Zakończone</Nav.Link>
        </Nav.Item>
      </Nav>
      <MarketsFilter />
    </Col>
    <Col sm={12} md={9}>
      <Tab.Content>
      <Tab.Pane eventKey="first" unmountOnExit={true}>
          <MarketsList typeOfMarkets="/"/>
        </Tab.Pane>
        <Tab.Pane eventKey="second" unmountOnExit={true}>
        <MarketsList typeOfMarkets="/"/>
        </Tab.Pane>
        
      </Tab.Content>
    </Col>
  </Row>
</Tab.Container>
</Container>
        )

        return(
            <Container className="bg-light border rounded shadow-container create-market-container">
            <header>
              <h3>Rynki prognostyczne</h3>
              <hr className="my-4"></hr>
              <SearchBar search={updateSearch}/>
            </header>
  <Row>
    <Col sm={12} md={3}>
      
      <MarketsFilter />
    </Col>
    <Col sm={12} md={9}>
        <MarketsList typeOfMarkets="/"/>
    </Col>
  </Row>
</Container>
        )
    }
}

const mapStateToProps = state => {
  return {
    user: state.login.user
  }
}

export default connect(mapStateToProps)(MarketsPage);