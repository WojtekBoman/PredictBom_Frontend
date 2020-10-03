import React from 'react';
import { LinkContainer } from "react-router-bootstrap";
import {Card,Button} from 'react-bootstrap';
import sportBackground from '../../img/sportBackground.png';
import celebryciBackground from '../../img/celebryciBackground.jpg';
import politykaBackground from '../../img/politykaBackground.jpg';
import gospodarkaBackground from '../../img/gospodarkaBackground.jpg';
import inneBackground from '../../img/inneBackground.png';


const  setCover = (category) => {

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

const Market = (props) => {

    return(
        <Card>
          <LinkContainer to={`/markets/details/${props.marketId}`}>
    <Card.Img className="toMarket" variant="top" src={props.marketCover ? (`data:image/jpeg;base64,${props.marketCover.data}`) : (setCover(props.marketCategory))} style={{width: "100%",
    height: "15vw",
    objectFit: "cover"}}/>
    </LinkContainer>
    <Card.Body>
      <Card.Title>{props.marketTitle}</Card.Title>
      <Card.Text>
        {props.description}
      </Card.Text>
      <LinkContainer to={`/markets/editCover/${props.marketId}`}>
      <Button>
        Zmień zdjęcie
      </Button>
      </LinkContainer>
    </Card.Body>
    <Card.Footer>
      <small className="text-muted">Last updated 3 mins ago</small>
    </Card.Footer>
  </Card>
    )
}

export default Market;