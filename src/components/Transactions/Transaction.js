import React from "react";
import { Item } from "semantic-ui-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoneyBillWave,
  faCalendar,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { displayMarketCover } from "../../helpers/MartketCovers";

const Transaction = (props) => {
  return (
    <Item>
      <Item.Image
        size="medium"
        className="img"
        src={displayMarketCover(props.marketInfo.marketCover,props.marketInfo.marketCategory)}
      />

      <Item.Content>
        <Item.Header>{props.marketInfo.topic}</Item.Header>
        <Item.Meta>
          <h4>{props.bet.title}</h4>
          <h5>{props.option ? "Opcja na tak" : "Opcja na nie"}</h5>
          <span className="price">
            <FontAwesomeIcon icon={faMoneyBillWave}></FontAwesomeIcon> Liczba
            akcji: {props.shares}
          </span>
          <span className="stay">
            <FontAwesomeIcon icon={faMoneyBillWave}></FontAwesomeIcon> Cena za 1
            akcję: {props.price}
          </span>
          <hr className="my-3"></hr>
          <span className="price">
            <FontAwesomeIcon icon={faCalendar}></FontAwesomeIcon> Data
            transakcji: {props.transactionDate}
          </span>
          <hr className="my-3"></hr>
          <span className="dealer">
            <FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon> Kupujący:{" "}
            {props.purchaser}
          </span>
          <hr className="my-3"></hr>
          <span className="dealer">
            <FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon> Sprzedawca:{" "}
            {props.dealer}
          </span>
        </Item.Meta>
        <Item.Description></Item.Description>
      </Item.Content>
    </Item>
  );
};

export default Transaction;
