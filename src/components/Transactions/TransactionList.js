import React from 'react';
import {Row,Col} from 'react-bootstrap';
import {connect} from 'react-redux';
import TransactionsFilter from './TransactionsFilter';
import {fetchFilteredTransactions} from '../../actions/transactionActions';
import {clearFilters} from '../../actions/filterTransactionActions'
import Transaction from './Transaction'
import { Item } from 'semantic-ui-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSadTear,faExclamationCircle} from '@fortawesome/free-solid-svg-icons';
import {changeTransactionPage} from '../../actions/filterTransactionActions';
import {clearPagination} from '../../actions/paginationActions';
import Loader from 'react-loader-spinner';
import PaginationBar from '../Markets/PaginationBar';
import './TransactionList.scss';

class TransactionList extends React.Component {

    componentDidMount() {
        this.props.fetchFilteredTransactions(
            this.props.type,
            this.props.filter.option,
            this.props.filter.betTitle,
            this.props.filter.marketTitle,
            this.props.filter.selectedCategories,
            this.props.filter.page,
            this.props.filter.pageSize,
            this.props.filter.sortedBy)
    }

    
    componentDidUpdate(prevProps) {
        if(!(JSON.stringify(this.props.filter)===JSON.stringify(prevProps.filter))){
         
            this.props.fetchFilteredTransactions(
                this.props.type,
                this.props.filter.option,
                this.props.filter.betTitle,
                this.props.filter.marketTitle,
                this.props.filter.selectedCategories,
                this.props.filter.page,
                this.props.filter.pageSize,
                this.props.filter.sortedBy)
        }
        
    }

    componentWillUnmount(){
        this.props.clearFilters()
    }

    renderNotFoundMessage() {
        if(!this.props.alert.payload)
        return (
        <div className="text-center">
            <FontAwesomeIcon icon={faSadTear} size={"9x"}/>
            <h2>Nie znaleziono żadnych transakcji</h2>
        </div>
        )
    }

    renderPagination() {
        if(this.props.transactions.length > 0) {
            return(
                <div>
                    {/* lastPage={this.props.markets.markets.last} firstPage={this.props.markets.markets.first} currentPage={this.props.markets.markets.number} totalElements={this.props.markets.markets.totalElements} totalPages={this.props.markets.markets.totalPages} size={this.props.markets.markets.size}  */}
                    <PaginationBar paginationInfo={this.props.pagination} changePage={changeTransactionPage}/>
                </div>
            )
        }
    }

    renderContent(){
        if(typeof(this.props.loading) !== "undefined" && this.props.loading.pending){
            return(
                <div className="text-center">
                <Loader
                     type="TailSpin"
                     color="black"
                />
                </div>
                )
        }else{
            return(<div>
                {this.renderList()}
            </div>)
        }
    }

    renderInfo() {
        if(this.props.alert.payload) {
            return <div className="text-center">
            <FontAwesomeIcon icon={faExclamationCircle} size={"9x"}/>
            <h3>{this.props.alert.payload}</h3>
        </div>
        }
    }

    renderList() {
        if(this.props.transactions.length > 0){
            return(
                <Item.Group divided>
                    {this.props.transactions.map(transaction => <Transaction key={transaction.id} transactionDate={transaction.transactionDate} purchaser={transaction.purchaser} dealer={transaction.dealer ? transaction.dealer : "Organizator rynku"} option={transaction.option} price={transaction.price} shares={transaction.shares} bet={transaction.bet} marketInfo={transaction.marketInfo}/> )}
                </Item.Group>
                )
        }else{
            return (
                <div>
                    {this.renderNotFoundMessage()}
                </div>
            )
        }
    }
    render() {
        return(
            <div className="transaction-container">
                <Row>
                    <Col sm={3}>
                        <TransactionsFilter />
                    </Col>
                    <Col sm={9}>
                        {this.renderContent()}
                        {this.renderInfo()}
                        {this.renderPagination()}
                    </Col>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        loading: state.loading.FETCH_FILTERED_TRANSACTIONS,
        filter: state.transactionsFilter,
        transactions: state.transactions,
        alert: state.alert,
        pagination: state.pagination.transactionPagination
    }
}

export default connect(mapStateToProps,{fetchFilteredTransactions,clearFilters,clearPagination})(TransactionList);