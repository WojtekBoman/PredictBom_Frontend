import React from "react";
import { Tab, Tabs, Container } from "react-bootstrap";
import MarketsList from "./MarketsList";
import { connect } from "react-redux";
import { alertActions } from "../../actions/alertActions";
import BackHeader from "../BackHeader";

class ModeratorMarketsPage extends React.Component {
  state = {
    search: "",
  };

  componentWillUnmount() {
    this.props.clear();
  }

  onInputSearchChange = (e) => {
    this.setState({ search: e.target.value });
  };

  render() {
    return (
      <Container className="bg-light border rounded shadow-container create-market-container">
        <BackHeader title="Nieopublikowane rynki prognostyczne" />
        <Tabs id="controlled-tab-example" style={{ marginTop: "15px" }}>
          <Tab eventKey="private" title="Wszystkie" unmountOnExit>
            <MarketsList typeOfMarkets="/private" search={this.state.search} />
          </Tab>
          <Tab
            eventKey="filteredWaitingForBets"
            title="Bez zakładów"
            unmountOnExit
          >
            <MarketsList
              typeOfMarkets="/filteredWaitingForBets"
              search={this.state.search}
            />
          </Tab>
        </Tabs>
      </Container>
    );
    }
}

export default connect(null, { clear: alertActions.clear })(
  ModeratorMarketsPage
);
