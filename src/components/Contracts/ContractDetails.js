import React from 'react';
import {Container,Row,Col, Image} from 'react-bootstrap';
import {connect} from 'react-redux';
import Loader from 'react-loader-spinner';
import {fetchContractDetails} from '../../actions/contractActions';
import ContractBet from './ContractBet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Button, Modal} from 'react-bootstrap';
import OffersList from '../Offers/OffersList';
import { LinkContainer } from 'react-router-bootstrap';
import sportBackground from '../../img/sportBackground.png';
import celebryciBackground from '../../img/celebryciBackground.jpg';
import politykaBackground from '../../img/politykaBackground.jpg';
import gospodarkaBackground from '../../img/gospodarkaBackground.jpg';
import inneBackground from '../../img/inneBackground.png';
import {faSadTear,faExclamationCircle,faArrowCircleLeft} from '@fortawesome/free-solid-svg-icons';
import BackButton from '../../helpers/BackButton';
import { alertActions } from '../../actions/alertActions';

class ContractDetails extends React.Component {

    state = {
        showModal: false
    }

    componentDidMount() {
        this.props.fetchContractDetails(this.props.match.params.id);
    }

    componentWillUnmount(){
        this.props.clear();
    }

    setCover = (category) => {

        switch(category){
            case "SPORT":
          return sportBackground;
        case "CELEBRITIES":
          return celebryciBackground;
        case "POLICY":
          return politykaBackground;
        case "ECONOMY":
          return gospodarkaBackground;
        case "OTHER":
          return inneBackground;
        default:
          return inneBackground;
    
        }
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

    handleModalClose() {
        this.setState({showModal:false})
    }

    renderInfo() {
        if(this.props.alert.type == "ALERT_DELETING" && this.props.alert.payload){
        return(
            <Modal show={this.state.showModal} onHide={this.handleModalClose}>
            <Modal.Header closeButton>
              <Modal.Title>Nie udało się usunąć oferty</Modal.Title>
            </Modal.Header>
            <Modal.Body>{this.props.alert.payload}</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleModalClose}>
                Zamknij
              </Button>
            </Modal.Footer>
          </Modal>
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
        if(this.props.contract && this.props.user && this.props.contract.playerId == this.props.user.username){
        return(
        <Container className="bg-light border rounded shadow-container create-market-container">
            <header style={{display:"inline-block"}}>
                <BackButton />
                <h2 style={{display:"inline-block"}}>{this.props.contract.marketInfo.topic}</h2>
            </header>
            <hr className="my-4"></hr>
            <div>
                <ContractBet betId={this.props.contract.bet.id} contractOption={this.props.contract.contractOption} title={this.props.contract.bet.title}/>
            </div>
            <hr className="my-4"></hr>
            <h4>Szczegóły kontraktu</h4>
            <Row>
                <Col sm={6}>
                <Image variant="top" src={this.props.contract.marketInfo.marketCover ? (`data:image/jpeg;base64,${this.props.contract.marketInfo.marketCover.data}`) : (this.setCover(this.props.contract.marketInfo.marketCategory))} 
                style={{width: "100%",maxHeight:"50vw",
                        objectFit:"cover"
                        }}/>
                </Col>
                <Col sm={6}>
                <div>
                    <h4>Liczba akcji</h4>
                    <h4>{this.props.contract.shares}</h4>
                </div>
                <hr className="my-4"></hr>
                <div>
                    <h4>Status kontraktu</h4>
                    {this.renderContractStatus(this.props.contract.contractStatus)}
                </div>
                </Col>
                </Row>
            
                
            {this.props.contract.contractStatus =="PENDING" ? (
                <div style={{marginTop:"10px"}}>
                <h4>Oferty</h4>
                <hr className="my-4"></hr>
                <div>
                    {this.renderOffers()}
                    {this.props.contract && 
                <div style={{display:"inline-block"}}>
                    {this.props.contract.shares && (
                        <LinkContainer style={{marginRight:"5px"}} to={`/offers/new/${this.props.match.params.id}`}>
                        <Button variant="primary">
                            Dodaj ofertę
                        </Button>
                        </LinkContainer>
                      
                    )}

                </div>
                }   
                   <LinkContainer to={`/markets/details/${this.props.contract.bet.marketId}`}>    
                         <Button variant="primary">
                             Wyświetl rynek
                         </Button>
                         </LinkContainer>
                </div>
                </div>
            ) :
            <LinkContainer style={{marginTop:"10px"}} to={`/markets/details/${this.props.contract.bet.marketId}`}>    
                        <Button variant="primary">
                            Wyświetl rynek
                        </Button>
                        </LinkContainer>
            }
            
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
        if(!this.props.contract && (typeof this.props.loading !== 'undefined') && !this.props.loading.pending){
        return (
            <Container className="text-center bg-light border rounded shadow-container create-market-container">
                <FontAwesomeIcon icon={faSadTear} size={"9x"}/>
            <h2>{this.props.alert.payload}</h2>
            </Container>
        )
        }
    }

    render() {
        return(
        <div>
            {this.renderLoading()}
            {this.renderContent()}
            {this.renderInfo()}
            {this.renderNotFoundMessage()}
        </div>
        )
    }
}

const mapStateToProps = (state,ownProps) => {
    return {
        loading: state.loading.FETCH_CONTRACT_DETAILS,
        alert: state.alert,
        contract: state.contracts.find(contract => contract.id == ownProps.match.params.id),
        user: state.login.user
    }
}

export default connect(mapStateToProps,{fetchContractDetails,clear:alertActions.clear})(ContractDetails);