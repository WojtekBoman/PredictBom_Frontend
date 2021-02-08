import React from "react";
import { connect } from "react-redux";
import {
  Container,
  Form,
  Button,
  Spinner,
  Row,
  Col,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { addBet, deleteBet, fetchMarket } from "../../actions/marketActions";
import { Field, reduxForm } from "redux-form";
import BetsList from "./BetsList";
import { alertActions } from "../../actions/alertActions";
import { LinkContainer } from "react-router-bootstrap";
import BackHeader from "../BackHeader";
import { renderInput } from "../../helpers/FormInputs";
import { renderInfoWithClose } from "../../helpers/InfoComponents";
import { renderButtonContent } from "../../helpers/LoadingContent";

class EditBetsPage extends React.Component {
  state = {
    marketId: this.props.match.params.id,
  };

  componentDidMount() {
    this.props.fetchMarket(this.props.match.params.id);
    this.props.initialize({ shares: 10000 });
  }

  componentWillUnmount() {
    this.props.clear();
  }

  onSubmit = (formValues) => {
    this.props.addBet(
      this.props.match.params.id,
      formValues.yesPrice,
      formValues.noPrice,
      formValues.title,
      formValues.shares
    );
  };

  renderBetsList = () => {
    return (
      <BetsList
        bets={this.props.currentMarket.bets}
        correctBetId={this.props.currentMarket.correctBetId}
        published={this.props.currentMarket.published}
        marketId={this.props.match.params.id}
      />
    );
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

  renderNextStepButton = () => {
    if (this.props.currentMarket.bets) {
      return (
        <LinkContainer to={`/markets/makePublic/${this.props.match.params.id}`}>
          <Button id="confirmBetsButton" variant="primary" type="submit">
            Zatwierdź zakłady
          </Button>
        </LinkContainer>
      );
    }
  };

  renderPageContent() {
    if (
      this.props.currentMarket &&
      this.props.currentMarket.correctBetId === 0
    ) {
      return (
        <div>
          <BackHeader title={this.props.currentMarket.topic} />
          <hr className="my-4"></hr>
          <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
            <Field
              onChange={this.checkIsEmptyField}
              type="text"
              label="Dodawanie zakładu"
              name="title"
              component={renderInput}
              placeholder="Wprowadź tytuł zakładu"
            ></Field>
            <Row>
              <Col sm={6}>
                <Field
                  type="number"
                  label="Podaj cenę kontraktu na tak"
                  max="1"
                  name="yesPrice"
                  component={renderInput}
                  placeholder="Podaj cenę kontraktu na tak"
                ></Field>
              </Col>
              <Col sm={6}>
                <Field
                  type="number"
                  label="Podaj cenę kontraktu na nie"
                  max="1"
                  name="noPrice"
                  component={renderInput}
                  placeholder="Podaj cenę kontraktu na nie"
                ></Field>
              </Col>
            </Row>
            <Field
              component={renderInput}
              name="shares"
              min={10000}
              max={100000}
              step={1}
              type="number"
              label="Podaj poczatkowa liczbę akcji wystawionych na sprzedaż"
            />
            <Button id="addBetButton" variant="primary" type="submit">
              {renderButtonContent(this.props.addingLoading, "Dodaj zakład")}
            </Button>
          </Form>
          {renderInfoWithClose(this.props.alert, this.props.clear)}
          {this.renderBetsList()}
          {this.renderNextStepButton()}
        </div>
      );
    }
  }

  renderFailedToFetch() {
    if (
      !this.props.currentMarket &&
      typeof this.props.loadingMarket !== "undefined" &&
      !this.props.loadingMarket.pending
    ) {
      return (
        <div>
          <FontAwesomeIcon icon={faTimesCircle} size={"6x"} />
          <h2>
            Wystąpił błąd pobierania danych. Odśwież stronę i spróbuj ponownie
          </h2>
        </div>
      );
    }
  }

  render() {
    return (
      <Container className="bg-light border rounded shadow-container create-market-container">
        {this.renderLoading()}
        {this.renderFailedToFetch()}
        {this.renderPageContent()}
        {/* {this.renderFailedFetch()} */}
      </Container>
    );
  }
}

const validate = (formValues) => {
  const errors = {};
  const requiredFields = ["title", "yesPrice", "noPrice", "shares"];
  requiredFields.forEach((field) => {
    if (!formValues[field]) {
      errors[field] = "To pole jest wymagane";
    }
  });

  const betsSumValue =
    parseFloat(formValues.yesPrice) + parseFloat(formValues.noPrice);

  if (parseFloat(formValues.yesPrice) <= 0)
    errors["yesPrice"] = "Cena musi być wartością dodatnią większą od zera";

  if (parseFloat(formValues.noPrice) <= 0)
    errors["noPrice"] = "Cena musi być wartością dodatnią większą od zera";

  if (betsSumValue > 1.1 || betsSumValue < 1) {
    errors["yesPrice"] =
      "Różnica między cenami na tak i nie może wynosić maksymalnie 10 $";
  }

  return errors;
};

const mapStateToProps = (state, ownProps) => {
  return {
    alert: state.alert,
    addingLoading: state.loading.ADD_BET,
    loadingMarket: state.loading.FETCH_MARKET,
    currentMarket: state.markets.find(
      (market) => market.marketId.toString() === ownProps.match.params.id
    ),
  };
};

const formWrapped = reduxForm({
  form: "editBets",
  validate,
})(EditBetsPage);

export default connect(mapStateToProps, {
  addBet,
  deleteBet,
  fetchMarket,
  clear: alertActions.clear,
})(formWrapped);
