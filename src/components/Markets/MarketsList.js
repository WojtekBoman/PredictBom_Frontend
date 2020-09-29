import React from 'react';
import {connect} from 'react-redux';
import {fetchMarkets} from '../../actions/marketActions';
import {InputGroup,Button,FormControl,Row,Col} from 'react-bootstrap';
import Market from './Market';


class MarketsList extends React.Component {

    componentDidMount() {
        this.props.fetchMarkets(this.props.typeOfMarkets);
    }

    renderList() {

        if(this.props.markets.markets){
            return(
                <Row style={{width:"100%"}}>
                    {this.props.markets.markets.map(market => 
                    <Col xs={12} sm={6} className="d-flex align-items-stretch" style={{margin:"20px 0"}}>
                        <Market marketTitle={market.topic} description={market.description}/>
                    </Col>
                    )}
                </Row>
                )
        }
        
    }

    render() {
        
        return(
                <div>
                
                {this.renderList()}
            </div>
        )
    }
}

const mapStateToProps = (state,ownProps) => {
    return {
        typeOfMarkets: ownProps.typeOfMarkets,
        markets: state.markets
    }
}

export default connect(mapStateToProps,{fetchMarkets})(MarketsList);