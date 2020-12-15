import React from 'react';
import { Form, Col,Button } from 'react-bootstrap';
import {connect} from 'react-redux';
import {updateContractFilters, clearFilters} from '../../actions/filterContractActions';

class ContractFilter extends React.Component {

    state =  {
        selectedCategories: [],
        marketTitle:"",
        betTitle:"",
        page:0,
        contractStatus:"",
        pageSize:10,
        contractOption:0,
        sortedBy:["modifiedDate","desc"]
    }

    renderCategoryFilter() {
        const categories = [
            {label:"Sport",value:"sport"},
            {label:"Celebryci",value:"cel"},
            {label:"Polityka",value:"pol"},
            {label:"Gospodarka",value:"gosp"},
            {label:"Inne",value:"inne"}
        ]

        return(
            <div>
                <h4>Kategorie</h4>
                <Form.Group>
                    {categories.map(category => 
                <Form.Check
                 onClick={this.handleCategory}
                    key={category.value}
                    label={category.label}
                    value={category.value}
                    name="checkbox"
                    type="checkbox"
                 />)}
                </Form.Group>
            </div>
        )
    }

    handleContractOption = (e) => {
        this.setState({contractOption:e.target.value});
    }

    handleSortOption = (e) => {
        this.setState({sortedBy:e.target.value.split(',')});
    }

    renderContractOptionFilter = () =>{
        return(
            <div>
                <h4>Opcja kontraktu</h4>
                <Form.Control as="select" onChange={this.handleContractOption}>
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

    renderContractStatusFilter = () => {
        return(
            <div>
                <h4>Status kontraktu</h4>
                <Form.Control as="select" onChange={this.handleContractStatus}>
                <option value={""}>Wszystkie</option>
                <option value={"pending"}>Trwające</option> 
                <option value={"won"}>Wygrane</option> 
                <option value={"lost"}>Przegrane</option> 
                </Form.Control>
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
                <option value={"modifiedDate,desc"}>Od najnowszych</option>
                <option value={"modifiedDate,asc"}>Od najstarszych</option> 
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
        this.props.updateContractFilters(this.state)
    }

    resetFilters = () => {
        this.setState({
            selectedCategories: [],
            marketTitle:"",
            betTitle:"",
            page:0,
            contractStatus:"",
            pageSize:10,
            contractOption:0,
            sortedBy:["modifiedDate","desc"]
        })
        this.props.clearFilters();
    } 

    render() {
        return (
            <Form style={{width:"100%"}}>
                {!this.props.offerPage && this.renderContractStatusFilter()}
                {this.renderMarketTitleFilter()}
                {this.renderBetTitleFilter()}
                {this.renderSortFilter()}
                {this.renderContractOptionFilter()}
                {this.renderCategoryFilter()}
            <hr className="my-4"></hr>
            <Button onClick={this.handleSubmit} variant="dark">
                Zatwierdź
            </Button>
            </Form>
        )
    }
}

export default connect(null,{updateContractFilters,clearFilters})(ContractFilter);