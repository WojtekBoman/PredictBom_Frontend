import React from 'react';
import {connect} from 'react-redux';
import {Alert,Container,Image,Spinner,Button} from 'react-bootstrap';
import sportBackground from '../../img/sportBackground.png';
import celebryciBackground from '../../img/celebryciBackground.jpg';
import politykaBackground from '../../img/politykaBackground.jpg';
import gospodarkaBackground from '../../img/gospodarkaBackground.jpg';
import inneBackground from '../../img/inneBackground.png';
import {fetchMarket,makePublic} from '../../actions/marketActions';
import { LinkContainer } from "react-router-bootstrap";
import BetsList from './BetsList';



class MakeMarketPublicPage extends React.Component {

    componentDidMount() {
       this.props.fetchMarket(this.props.match.params.id);
    }

    setCover = (category) => {
        switch(category){
            case "SPORT":
              return sportBackground;
            case "CELEBRYCI":
              return celebryciBackground;
            case "POLITYKA":
              return politykaBackground;
            case "GOSPODARKA":
              return gospodarkaBackground;
            case "INNE":
              return inneBackground;
            default:
              return inneBackground;
    
        }
    }

    renderBetsList = () => {
        if(!this.props.currentMarket.bets){
            return(
                <div>
                    Brak zakładów. Nie możesz opublikować rynku dopóki nie dodasz zakładów
                </div>
            )
        }

        return(
            <div>
            <h4>Zakłady</h4>
            <BetsList correctBetId={this.props.currentMarket.correctBetId} bets={this.props.currentMarket.bets}
            marketId={this.props.match.params.id} />
            
            </div>
        )
}

    renderEditMenu = () => {
        return(
            <div className="text-center">
                <LinkContainer to={`/markets/editCover/${this.props.match.params.id}`}>
                <Button variant="primary" className="edit-market-button">Zmień okładkę</Button>
                </LinkContainer>
                <LinkContainer to={`/markets/editBets/${this.props.match.params.id}`}>
                <Button variant="primary" className="edit-market-button">Edytuj zakłady</Button>
                </LinkContainer>
                <LinkContainer to={`/markets/editMarket/${this.props.match.params.id}`}>
                <Button variant="primary" className="edit-market-button">Edytuj dane rynku</Button>
                </LinkContainer>
            </div>
        )
    }

    makeMarketPublic = () => {
        this.props.makePublic(this.props.match.params.id);
    }

    renderMarketContent = () => {
        if(this.props.currentMarket && !this.props.currentMarket.published){
            return(
                <div>
                    <h4>{this.props.currentMarket.topic}</h4>
                    {this.props.currentMarket.marketCover && (<Image style={{margin:"0 auto"}} className="img" src={typeof(this.props.currentMarket.marketCover) !== 'undefined' ? (`data:image/jpeg;base64,${this.props.currentMarket.marketCover.data}`) : (this.setCover(this.props.currentMarket.marketCategory))} rounded/>)}
                    <h5>Przewidywana data zakończenia - {this.props.currentMarket.endDate}</h5>
                    <hr className="my-4"></hr>                   
                    {this.renderBetsList()}
                    <hr className="my-4"></hr>   
                    <h4>Edytuj zakład</h4>   
                    {this.renderEditMenu()}
                    <hr className="my-4"></hr> 
                    <h4>Opublikuj rynek</h4>
                    <div className="text-center">
                    <Button variant="primary" className="edit-market-button" onClick={this.makeMarketPublic}>
                     {this.renderButtonContent()}
                    </Button>
                    </div>
                </div>
            )
        }
    }

    renderLoading = () => {
        if((typeof this.props.loadingMarket !== 'undefined') && this.props.loadingMarket.pending) {
            return(
               <div className="text-center">
                    <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    />
                    <h3>Pobieranie danych rynku</h3>
             </div>
            )
        }
    }

    renderButtonContent() {
        if ((typeof this.props.loading !== 'undefined') && this.props.loading.pending) {
            return (
                <div>
                <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                />
                Ładowanie...
                </div>
            )
        }else{
            return "Opublikuj rynek"
        }
    }

    renderInfo() {
        if(this.props.alert.payload) {
            return <Alert className="login-alert" variant="danger">
                {this.props.alert.payload}
            </Alert>
        }
    }

    render() {
        return(
            <Container className="bg-light border rounded shadow-container create-market-container">
                <header style={{marginBottom:"30px"}}>
                    <h3>To już ostatni krok</h3>
                    <p>Za chwilę twój rynek stanie się widoczny dla użytkowników. Sprawdź czy wszystkie wprowadzone dane i zakłady są prawidłowe. Po opublikowaniu rynku nie będziesz mógł edytować cen i usuwać zakładów !</p>
                </header>
                <hr className="my-4"></hr>
                {this.renderLoading()}
                {this.renderMarketContent()}
                {this.renderInfo()}
            </Container>
        )
    }
}

const mapStateToProps = (state,ownProps) => {
    return {
      alert: state.alert,
      loadingMarket: state.loading.FETCH_MARKET,
      loading: state.loading.MAKE_MARKET_PUBLIC,
      currentMarket: state.markets.find(market => market.marketId == ownProps.match.params.id)
    }
  }

export default connect(mapStateToProps,{fetchMarket,makePublic})(MakeMarketPublicPage);