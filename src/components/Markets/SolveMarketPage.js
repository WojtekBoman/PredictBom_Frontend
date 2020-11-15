import React from 'react';
import {connect} from 'react-redux';
import {Container,Button,Form} from 'react-bootstrap';
import {fetchMarket} from '../../actions/marketActions';
import Loader from 'react-loader-spinner';
import BetsList from './BetsList';
import SolveSingleBetMarketForm from './SolveSingleBetMarketForm';
import SolveMultiBetMarketForm from './SolveMultiBetMarketForm';

class SolveMarketPage extends React.Component {

    componentDidMount() {
        if(!this.props.currentMarket) this.props.fetchMarket(this.props.match.params.id);
    }

    renderBetsList = () => {
        return(
            <BetsList bets={this.props.currentMarket.bets}
            marketId={this.props.match.params.id} correctBetId={this.props.currentMarket.correctBetId} />
        )
} 

    renderLoadingMarket() {
        if ((typeof this.props.loadingMarket !== 'undefined') && this.props.loadingMarket.pending) {
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

    renderSolveMarketInfo = () => {
        return(
            <div className="text-center">
                {this.compareDates(this.props.currentMarket.predictedEndDate)}
                {this.renderChooseCorrectBetForm()}
            </div>
        )
    }

    compareDates(predictedEndDate) {
        var dateOne = new Date(predictedEndDate);    
        var dateTwo = new Date();    
         //Note: 04 is month i.e. May    
        if (dateOne > dateTwo) {    
            return(
                <div>
                    Jeszcze nie nadeszła przewidywana data zakończenia. Na pewno chcesz zakończyć rynek ?
                </div>
            )    
         }else {    
            return(
                <div>
                    Rynek powinien się już zakończyć
                </div>
            )       
         }    
    }

    renderMarketPage = () => {
        if(this.props.currentMarket){
            return(
                <div>
                    <header>
                        <h2>Rozwiąż rynek "{this.props.currentMarket.topic}"</h2>
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
                        <hr className="my-4"></hr>
                    </div>
                    <div>   
                        {this.renderSolveMarketInfo()}
                    </div>
                </div>
                );
        }
    }

 
    

    renderChooseCorrectBetForm = () => {
        if(this.props.currentMarket){
            return(<div>{this.props.currentMarket.bets.length > 1 ? <SolveMultiBetMarketForm bets={this.props.currentMarket.bets} marketId={this.props.currentMarket.marketId}/> : <SolveSingleBetMarketForm bets={this.props.currentMarket.bets}  marketId={this.props.currentMarket.marketId}/>}</div>)
        }
    }

    render() {
        return(
            <Container className="bg-light border rounded shadow-container create-market-container">
                <div>
                    {this.renderLoadingMarket()}
                    {this.renderMarketPage()}
                </div>
            </Container>
        )
    }
}

const mapStateToProps = (state,ownProps) => {
    return {
        loadingMarket: state.loading.FETCH_MARKET,
        currentMarket: state.markets.find(market => market.marketId == ownProps.match.params.id)
    }
}

export default connect(mapStateToProps,{fetchMarket})(SolveMarketPage);