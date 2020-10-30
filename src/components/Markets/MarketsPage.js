import React from 'react';
import {connect} from 'react-redux';
import {Tab,Row,Col,Nav, Container} from 'react-bootstrap';
import MarketsList from './MarketsList';
import MarketsFilter from './MarketsFilter'
import ModeratorMarketsPage from './ModeratorMarketsPage';
import SearchBar from './SearchBar'

class MarketsPage extends React.Component {

    
    render() {
        if(this.props.user && this.props.user.roles[0] === "ROLE_MODERATOR") {
          return <ModeratorMarketsPage/>
        }

        return(
            <Container className="bg-light border rounded shadow-container create-market-container">
            <header>
              <h3>Rynki prognostyczne</h3>
              <br />
              <SearchBar />
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