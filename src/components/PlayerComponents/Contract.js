import React from 'react';
import {connect} from 'react-redux';
import {Row,Col,Card,Button} from 'react-bootstrap';
import sportBackground from '../../img/sportBackground.png';
import celebryciBackground from '../../img/celebryciBackground.jpg';
import politykaBackground from '../../img/politykaBackground.jpg';
import gospodarkaBackground from '../../img/gospodarkaBackground.jpg';
import Loader from 'react-loader-spinner';
import inneBackground from '../../img/inneBackground.png';
import {fetchContractDetails} from '../../actions/contractActions';

class Contract extends React.Component {

    componentDidMount() {
        this.props.fetchContractDetails(this.props.betId);
    }

    setCover = (category) => {
      switch(category){
          case "SPORT":
            return sportBackground;
          case "CELEBRYCI":
            return celebryciBackground;
          case "POLITYKA":
            return politykaBackground;
          case "GOSPODARKA":
            return gospodarkaBackground;
          case "INNE":
            return inneBackground;
          default:
            return inneBackground;
  
      }
  }

  renderLoading = () => {
    if(!this.props.market)
      return(

        <Row className="text-center no-gutters">
        <Loader
             type="TailSpin"
             color="black"
        />
        </Row>
        )
  
  }

  renderContractContent = () => {
    if(this.props.bet && this.props.market) {
      return(
        <Row className="no-gutters">
            <Col md="4">
                  {this.props.market.marketCover && (<Card.Img className="img" src={typeof(this.props.market.marketCover) !== 'undefined' ? (`data:image/jpeg;base64,${this.props.market.marketCover.data}`) : (this.setCover(this.props.market.marketCategory))} rounded/>)}
                  </Col>
                  <Col md="8">
                    <Card.Body>
                      <Card.Title>{this.props.market.topic}</Card.Title>
                      <Card.Subtitle style={{marginTop:"10px"}}>{this.props.bet.chosenOption} </Card.Subtitle>
                      <Card.Subtitle style={{marginTop:"10px"}}>{this.props.contractOption ? <p>Wybrana opcja na tak</p> : <p>Wybrana opcja na nie</p>}</Card.Subtitle>
                      <Card.Subtitle style={{marginTop:"10px"}}>Liczba akcji: {this.props.countOfContracts}</Card.Subtitle>
                      <Card.Subtitle style={{marginTop:"10px"}}>Wartość akcji: {this.props.valueOfShares}</Card.Subtitle>
                      <Card.Text>
                      {this.props.market.description}
                      </Card.Text>
                      <Button>Button</Button>
                    </Card.Body>
                  </Col>
        </Row>
      )
    }
  }
  
    render() {
        if(this.props.bet && this.props.market) {
          return(
            <Row style={{margin:"20px"}}>
            <Col>
              <Card>
                  {this.renderContractContent()}
              </Card>
            </Col>
          </Row>)
    }
    return(
      <div>
      {this.renderLoading()}
      </div>
    )
        }
        
       
    }


const findMarket = (state,ownProps) => {
  if(state.bets[ownProps.betId]) {
    return state.markets.find(market => market.marketId == state.bets[ownProps.betId].marketId) 
  } else{
    return null;
  }
}

const mapStateToProps = (state,ownProps) => {
  console.log(state);
    return{
        bet: state.bets[ownProps.betId],
        market: findMarket(state,ownProps),
        alert: state.alert
    }
}
    

export default connect(mapStateToProps,{fetchContractDetails})(Contract);