import React from 'react' 
import { Row,Col, Button,Spinner } from 'react-bootstrap';
import {connect} from 'react-redux';
import { Segment } from 'semantic-ui-react'
import {deleteBet} from '../../actions/marketActions';

class Bet extends React.Component {

    state={
        submitted:false
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

    render() {
        return(
            <div>
            <Segment color="blue" style={{margin:"10px"}}>
            <h2 className="ui header">{this.props.chosenOption}</h2>
            <Button className="close-button" onClick={this.onClickDeleteBet}>{this.renderButtonContent()}</Button>
            <Row className="text-center">
                <Col sm={6}>
                    <h5>Cena tak</h5>
                    <h6>0.00 $</h6>
                    <Button variant={"success"}>
                        Kup
                    </Button>
                </Col>
                <Col sm={6}>
                    <h5>Cena nie</h5>
                    <h6>0.00 $</h6>
                    <Button variant={"danger"}>
                        Kup
                    </Button>
                </Col>
            </Row>
            </Segment>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.loading.DELETE_BET
        
    }
}

export default connect(mapStateToProps,{deleteBet})(Bet);