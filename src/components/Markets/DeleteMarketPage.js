import React from "react";
import { connect } from "react-redux";
import { Button, Container } from "react-bootstrap";
import { fetchMarket, deleteMarket } from "../../actions/marketActions";
import { LinkContainer } from "react-router-bootstrap";
import Loader from "react-loader-spinner";
import BackHeader from "../BackHeader";
import { renderButtonContent } from "../../helpers/LoadingContent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { alertActions } from "../../actions/alertActions";

class DeleteMarketPage extends React.Component {
  componentDidMount() {
    this.props.fetchMarket(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.props.clear();
  }

  renderLoading() {
    if (
      typeof this.props.loadingMarket !== "undefined" &&
      this.props.loadingMarket.pending &&
      !this.props.currentMarket
    ) {
      return (
        <div className="text-center">
          <Loader type="TailSpin" color="black" />
        </div>
      );
    }
  }

  renderFirstDeleteBetsInfo() {
    return (
      <div>
        <h4>Aby usunąć rynek najpierw usuń zakłady</h4>
        <LinkContainer to={`/markets/editBets/${this.props.match.params.id}`}>
          <Button>Edytuj zakłady</Button>
        </LinkContainer>
      </div>
    );
  }

  renderDeleteField() {
    return (
      <div>
        <h4>Czy na pewno chcesz usunąć rynek ?</h4>
        <Button
          onClick={() => this.props.deleteMarket(this.props.match.params.id)}
        >
          {renderButtonContent(this.props.loading, "Usuń rynek")}
        </Button>
      </div>
    );
  }

  renderFailedToFetch() {
    if (this.props.alert.payload) {
      return (
        <div className="text-center">
          <FontAwesomeIcon icon={faExclamationCircle} size={"6x"} />
          <h3>{this.props.alert.payload}</h3>
        </div>
      );
    }
  }

  renderContent() {
    if (this.props.currentMarket) {
      return (
        <div>
          {this.props.currentMarket.bets ? (
            <div>{this.renderFirstDeleteBetsInfo()}</div>
          ) : (
            <div>{this.renderDeleteField()}</div>
          )}
        </div>
      );
    }
  }

  render() {
    return (
      <Container className="bg-light border rounded shadow-container create-market-container">
        <BackHeader title="Usuwanie rynku" />
        <hr className="my-4"></hr>
        {this.renderLoading()}
        {this.renderContent()}
        {this.renderFailedToFetch()}
      </Container>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    loadingMarket: state.loading.FETCH_MARKET,
    loading: state.loading.DELETE_MARKET,
    currentMarket: state.markets.find(
      (market) => market.marketId.toString() === ownProps.match.params.id
    ),
    alert: state.alert,
  };
};

export default connect(mapStateToProps, {
  fetchMarket,
  deleteMarket,
  clear: alertActions.clear,
})(DeleteMarketPage);
