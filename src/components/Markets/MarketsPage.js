import React from "react";
import { connect } from "react-redux";
import {
  Tab,
  Tabs,
  Container,
} from "react-bootstrap";
import MarketsList from "./MarketsList";
import BackHeader from "../BackHeader";

class MarketsPage extends React.Component {


  render() {
    return (
      <Container className="bg-light border rounded shadow-container">
        <BackHeader title="Rynki prognostyczne" />
        <Tabs id="controlled-tab-example" className="mt-4">
          {/* <Tab eventKey="private" title="Prywatne" unmountOnExit>
            <MarketsList typeOfMarkets="/private" />
          </Tab>
        <Tab
            eventKey="filteredWaitingForBets"
            title="Bez zakładów"
            unmountOnExit
          >
            <MarketsList
              typeOfMarkets="/filteredWaitingForBets"
            />
          </Tab> */}
          <Tab eventKey="home" title="Trwające" unmountOnExit>
            <MarketsList title="Trwające rynki" typeOfMarkets="/" />
          </Tab>
          <Tab eventKey="profile" title="Zakończone" unmountOnExit>
            <MarketsList title="Zakończone rynki" typeOfMarkets="/solved" />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.login.user
  };
};

export default connect(mapStateToProps)(MarketsPage);
