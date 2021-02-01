import React from 'react';
import {connect} from 'react-redux';
import {Row,Col,Button,Figure} from 'react-bootstrap';
import sportBackground from '../../img/sportBackground.png';
import celebryciBackground from '../../img/celebryciBackground.jpg';
import politykaBackground from '../../img/politykaBackground.jpg';
import gospodarkaBackground from '../../img/gospodarkaBackground.jpg';
import { LinkContainer } from "react-router-bootstrap";
import Loader from 'react-loader-spinner';
import inneBackground from '../../img/inneBackground.png';
import {fetchContractDetails} from '../../actions/contractActions';
import { Image, Item,Card,Icon } from 'semantic-ui-react'

class Contract extends React.Component {

  state = {
    borderColor:"black",
    status:"",
    iconName:""
  }

  componentDidMount() {
    switch(this.props.contractStatus.toLowerCase()) {
      case "pending":
        this.setState({borderColor:"black",status:"Oczekujący",iconName:"clock"});
        break;
      case "won":
        this.setState({borderColor:"green",status:"Wygrany",iconName:"trophy"});
        break;
      case "lost":
        this.setState({borderColor:"red",status:"Przegrany",iconName:"close"});
        break;
      default:
        this.setState({borderColor:"black",status:"Oczekujący",iconName:"clock"});
    }
  }


    setCover = () => {
      switch(this.props.marketInfo.marketCategory){
        case "SPORT":
          return sportBackground;
        case "CELEBRITIES":
          return celebryciBackground;
        case "POLICY":
          return politykaBackground;
        case "ECONOMY":
          return gospodarkaBackground;
        case "OTHER":
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

  renderCardBorder = (status) => {
    switch(status.toLowerCase()) {
      case "pending":
        return "black";
      case "won":
        return "green";
      case "lost":
        return "red";
      default:
        return "black" ;
    }
  }


  renderContractContent = () => {

      return(
        <Figure>
        <Figure.Image style={{width: "100%",
    height: "15vw",
    objectFit: "cover"}} className="img" src={this.props.marketInfo.marketCover ? (`data:image/jpeg;base64,${this.props.marketInfo.marketCover.data}`) : (this.setCover(this.props.marketInfo.marketCategory))} rounded/>
  <Figure.Caption>
    Nulla vitae elit libero, a pharetra augue mollis interdum.
  </Figure.Caption>
</Figure>
      )
  }
  
    render() {
          return(
            <Card style={{margin:"0 auto"}} fluid color={this.state.borderColor}>
              <LinkContainer to={`/contracts/details/${this.props.id}`}>
    <Image style={{width: "100%",
    height: "15vw",
    objectFit: "cover"}} className="img" src={this.props.marketInfo.marketCover ? (`data:image/jpeg;base64,${this.props.marketInfo.marketCover.data}`) : (this.setCover(this.props.marketInfo.category))} />
    </LinkContainer>
    <Card.Content>
          <Card.Header>{this.props.bet.title}</Card.Header>
            {this.props.contractOption ? <Card.Header>Kontrakt na tak</Card.Header> : <Card.Header>Kontrakt na nie</Card.Header>}
      <Card.Meta>{this.props.marketInfo.topic}</Card.Meta>
   
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name='money bill alternate outline' />
          {this.props.shares > 0 ? <span>Liczba akcji: {this.props.shares}</span> : <span>Wszystkie akcje w sprzedaży</span>}
      </a>
    </Card.Content>
    {this.props.contractStatus === "PENDING" && (
       <Card.Content extra>
       <a>
         <Icon name="sellsy" />
         {this.props.offersSize}
       </a>
     </Card.Content>
    )}
    <Card.Content extra>
      <a>
        <Icon name={this.state.iconName} />
        {this.state.status}
      </a>
    </Card.Content>
  </Card>)
    }
    
}


export default connect(null)(Contract);