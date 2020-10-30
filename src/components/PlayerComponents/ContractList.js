import React from 'react';
import {connect} from 'react-redux';
import {Container,Row} from 'react-bootstrap';
import {fetchContracts} from '../../actions/contractActions';
import Loader from 'react-loader-spinner';
import { map } from 'lodash';
import Contract from './Contract';

class ContractList extends React.Component {

    componentDidMount() {
        this.props.fetchContracts();
    }

    renderContractList() {
        if(this.props.contracts) {
            return (
                <div>{this.props.contracts.map(contract => <Contract valueOfShares={contract.valueOfShares} countOfContracts={contract.countOfContracts} contractOption={contract.contractOption} betId={contract.betId}/>)}</div>
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
                {this.renderLoading()}
                {this.renderContractList()}
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        contracts: Object.values(state.contracts),
        loading: state.loading.FETCH_CONTRACTS
    }
}

export default connect(mapStateToProps,{fetchContracts})(ContractList)