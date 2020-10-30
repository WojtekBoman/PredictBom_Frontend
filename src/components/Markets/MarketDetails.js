import React from 'react';
import {connect} from 'react-redux';
import {Container,Spinner} from 'react-bootstrap';
import {fetchMarket} from '../../actions/marketActions';
import BetsList from './BetsList';

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
            <BetsList bets={this.props.currentMarket.bets}
            marketId={this.props.match.params.id} />
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
                        {this.renderBetsList()};
                    </div>
                </Container>
                );
        }
    }

    render() {
        return(
        <div>
            {this.renderLoading()};
            {this.renderMarketPage()};
        </div>
        )
    }
}

const mapStateToProps = (state,ownProps) => {
    return {
        loadingMarket: state.loading.FETCH_MARKET,
        currentMarket: state.markets.find(market => market.marketId == ownProps.match.params.id) 
    }
}

export default connect(mapStateToProps,{fetchMarket})(MarketDetails);