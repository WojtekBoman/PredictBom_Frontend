import React from 'react';
import {connect} from 'react-redux';
import {Container,Spinner} from 'react-bootstrap';
import {fetchMarket} from '../../actions/marketActions';
import BetsList from './BetsList';
import MarketTrendChart from './MarketTrendChart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSadTear,faExclamationCircle} from '@fortawesome/free-solid-svg-icons';

class MarketDetails extends React.Component {

    componentDidMount() {
        if(!this.props.currentMarket) this.props.fetchMarket(this.props.match.params.id);
    }

    renderLoading = () => {
        if((typeof this.props.loadingMarket !== 'undefined') && this.props.loadingMarket.pending) {
            return(
                <Container className="text-center bg-light border rounded shadow-container create-market-container">
                    <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    />
                    <h3>Pobieranie danych rynku</h3>
                </Container>
            )
        }
    }

    renderBetsList = () => {
        return(
            <BetsList correctBetId={this.props.currentMarket.correctBetId} correctBetOption={this.props.currentMarket.correctBetOption} bets={this.props.currentMarket.bets}
            marketId={this.props.match.params.id} />
        )
} 
    
    renderNotFoundMessage() {
        if(this.props.alert.payload)
        return (
        <Container className="text-center bg-light border rounded shadow-container create-market-container">
            <FontAwesomeIcon icon={faSadTear} size={"9x"}/>
        <h2>{this.props.alert.payload}</h2>
        </Container>
        )
    }

    renderMarketPage = () => {
        if(this.props.currentMarket){
            return(
                <Container className="bg-light border rounded shadow-container create-market-container">
                    <header>
                        <h2>{this.props.currentMarket.topic}</h2>
                        <hr className="my-4"></hr>
                    </header>
                    <div className="rules">
                        <h4>Zasady rynku</h4>
                        <p>{this.props.currentMarket.description}</p>
                        <hr className="my-4"></hr>
                    </div>
                    <div className="bets">
                        <h4>Zakłady</h4>
                        {this.renderBetsList()}
                    </div>
                    <MarketTrendChart bets={this.props.currentMarket.bets} betId={67} option={true} />
                </Container>
                );
        }
    }

    renderChart = () => {
      
    }

    render() {
        return(
        <div>
            {this.renderLoading()}
            {this.renderNotFoundMessage()}
            {this.renderMarketPage()}
        </div>
        )
    }
}

const mapStateToProps = (state,ownProps) => {
    return {
        loadingMarket: state.loading.FETCH_MARKET,
        currentMarket: state.markets.find(market => market.marketId == ownProps.match.params.id),
        alert: state.alert 
    }
}

export default connect(mapStateToProps,{fetchMarket})(MarketDetails);