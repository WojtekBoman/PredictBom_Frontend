import React from "react";
import { connect } from "react-redux";
import { Button, Col, Container, Image, Row, Spinner } from "react-bootstrap";
import { fetchMarket } from "../../actions/marketActions";
import BetsList from "./BetsList";
import MarketTrendChart from "./MarketTrendChart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSadTear } from "@fortawesome/free-solid-svg-icons";
import { LinkContainer } from "react-router-bootstrap";
import BackHeader from "../BackHeader";
import { alertActions } from "../../actions/alertActions";
import { displayMarketCover } from "../../helpers/MartketCovers";


class MarketDetails extends React.Component {
  componentWillUnmount() {
    this.props.clear();
  }

  componentDidMount() {
    if (!this.props.currentMarket)
      this.props.fetchMarket(this.props.match.params.id);
  }

  renderLoading = () => {
    if (
      !this.props.currentMarket &&
      typeof this.props.loadingMarket !== "undefined" &&
      this.props.loadingMarket.pending
    ) {
      return (
        <Container className="text-center bg-light border rounded shadow-container create-market-container">
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          <h3>Pobieranie danych rynku</h3>
        </Container>
      );
    }
  };

  renderBetsList = () => {
    return (
      <BetsList
        correctBetId={this.props.currentMarket.correctBetId}
        correctBetOption={this.props.currentMarket.correctBetOption}
        bets={this.props.currentMarket.bets}
        marketId={this.props.match.params.id}
      />
    );
  };

  renderNotFoundMessage() {
    if (this.props.alert.payload && this.props.alert.type !== "ALERT_BUYING")
      return (
        <Container className="text-center bg-light border rounded shadow-container create-market-container">
          <FontAwesomeIcon icon={faSadTear} size={"6x"} />
          <h3>{this.props.alert.payload}</h3>
        </Container>
      );
  }

  renderMarketPage = () => {
    if (this.props.currentMarket) {
      return (
        <Container className="bg-light border rounded shadow-container create-market-container">
          <BackHeader title={this.props.currentMarket.topic} />
          <hr className="my-4"></hr>
          <Row>
            <Col sm={6}>
              <Image
                variant="top"
                src={displayMarketCover(this.props.currentMarket.marketCover,this.props.currentMarket.category)}
                className="market-cover"
              />
            </Col>
            <Col sm={6}>
              <div className="rules">
                <h4>Zasady rynku</h4>
                <p>{this.props.currentMarket.description}</p>
                <hr className="my-4"></hr>
              </div>
              <div className="endDate">
                {this.props.currentMarket.correctBetId === 0 ? <h4>Przewidywana data zakończenia</h4> : <h4>Data zakończenia</h4>}
                {this.props.currentMarket.endDate.substring(0, 4) === "3000" ? (
                  <p>Nieokreślona</p>
                ) : (
                  <p>{this.props.currentMarket.endDate}</p>
                )}
              </div>
            </Col>
          </Row>
          <hr className="my-4"></hr>
          <div className="bets">
            <h4>Zakłady</h4>
            {this.renderBetsList()}
            {!this.props.currentMarket.bets && (
              <LinkContainer
                className="text-center"
                to={`/markets/editBets/${this.props.currentMarket.marketId}`}
              >
                <Button>Dodaj zakłady</Button>
              </LinkContainer>
            )}
          </div>
          <hr className="my-4"></hr>
          {this.props.currentMarket.bets && (
            <MarketTrendChart
              bets={this.props.currentMarket.bets}
              option={true}
              endDate={this.props.currentMarket.endDate}
              correctBetId={this.props.currentMarket.correctBetId}
            />
          )}
        </Container>
      );
    }
  };

  render() {
    return (
      <div>
        {this.renderLoading()}
        {this.renderNotFoundMessage()}
        {this.renderMarketPage()}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    loadingMarket: state.loading.FETCH_MARKET,
    currentMarket: state.markets.find(
      (market) => market.marketId.toString() === ownProps.match.params.id
    ),
    alert: state.alert,
  };
};

export default connect(mapStateToProps, {
  fetchMarket,
  clear: alertActions.clear,
})(MarketDetails);
