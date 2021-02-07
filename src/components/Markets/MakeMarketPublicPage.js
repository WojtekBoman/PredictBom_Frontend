import React from "react";
import { connect } from "react-redux";
import { Container, Image, Spinner, Button } from "react-bootstrap";
import { fetchMarket, makePublic } from "../../actions/marketActions";
import { LinkContainer } from "react-router-bootstrap";
import BetsList from "./BetsList";
import { renderInfo } from "../../helpers/FormInputs";
import { renderButtonContent } from "../../helpers/LoadingContent";
import { displayMarketCover } from "../../helpers/MartketCovers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

class MakeMarketPublicPage extends React.Component {
  componentDidMount() {
    this.props.fetchMarket(this.props.match.params.id);
  }

  renderBetsList = () => {
    if (!this.props.currentMarket.bets) {
      return (
        <div>
          Brak zakładów. Nie możesz opublikować rynku dopóki nie dodasz zakładów
        </div>
      );
    }

    return (
      <div>
        <h4>Zakłady</h4>
        <BetsList
          correctBetId={this.props.currentMarket.correctBetId}
          bets={this.props.currentMarket.bets}
          marketId={this.props.match.params.id}
        />
      </div>
    );
  };

  renderEditMenu = () => {
    return (
      <div className="text-center">
        <LinkContainer to={`/markets/editCover/${this.props.match.params.id}`}>
          <Button variant="primary" className="edit-market-button">
            Zmień okładkę
          </Button>
        </LinkContainer>
        <LinkContainer to={`/markets/editBets/${this.props.match.params.id}`}>
          <Button variant="primary" className="edit-market-button">
            Edytuj zakłady
          </Button>
        </LinkContainer>
        <LinkContainer to={`/markets/editMarket/${this.props.match.params.id}`}>
          <Button variant="primary" className="edit-market-button">
            Edytuj dane rynku
          </Button>
        </LinkContainer>
      </div>
    );
  };

  makeMarketPublic = () => {
    this.props.makePublic(this.props.match.params.id);
  };

  renderMarketIsAlreadyPublishedInfo = () => {
    return (
      <div className="text-center">
        <FontAwesomeIcon icon={faExclamationCircle} size={"9x"} />
        <h2>Rynek posiada już status publiczny</h2>
      </div>
    );
  };

  renderMarketContent = () => {
    if (this.props.currentMarket) {
      if (!this.props.currentMarket.published) {
        return (
          <div>
            <h4>{this.props.currentMarket.topic}</h4>
            {this.props.currentMarket.marketCover && (
              <Image
                style={{ margin: "10px auto" }}
                className="img"
                src={displayMarketCover(this.props.currentMarket.marketCover,this.props.currentMarket.marketCategory)}
                rounded
              />
            )}
            <h5>
              Przewidywana data zakończenia - {this.props.currentMarket.endDate}
            </h5>
            <hr className="my-4"></hr>
            {this.renderBetsList()}
            <hr className="my-4"></hr>
            <h4>Edytuj zakład</h4>
            {this.renderEditMenu()}
            <hr className="my-4"></hr>
            <h4>Opublikuj rynek</h4>
            <div className="text-center">
              <Button
                variant="primary"
                className="edit-market-button"
                onClick={this.makeMarketPublic}
              >
                {renderButtonContent(this.props.loading, "Opublikuj rynek")}
              </Button>
            </div>
          </div>
        );
      } else {
        return <div>{this.renderMarketIsAlreadyPublishedInfo()}</div>;
      }
    }
  };

  renderLoading = () => {
    if (
      !this.props.currentMarket &&
      typeof this.props.loadingMarket !== "undefined" &&
      this.props.loadingMarket.pending
    ) {
      return (
        <div className="text-center">
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          <h3>Pobieranie danych rynku</h3>
        </div>
      );
    }
  };

  render() {
    return (
      <Container className="bg-light border rounded shadow-container create-market-container">
        <header style={{ marginBottom: "30px" }}>
          <h3>To już ostatni krok</h3>
          <p>
            Za chwilę twój rynek stanie się widoczny dla użytkowników. Sprawdź
            czy wszystkie wprowadzone dane i zakłady są prawidłowe. Po
            opublikowaniu rynku nie będziesz mógł edytować cen i usuwać zakładów
            !
          </p>
        </header>
        <hr className="my-4"></hr>
        {this.renderLoading()}
        {this.renderMarketContent()}
        {renderInfo(this.props.alert)}
      </Container>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    alert: state.alert,
    loadingMarket: state.loading.FETCH_MARKET,
    loading: state.loading.MAKE_MARKET_PUBLIC,
    currentMarket: state.markets.find(
      (market) => market.marketId.toString() === ownProps.match.params.id
    ),
  };
};

export default connect(mapStateToProps, { fetchMarket, makePublic })(
  MakeMarketPublicPage
);
