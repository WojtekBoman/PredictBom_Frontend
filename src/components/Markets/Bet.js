import React from 'react' 
import { Row,Col, Button,Spinner } from 'react-bootstrap';
import {connect} from 'react-redux';
import { Segment } from 'semantic-ui-react'
import {deleteBet} from '../../actions/marketActions';
import {fetchBetPrice} from '../../actions/marketActions';
import Loader from 'react-loader-spinner';

class Bet extends React.Component {

    state={
        submitted:false
    }

    componentDidMount() {
        this.props.fetchBetPrice(this.props.betId);
    }

    renderButtonContent() {
        if ((typeof this.props.loading !== 'undefined') && this.props.loading.pending && this.state.submitted) {
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
            return "Usuń"
        }
    }

    onClickDeleteBet = () => {
        this.setState({submitted:true})
        this.props.deleteBet(this.props.marketId,this.props.betId)
    }

    renderLoadingMessage(){
     
    }

    renderPrice() {
        if(this.props.betPrice){
            console.log("BetPrice",this.props.betPrice)
            return(
                <Row className="text-center">
                <Col sm={6}>
                    <h5>Cena tak</h5>
                    <h6>{this.props.betPrice.yesPrice} $</h6>
                    <Button variant={"success"}>
                        Kup
                    </Button>
                </Col>
                <Col sm={6}>
                    <h5>Cena nie</h5>
                    <h6>{this.props.betPrice.noPrice} $</h6>
                    <Button variant={"danger"}>
                        Kup
                    </Button>
                </Col>
            </Row>
            )
        }
    }

    renderLoadingPrice() {
        if ((typeof this.props.loadingPrice !== 'undefined') && this.props.loadingPrice.pending) {
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
            <div>
            <Segment color="blue" style={{margin:"10px"}}>
            <h2 className="ui header">{this.props.chosenOption}</h2>
            <Button className="close-button" onClick={this.onClickDeleteBet}>{this.renderButtonContent()}</Button>
            {this.renderPrice()}
            {this.renderLoadingPrice()}
            </Segment>
            </div>
        )
    }
}

const mapStateToProps = (state,ownProps) => {
    return {
        loading: state.loading.DELETE_BET,
        betPrice:state.bets[ownProps.betId],
        loadingPrice: state.loading.FETCH_BET_PRICE
    }
}

export default connect(mapStateToProps,{deleteBet,fetchBetPrice})(Bet);