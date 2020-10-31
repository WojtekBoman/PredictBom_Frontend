import React from 'react' 
import { Row,Col, Button,Spinner } from 'react-bootstrap';
import {connect} from 'react-redux';
import { Segment } from 'semantic-ui-react'
import {deleteBet} from '../../actions/marketActions';
import {fetchBetPrice} from '../../actions/marketActions';
import {alertActions} from '../../actions/alertActions';
import Loader from 'react-loader-spinner';
import BuyContractForm from './BuyContractForm';
import _ from 'lodash';

class Bet extends React.Component {

    constructor(props) {
        super(props)
    
        this.hideForm = this.hideForm.bind(this)
      }
    

    state={
        submitted:false,
        contractOption:null,
    }

    componentDidMount() {
       if(!this.props.betPrice) this.props.fetchBetPrice(this.props.betId);
    }

    hideForm = () => {
        this.setState({contractOption:null});
        this.props.clear();
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


    renderPrice() {
        if(this.props.betPrice){
            return(
                <Row className="text-center">
                <Col sm={4}>
                    <h5>Cena tak</h5>
                    <h6>{this.props.betPrice.yesPrice} $</h6>
                    {(!_.isEmpty(this.props.player)) && (<Button variant={"success"} onClick={() => this.setState({contractOption:true})}>
                        Kup
                    </Button>)}
                   
                </Col>
                <Col>
                <Button style={{marginBottom:"10px"}}>
                        Przeglądaj oferty na tak
                </Button>
                <Button>
                        Przeglądaj oferty na nie
                </Button>
                </Col>
                <Col sm={4}>
                    <h5>Cena nie</h5>
                    <h6>{this.props.betPrice.noPrice} $</h6>
                    {(!_.isEmpty(this.props.player)) && ( <Button variant={"danger"} onClick={() => this.setState({contractOption:false})}>
                        Kup
                    </Button>) }
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

    renderBuyForm = () => {
        if(this.state.contractOption != null){
            return(
               <BuyContractForm marketId={this.props.marketId} betId={this.props.betId} contractOption={this.state.contractOption} hideForm={this.hideForm}/>
            )
        }
    }

    render() {
        console.log(this.state);
        return(
            <div>
            <Segment color="blue" style={{margin:"10px"}}>
            <h2 className="ui header">{this.props.chosenOption}</h2>
            {window.location.href.includes("editBets") && !this.props.published && (<Button className="close-button" onClick={this.onClickDeleteBet}>{this.renderButtonContent()}</Button>)}
            {this.renderPrice()}
            {this.renderLoadingPrice()}
            {this.renderBuyForm()}
            </Segment>
            </div>
        )
    }
}

const mapStateToProps = (state,ownProps) => {
    return {
        loading: state.loading.DELETE_BET,
        betPrice:state.betPrice[ownProps.betId],
        loadingPrice: state.loading.FETCH_BETS_PRICE,
        player: state.player
    }
}

export default connect(mapStateToProps,{clear:alertActions.clear,deleteBet,fetchBetPrice})(Bet);