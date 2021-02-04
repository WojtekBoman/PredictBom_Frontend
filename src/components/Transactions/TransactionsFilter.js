import React from 'react';
import {connect} from 'react-redux';
import {Form, Button} from 'react-bootstrap'
import {updateTransactionFilters} from '../../actions/filterTransactionActions';
import {renderCategoryFilter} from '../../helpers/MarketCategories';
 
class TransactionsFilter extends React.Component {

    state =  {
        selectedCategories: [],
        marketTitle:"",
        betTitle:"",
        page:0,
        contractStatus:"",
        pageSize:10,
        option:0,
        sortedBy:["transactionDate","desc"]
    }


    handleOption = (e) => {
        this.setState({option:e.target.value});
    }

    handleSortOption = (e) => {
        this.setState({sortedBy:e.target.value.split(',')});
    }

    renderContractOptionFilter = () =>{
        return(
            <div>
                <h4>Opcja kontraktu</h4>
                <Form.Control as="select" onChange={this.handleOption}>
                <option value={0}>Wszystkie kontrakty</option>
                <option value={1}>Kontrakty na tak</option> 
                <option value={2}>Kontrakty na nie</option>
                </Form.Control>
                <hr className="my-4"></hr>
            </div>
        )
    }

    renderMarketTitleFilter = () => {
        return(
            <div>
            <h4>Tytuł rynku</h4>
            <Form.Group>
            <Form.Control onChange={this.handleMarketTitleChange} type="text" placeholder="Tytuł rynku" />
            </Form.Group>
            <hr className="my-4"></hr>
            </div>

        )
    }

    renderBetTitleFilter = () => {
        return(
            <div>
                <h4>Tytuł zakładu</h4>
                <Form.Group>
                <Form.Control onChange={this.handleBetTitleChange} type="text" placeholder="Tytuł zakładu" />
                </Form.Group>
           
            <hr className="my-4"></hr>
            </div>
        )
    }

    renderSortFilter = () => {
        return(
            <div>
                <h4>Sortuj według</h4>
                <Form.Control as="select" onChange={this.handleSortOption}>
                <option value={"transactionDate,desc"}>Od najnowszych</option>
                <option value={"transactionDate,asc"}>Od najstarszych</option> 
                </Form.Control>
                <hr className="my-4"></hr>
            </div>
        )
    }

    handleCategory = (e) => {

        if(this.state.selectedCategories.includes(e.target.value)) {
           this.setState({selectedCategories:this.state.selectedCategories.filter(category => category != e.target.value)});
        }else{
            this.setState({selectedCategories:[...this.state.selectedCategories,e.target.value]});
        }
    }

    handleMarketTitleChange = (e) => {
        this.setState({marketTitle:e.target.value});
    }

    handleContractStatus = (e) => {
        this.setState({contractStatus:e.target.value});
    }

    handleBetTitleChange = (e) => {
        this.setState({betTitle:e.target.value});
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.updateTransactionFilters(this.state)
    }

    render() {
        return (
            <Form style={{width:"100%"}}>
                {this.renderMarketTitleFilter()}
                {this.renderBetTitleFilter()}
                {this.renderSortFilter()}
                {this.renderContractOptionFilter()}
                {renderCategoryFilter(this.handleCategory)}
            <hr className="my-4"></hr>
            <Button onClick={this.handleSubmit} variant="dark">
                Zatwierdź
            </Button>
            </Form>
        )
    }
}


export default connect(null,{updateTransactionFilters})(TransactionsFilter);