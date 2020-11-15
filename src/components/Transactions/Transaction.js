import React from 'react';
import { Button, Image, Item } from 'semantic-ui-react';
import sportBackground from '../../img/sportBackground.png';
import celebryciBackground from '../../img/celebryciBackground.jpg';
import politykaBackground from '../../img/politykaBackground.jpg';
import gospodarkaBackground from '../../img/gospodarkaBackground.jpg';
import inneBackground from '../../img/inneBackground.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMoneyBillWave,faCalendarPlus, faCalendar,faShoppingCart} from '@fortawesome/free-solid-svg-icons';

const setCover = (category) => {

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

const Transaction = (props) => {

    // style={{width: "100%",
    // height: "15vw",
    // objectFit: "cover"}}
    
        return(
            <Item>
    <Item.Image size="medium"  className="img" src={props.marketInfo.marketCover ? (`data:image/jpeg;base64,${props.marketInfo.marketCover.data}`) : (setCover(props.marketInfo.marketCategory))} />

    <Item.Content>
        <Item.Header>{props.marketInfo.topic}</Item.Header>
        <Item.Meta>
        <h4>{props.bet.chosenOption}</h4>
        <h5>{props.option ? "Opcja na tak" : "Opcja na nie"}</h5>
        <span className='price'><FontAwesomeIcon icon={faMoneyBillWave}></FontAwesomeIcon> Liczba akcji: {props.countOfShares}</span>
        <span className='stay'><FontAwesomeIcon icon={faMoneyBillWave}></FontAwesomeIcon> Cena za 1 akcję: {props.price}</span>
          <hr className="my-3"></hr>
        <span className='price'><FontAwesomeIcon icon={faCalendar}></FontAwesomeIcon>Data transakcji: {props.transactionDate}</span>
          <hr className="my-3"></hr>
        <span className='dealer'><FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon>Kupujący: {props.purchaser}</span>
          <hr className="my-3"></hr>
        <span className='dealer'><FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon>Sprzedawca: {props.dealer}</span>
        </Item.Meta>
        <Item.Description></Item.Description>
      </Item.Content>
    </Item>
        )
}

export default Transaction;