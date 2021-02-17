import React from "react";
import { connect } from "react-redux";
import { Tab, Tabs, Container } from "react-bootstrap";
import MarketsList from "./MarketsList";
import BackHeader from "../BackHeader";

class MarketsPage extends React.Component {
  renderTabs() {
    if (
      this.props.user &&
      this.props.user.roles.includes("ROLE_MODERATOR")
    ) {
      return (
        <Tabs id="controlled-tab-example" className="mt-4">
          <Tab eventKey="private" title="Prywatne" unmountOnExit>
            <MarketsList typeOfMarkets="/private" />
          </Tab>
          <Tab
            eventKey="filteredWaitingForBets"
            title="Bez zakładów"
            unmountOnExit
          >
            <MarketsList typeOfMarkets="/filteredWaitingForBets" />
          </Tab>
          <Tab eventKey="publicMod" title="Opublikowane przez ciebie" unmountOnExit>
            <MarketsList title="Trwające rynki" typeOfMarkets="/public" />
          </Tab>
          <Tab eventKey="public" title="Publiczne" unmountOnExit>
            <MarketsList title="Trwające rynki" typeOfMarkets="/public" />
          </Tab>
          <Tab eventKey="solvedMod" title="Zakończone przez ciebie" unmountOnExit>
            <MarketsList title="Trwające rynki" typeOfMarkets="/solvedByMod" />
          </Tab>
          <Tab eventKey="solved" title="Zakończone" unmountOnExit>
            <MarketsList title="Trwające rynki" typeOfMarkets="/solved" />
          </Tab>
        </Tabs>
      );
    }

    return (
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
    );
  }

  render() {
    return (
      <Container className="bg-light border rounded shadow-container">
        <BackHeader title="Rynki prognostyczne" />
        {this.renderTabs()}
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.login.user,
  };
};

export default connect(mapStateToProps)(MarketsPage);
