import React from 'react';
import {connect} from 'react-redux';
import {Container,Row,Col} from 'react-bootstrap';
import {fetchContracts} from '../../actions/contractActions';
import Loader from 'react-loader-spinner';
import { map } from 'lodash';
import Contract from './Contract';
import LoadMore from './LoadMore';
import { Image, Item } from 'semantic-ui-react'
import MarketsFilter from '../Markets/MarketsFilter'
import ContractFilter from './ContractFilter';

class ContractList extends React.Component {

    
    componentDidMount() {
        this.props.fetchContracts(0,4);
    }

    componentDidUpdate(prevProps,prevState) {
        if(!(JSON.stringify(this.props.filter)===JSON.stringify(prevProps.filter))){
            this.props.fetchFilteredContracts(null,this.props.filter.marketTitle,null,this.props.filter.selectedCategories,this.props.filter.sortedBy,this.props.filter.page,this.props.filter.pageSize);
        }
        
    }
    renderContractList() {
        if(this.props.contracts) {
            return(
             
                <Row style={{width:"100%",margin:"0 auto"}}>
                    {this.props.contracts.map(contract => 
                    <Col xs={12} sm={6} className="d-flex align-items-stretch" key={contract.id} style={{margin:"10px 0"}}>
                        <Contract market={contract.predictionMarket} valueOfShares={contract.valueOfShares} countOfContracts={contract.countOfContracts} contractOption={contract.contractOption} betId={contract.betId}/>
                    </Col>
                    )}
                </Row>
                )
        }
    }

    renderLoading = () => {
        if ((typeof this.props.loading !== 'undefined') && this.props.loading.pending){
            return(
                <div className="text-center">
                <Loader
                     type="TailSpin"
                     color="black"
                />
                </div>
                )
          
        }
    }

    render() {
        return(
            <Container className="bg-light border rounded shadow-container create-market-container">
                <header>
                    <h2>Twoje kontrakty</h2>
                    <hr className="my-4"></hr>
                </header>
                <Row>
                <ContractFilter />
                        <div>
                        {this.renderLoading()}
                        <div >
                        {this.renderContractList()}
                        </div>
                        </div>
                </Row>
               
               
               <div className="text-center">
                <LoadMore />
                </div>
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        contracts: Object.values(state.contracts),
        loading: state.loading.FETCH_CONTRACTS,
        filter: state.filter
    }
}

export default connect(mapStateToProps,{fetchContracts})(ContractList)