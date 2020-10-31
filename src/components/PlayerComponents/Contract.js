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

//     return(
//     <Row className="no-gutters">
//     <Col md="4">
//           {this.props.market.marketCover && (<Card.Img className="img" src={typeof(this.props.market.marketCover) !== 'undefined' ? (`data:image/jpeg;base64,${this.props.market.marketCover.data}`) : (this.setCover(this.props.market.marketCategory))} rounded/>)}
//           </Col>
//           <Col md="8">
//             <Card.Body>
//               <Card.Title>{this.props.market.topic}</Card.Title>
//               <Card.Subtitle style={{marginTop:"10px"}}>{this.props.market.bets[0].chosenOption} </Card.Subtitle>
//               <Card.Subtitle style={{marginTop:"10px"}}>{this.props.contractOption ? <p>Wybrana opcja na tak</p> : <p>Wybrana opcja na nie</p>}</Card.Subtitle>
//               <Card.Subtitle style={{marginTop:"10px"}}>Liczba akcji: {this.props.countOfContracts}</Card.Subtitle>
//               <Card.Subtitle style={{marginTop:"10px"}}>Wartość akcji: {this.props.valueOfShares}</Card.Subtitle>
//               <Card.Text>
//               {this.props.market.description}
//               </Card.Text>
//               <Button>Button</Button>
//             </Card.Body>
//           </Col>
// </Row>
//     )

      return(
        <Figure>
        <Figure.Image style={{width: "100%",
    height: "15vw",
    objectFit: "cover"}} className="img" src={this.props.market.marketCover ? (`data:image/jpeg;base64,${this.props.market.marketCover.data}`) : (this.setCover(this.props.market.marketCategory))} rounded/>
  <Figure.Caption>
    Nulla vitae elit libero, a pharetra augue mollis interdum.
  </Figure.Caption>
</Figure>
      )
  }
  
    render() {
          return(
            <Card style={{margin:"0 auto"}}>
              <LinkContainer to={`/contracts/details/${this.props.betId}`}>
    <Image style={{width: "100%",
    height: "15vw",
    objectFit: "cover"}} className="img" src={this.props.market.marketCover ? (`data:image/jpeg;base64,${this.props.market.marketCover.data}`) : (this.setCover(this.props.market.category))} />
    </LinkContainer>
    <Card.Content>
          <Card.Header>{this.props.market.bets[0].chosenOption}</Card.Header>
            {this.props.contractOption ? <Card.Header>Kontrakt na tak</Card.Header> : <Card.Header>Kontrakt na nie</Card.Header>}
      <Card.Meta>{this.props.market.topic}</Card.Meta>
      <Card.Description>
        {this.props.market.description}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name='money bill alternate outline' />
        Liczba akcji: {this.props.countOfContracts}
      </a>
    </Card.Content>
  </Card>)
    }
    
}


export default connect(null)(Contract);