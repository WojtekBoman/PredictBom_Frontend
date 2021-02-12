import React from "react";
import { connect } from "react-redux";
import { Container, Tab, Tabs } from "react-bootstrap";
import TransactionList from "./TransactionList";
import { clearTransactions } from "../../actions/transactionActions";
import BackHeader from "../BackHeader";

class TransactionsPage extends React.Component {
  componentWillUnmount() {
    this.props.clearTransactions();
  }

  render() {
    return (
      <Container className="bg-light border rounded shadow-container">
        <BackHeader title="Transakcje" />
        <Tabs id="controlled-tab-example" className="mt-3">
          <Tab eventKey="home" title="Zakup" unmountOnExit>
            <TransactionList type="purchaser" />
          </Tab>
          <Tab eventKey="profile" title="Sprzedaż" unmountOnExit>
            <TransactionList type="dealer" />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

export default connect(null, { clearTransactions })(TransactionsPage);
