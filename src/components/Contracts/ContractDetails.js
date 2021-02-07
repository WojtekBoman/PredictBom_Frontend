import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { connect } from "react-redux";
import Loader from "react-loader-spinner";
import { fetchContractDetails } from "../../actions/contractActions";
import ContractBet from "./ContractBet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Modal } from "react-bootstrap";
import OffersList from "../Offers/OffersList";
import { LinkContainer } from "react-router-bootstrap";
import { faSadTear } from "@fortawesome/free-solid-svg-icons";
import { alertActions } from "../../actions/alertActions";
import { displayMarketCover } from "../../helpers/MartketCovers";
import BackHeader from "../BackHeader";
import './ContractDetails.scss';

class ContractDetails extends React.Component {
  state = {
    showModal: false,
  };

  componentDidMount() {
    this.props.fetchContractDetails(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.props.clear();
  }

  renderLoading = () => {
    if (
      !this.props.contract &&
      typeof this.props.loading !== "undefined" &&
      this.props.loading.pending
    ) {
      return (
        <Container className="text-center bg-light border rounded shadow-container create-market-container">
          <div className="text-center">
            <Loader type="TailSpin" color="black" />
            <h3>Pobieranie danych kontraktu</h3>
          </div>
        </Container>
      );
    }
  };

  handleModalClose = () => {
    this.props.clear();
  };

  renderDeletingLoading = () => {
    return (
      <Modal
        show={
          typeof this.props.deleting !== "undefined" &&
          this.props.deleting.pending
        }
      >
        <Modal.Body className="text-center">
          <h3>Usuwanie</h3>
          <Loader type="TailSpin" color="black" />
        </Modal.Body>
      </Modal>
    );
  };

  renderInfo = () => {
    return (
      <Modal
        show={this.props.alert.type === "ALERT_DELETING"}
        onHide={this.handleModalClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Nie udało się usunąć oferty</Modal.Title>
        </Modal.Header>
        <Modal.Body>{this.props.alert.payload}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleModalClose}>
            Zamknij
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  renderContractStatus = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return <h5>Oczekujący</h5>;
      case "won":
        return <h5>Wygrany</h5>;
      case "lost":
        return <h5>Przegrany</h5>;
      default:
        return <h5>Oczekujący</h5>;
    }
  };

  renderContent = () => {
    if (
      this.props.contract &&
      this.props.user &&
      this.props.contract.playerId === this.props.user.username
    ) {
      return (
        <Container className="bg-light border rounded shadow-container create-market-container">
          <BackHeader title={this.props.contract.marketInfo.topic} />

          <hr className="my-4"></hr>
          <div>
            <ContractBet
              betId={this.props.contract.bet.id}
              contractOption={this.props.contract.contractOption}
              title={this.props.contract.bet.title}
            />
          </div>
          <hr className="my-4"></hr>
          <h4>Szczegóły kontraktu</h4>
          <Row>
            <Col sm={6}>
              <Image
                variant="top"
                src={displayMarketCover(
                  this.props.contract.marketInfo.marketCover,
                  this.props.contract.marketInfo.marketCategory
                )}
                className="contract-cover"
              />
            </Col>
            <Col sm={6}>
              <div>
                <h4>Liczba akcji</h4>
                <h4>
                  {this.props.contract.shares > 0 ? (
                    <span>{this.props.contract.shares}</span>
                  ) : (
                    <span>Wszystkie akcje w sprzedaży</span>
                  )}
                </h4>
              </div>
              <hr className="my-4"></hr>
              <div>
                <h4>Status kontraktu</h4>
                {this.renderContractStatus(this.props.contract.contractStatus)}
              </div>
            </Col>
          </Row>

          {this.props.contract.contractStatus === "PENDING" ? (
            <div className="mt-3">
              <h4>Oferty</h4>
              <hr className="my-4"></hr>
              <div>
                {this.renderOffers()}
                {this.props.contract && (
                  <div className="button-container">
                    {this.props.contract.shares > 0 && (
                      <LinkContainer
                        className="mr-3"
                        to={`/offers/new/${this.props.match.params.id}`}
                      >
                        <Button variant="primary">Dodaj ofertę</Button>
                      </LinkContainer>
                    )}
                  </div>
                )}
                <LinkContainer
                  to={`/markets/details/${this.props.contract.bet.marketId}`}
                >
                  <Button variant="primary">Wyświetl rynek</Button>
                </LinkContainer>
              </div>
            </div>
          ) : (
            <LinkContainer
              className="mt-3"
              to={`/markets/details/${this.props.contract.bet.marketId}`}
            >
              <Button variant="primary">Wyświetl rynek</Button>
            </LinkContainer>
          )}
        </Container>
      );
    }
  };
  renderOffers = () => {
    return (
      <div>
        {this.props.contract.offers ? (
          <div>
            <OffersList offers={this.props.contract.offers} isOwner={true} />
          </div>
        ) : (
          <div className="text-center">
            <FontAwesomeIcon icon={faSadTear} size={"5x"} />
            <h4>Brak ofert</h4>
          </div>
        )}
      </div>
    );
  };

  renderNotFoundMessage = () => {
    if (
      !this.props.contract &&
      typeof this.props.loading !== "undefined" &&
      !this.props.loading.pending
    ) {
      return (
        <Container className="text-center bg-light border rounded shadow-container create-market-container">
          <FontAwesomeIcon icon={faSadTear} size={"9x"} />
          <h3>{this.props.alert.payload}</h3>
        </Container>
      );
    }
  };

  render() {
    return (
      <div>
        {this.renderLoading()}
        {this.renderContent()}
        {this.renderInfo()}
        {this.renderDeletingLoading()}
        {this.renderNotFoundMessage()}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    loading: state.loading.FETCH_CONTRACT_DETAILS,
    deleting: state.loading.DELETE_OFFER,
    alert: state.alert,
    contract: state.contracts.find(
      (contract) => contract.id.toString() === ownProps.match.params.id
    ),
    user: state.login.user,
  };
};

export default connect(mapStateToProps, {
  fetchContractDetails,
  clear: alertActions.clear,
})(ContractDetails);
