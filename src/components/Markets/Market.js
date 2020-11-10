import React from 'react';
import { LinkContainer } from "react-router-bootstrap";
import {Card,Button} from 'react-bootstrap';
import sportBackground from '../../img/sportBackground.png';
import celebryciBackground from '../../img/celebryciBackground.jpg';
import politykaBackground from '../../img/politykaBackground.jpg';
import gospodarkaBackground from '../../img/gospodarkaBackground.jpg';
import inneBackground from '../../img/inneBackground.png';
import TimeAgo from 'react-timeago';
import polishStrings from 'react-timeago/lib/language-strings/pl';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';
import {connect} from 'react-redux'


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
      {props.user.roles[0]==="ROLE_MODERATOR" && (
        <div>
          {!props.published && (
            <LinkContainer className="market-card-buttons" to={`/markets/editCover/${props.marketId}`}>
            <Button>
              Zmień zdjęcie
            </Button>
            </LinkContainer>
          )}

      <LinkContainer className="market-card-buttons" to={`/markets/editBets/${props.marketId}`}>
      <Button>
        Edytuj Zakłady
      </Button>
      </LinkContainer>
      {props.bets && !props.published && (
         <LinkContainer className="market-card-buttons" to={`/markets/makePublic/${props.marketId}`}>
         <Button>
           Opublikuj rynek
         </Button>
         </LinkContainer>
      )}
      {props.published && (
          <LinkContainer className="market-card-buttons" to={`/markets/solveMarket/${props.marketId}`}>
          <Button>
            Rozwiąż rynek
          </Button>
          </LinkContainer>
      )}
        </div>
      )}
      
    </Card.Body>
    <Card.Footer>
      <small className="text-muted">Dodano <TimeAgo date={props.createdDate} formatter={buildFormatter(polishStrings)}/></small>
    </Card.Footer>
  </Card>
    )
}

const mapStateToProps = state => {
  return{
    user: state.login.user
  }
}

export default connect(mapStateToProps)(Market);