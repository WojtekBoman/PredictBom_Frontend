import React from 'react';
import {Container,Row,Col} from 'react-bootstrap';
import {connect} from 'react-redux';
import Loader from 'react-loader-spinner';
import {fetchContractDetails} from '../../actions/contractActions';
import ContractBet from './ContractBet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSadTear,faExclamationCircle} from '@fortawesome/free-solid-svg-icons';
import {Button} from 'react-bootstrap';
import OffersList from '../Offers/OffersList';
import { LinkContainer } from 'react-router-bootstrap';

class ContractDetails extends React.Component {

    componentDidMount() {
        this.props.fetchContractDetails(this.props.match.params.id);
    }



    renderLoading = () => {
        if(!this.props.contract && (typeof this.props.loading !== 'undefined') && this.props.loading.pending) {
            return(
                <Container className="text-center bg-light border rounded shadow-container create-market-container">
                  <div className="text-center">
                <Loader
                     type="TailSpin"
                     color="black"
                />
                <h3>Pobieranie danych kontraktu</h3>
                </div>
                </Container>
            )
        }
    }

    renderContractStatus = (status) => {

        switch(status.toLowerCase()) {
            case "pending":
                return (<h5>Oczekujący</h5>)
            case "won":
                return (<h5>Wygrany</h5>)   
            case "lost":
                return (<h5>Przegrany</h5>)

        }
    }

    renderContent = () => {
        if(this.props.contract){
        return(
        <Container className="bg-light border rounded shadow-container create-market-container">
            <header>
                <h4>{this.props.contract.marketInfo.topic}</h4>
                <hr className="my-4"></hr>
            </header>
            <div>
                <ContractBet betId={this.props.contract.bet.id} contractOption={this.props.contract.contractOption} chosenOption={this.props.contract.bet.chosenOption}/>
                <hr className="my-4"></hr>
            </div>
            <Row>
                <Col sm={6} className="text-center">
            <div>
                <h4>Liczba akcji</h4>
                <h4>{this.props.contract.countOfContracts}</h4>
            </div>
                </Col>
                <Col sm={6} className="text-center">
            <div>
                <h4>Status kontraktu</h4>
                {this.renderContractStatus(this.props.contract.contractStatus)}
            </div>
                </Col>
            </Row>
            <hr className="my-4"></hr>
            <div>
                {this.renderOffers()}
                {this.props.contract && 
            <div>
                {this.props.contract.countOfContracts > 0 && (
                    <LinkContainer to={`/offers/new/${this.props.match.params.id}`}>
                    <Button variant="primary">
                        Dodaj ofertę
                    </Button>
                    </LinkContainer>
                )}
            </div>
            }   
            </div>
        </Container>
        )
    }
}
    renderOffers = () => {
       return( <div>{this.props.contract.offers ? (
            <div> 
                <OffersList offers={this.props.contract.offers} isOwner={true}/>
            </div>
        ):
        <div className="text-center">
            <FontAwesomeIcon icon={faSadTear} size={"5x"}/>
            <h4>Brak ofert</h4>
          
        </div>
        }</div>
       )
    } 

    renderNotFoundMessage = () => {
        
    }

    render() {
        return(
        <div>
            {this.renderLoading()}
            {this.renderContent()}
            {this.renderNotFoundMessage()}
        </div>
        )
    }
}

const mapStateToProps = (state,ownProps) => {
    return {
        loading: state.loading.FETCH_CONTRACT_DETAILS,
        alert: state.alert,
        contract: state.contracts.find(contract => contract.id == ownProps.match.params.id) 
    }
}

export default connect(mapStateToProps,{fetchContractDetails})(ContractDetails);