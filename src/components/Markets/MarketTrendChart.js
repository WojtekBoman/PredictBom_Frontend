import React from 'react';
import { Container,Form } from 'react-bootstrap';
import {connect} from 'react-redux';
import {fetchTransactions} from '../../actions/transactionActions';
import {Line} from 'react-chartjs-2';
import LineChart from './LineChart';
import Loader from 'react-loader-spinner';

class MarketTrendChart extends React.Component {

    state = {
        currentBet:this.props.bets[0].id,
        timeAgo:1
    }

    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
    }

    componentDidMount() {
        var today = new Date();
        today.setDate(today.getDate() - 1)
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = mm + '-' + dd + '-' + yyyy;
        console.log(today)

        this.props.fetchTransactions(this.state.currentBet,this.props.option,today);
    }


    onChangeTimeAgo = (e) => {
        this.setState({timeAgo:e.target.value})
        var today = new Date();
        today.setDate(today.getDate() - e.target.value)
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = mm + '-' + dd + '-' + yyyy;
        console.log(today)
        this.props.fetchTransactions(this.state.currentBet,this.props.option,today);
    }

    onChangeBet = (e) => {
        this.setState({currentBet:e.target.value})
        this.props.fetchTransactions(e.target.value,this.props.option,this.props.timeAgo);
    }
    
    renderLoading() {
        if(typeof(this.props.loading) !== "undefined" && this.props.loading.pending){
            return(
                <Loader
                         height={50}
                         width={50}
                         style={{margin:"10px"}}
                         type="TailSpin"
                         color="black"
                    />
            )
        }
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
                {this.renderTimeAgoFilter()}
            </div>
        )
    }

    renderTimeAgoFilter() {
        const times = [
            {value:1,text:"Ostatni dzień"},
            {value:7,text:"Ostatni tydzień"},
            {value:30,text:"Ostatni miesiąc"} ,
            {value:90,text:"Ostatnie 90 dni"}           
        ]

        return(
            <Form.Control as="select" onChange={this.onChangeTimeAgo}>
            {times.map(time => <option value={time.value}>
                {time.text}
            </option>)}
            </Form.Control>
        )

    }
    
    render() {

        return(
            <div>
                <header>
                    <h4>Trend rynku</h4>
                    <hr className="my-4"></hr>
                </header>
                {this.props.transactions && (
                    <div>
                    {this.renderMarketFilter()}
                    {this.renderLoading()}    
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