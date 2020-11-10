import React from 'react';
import { Container,Form } from 'react-bootstrap';
import {connect} from 'react-redux';
import {fetchTransactions} from '../../actions/transactionActions';
import {Line} from 'react-chartjs-2';
import LineChart from './LineChart';

class MarketTrendChart extends React.Component {

    state = {
        currentBet:this.props.bets[0].id
    }

    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
    }

    componentDidMount() {
        this.props.fetchTransactions(this.state.currentBet,this.props.option);
    }



    onChangeBet = (e) => {
        this.setState({currentBet:e.target.value})
        this.props.fetchTransactions(e.target.value,this.props.option);
    }

    renderMarketFilter() {
        return(
            <div>
                <Form.Control as="select" onChange={this.onChangeBet}>
                {this.props.bets.map(bet => <option value={bet.id}>
                    {bet.chosenOption}
                </option>)}
                </Form.Control>
                <hr className="my-4"></hr>
            </div>
        )
    }
    
    render() {
        console.log(this.state.currentBet)
        return(
            <div>
                <header>
                    <h4>Trend rynku</h4>
                    <hr className="my-4"></hr>
                </header>
                {this.props.transactions && (
                    <div>
                    {this.renderMarketFilter()}
                <LineChart transactions={this.props.transactions} color="#3E517A" title={"Cena akcji"} />
                    </div>)}
            </div>
        )
    }
}

const mapStateToProps = (state,ownProps) => {
    return {
        loading: state.loading.FETCH_TRANSACTIONS,
        alert: state.alert,
        transactions: state.transactions,
        betId: ownProps.betId,
        option: ownProps.option
    }
}

export default connect(mapStateToProps,{fetchTransactions})(MarketTrendChart)