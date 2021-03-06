import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Bet from "./Bet";

class BetsList extends React.Component {
  renderNotFoundInfo() {
    return (
      <div>
        <FontAwesomeIcon icon={faTimes} size={"6x"} />
        <h3>Nie znaleziono zakładów</h3>
      </div>
    );
  }

  render() {
    if (this.props.bets === null) {
      return (
        <div className="text-center">
          <FontAwesomeIcon icon={faTimes} size={"6x"} />
          <h3>Nie znaleziono zakładów</h3>
          <h6>Dodaj zakłady, bez nich rynek nie będzie mógł się toczyć !</h6>
        </div>
      );
    }

    return (
      <div>
        {this.props.bets.map((bet) => (
          <Bet
            correctBetId={this.props.correctBetId}
            correctBetOption={this.props.correctBetOption}
            published={this.props.published}
            bestYesPrice={bet.bestYesPrice}
            bestNoPrice={bet.bestNoPrice}
            key={bet.id}
            betId={bet.id}
            marketId={this.props.marketId}
            title={bet.title}
          />
        ))}
      </div>
    );
  }
}

export default BetsList;
