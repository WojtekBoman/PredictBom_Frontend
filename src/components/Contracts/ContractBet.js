import React from 'react'; 
import {connect} from 'react-redux';
import {Segment} from 'semantic-ui-react';
import {Row,Col} from 'react-bootstrap';
import {fetchBetPrice} from '../../actions/marketActions';
import Loader from 'react-loader-spinner';


class ContractBet extends React.Component {

    componentDidMount() {
        this.props.fetchBetPrice(this.props.betId,this.props.contractOption);
    }
    renderLoading= () => {
        if((typeof this.props.loading !== 'undefined') && this.props.loading.pending){
            return (<div>
            <Loader
            type="TailSpin"
            color="black"
            width={50}
            height={50}/>
       </div>)
        }
    }

    renderPrice = () => {
        if(this.props.betPrice) {
            return <div>{this.props.contractOption ? <h4>Ostatnia cena: {this.props.betPrice.yesPrice}</h4> : <h4>Ostatnia cena: {this.props.betPrice.noPrice}</h4>}</div>;
        }
    }


    render() {
        return(
            <Segment color={this.props.contractOption ? "green" : "red"} className="mt-3">
             <Row>  
                 <Col sm={9}>
            <h2 className="ui header">{this.props.title}</h2>
            {this.props.contractOption ? <h4>Kontrakt na tak</h4> : <h4>Kontrakt na nie</h4>}
                </Col>
                <Col sm={3}>
                    {this.renderPrice()}
                    {this.renderLoading()}
                </Col>
            </Row> 
            </Segment>
        )
    }
}

const mapStateToProps = (state,ownProps) => {
    return {
        betPrice:state.betPrice[ownProps.betId],
        loading: state.loading.FETCH_BETS_PRICE
    }
}

export default connect(mapStateToProps,{fetchBetPrice})(ContractBet);