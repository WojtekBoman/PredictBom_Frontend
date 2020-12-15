import React from 'react';
import {connect} from 'react-redux';
import {Container, Tab, Tabs} from 'react-bootstrap';
import TransactionList from './TransactionList';
import {clearTransactions} from '../../actions/transactionActions';
import BackButton from '../../helpers/BackButton';

class TransactionsPage extends React.Component {

    componentWillUnmount() {
      this.props.clearTransactions()
    }

    render() {
        return(
            <Container className="bg-light border rounded shadow-container create-market-container">
            <header style={{display:"inline-block"}}>
              <BackButton />
              <h2 style={{display:"inline-block"}}>Transakcje</h2>
            </header>
            <Tabs id="controlled-tab-example" style={{marginTop:"15px"}}>
            <Tab eventKey="home" title="Zakup" unmountOnExit>
              <TransactionList type="purchaser" />
            </Tab>
            <Tab eventKey="profile" title="Sprzedaż" unmountOnExit>
            <TransactionList type="dealer" />
            </Tab>
            
          </Tabs>
          </Container>
        )
    }
}

export default connect(null,{clearTransactions})(TransactionsPage);