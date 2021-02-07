import React from "react";
import { connect } from "react-redux";
import { Container, Form, Spinner, Button } from "react-bootstrap";
import { fetchContractDetails, addOffer } from "../../actions/contractActions";
import BackHeader from "../BackHeader";
import { renderInfo } from "../../helpers/FormInputs";
import { renderButtonContent } from "../../helpers/LoadingContent";

class AddOfferPage extends React.Component {
  state = {
    price: 0.5,
    shares: 1,
    info: "",
  };

  componentDidMount() {
    this.props.fetchContractDetails(this.props.match.params.id);
  }

  onChangeprice = (e) => {
    this.setState({ price: e.target.value });
  };

  onChangeshares = (e) => {
    this.setState({ shares: e.target.value });
  };

  handleSubmit = (e) => {
    if (this.state.shares > 0 && this.state.price) {
      this.props.addOffer(
        this.props.match.params.id,
        this.state.shares,
        this.state.price
      );
    } else {
      this.setState({
        info:
          "Wprowadziłeś błędne dane, podane wartości muszą być większe od zera !",
      });
    }
  };

  renderAddOfferForm() {
    return (
      <Container className="bg-light border rounded shadow-container create-market-container">
        <BackHeader title="Dodaj nową ofertę" />
        <hr className="my-4"></hr>
        <Form>
          <Form.Group controlId="formBasicRange">
            <Form.Label>
              <h4>Cena sprzedaży</h4>
            </Form.Label>
            <p className="text-muted">
              Wybierz cenę z zakresu od 0 do 1 $ (Przesuń pasek lub wpisz
              ręcznie)
            </p>
            <Form.Control
              min={0.01}
              max={1}
              step={0.01}
              type="range"
              value={this.state.price}
              onChange={this.onChangeprice}
            />
            <Form.Control
              min={0.01}
              max={1}
              step={0.01}
              type="number"
              value={this.state.price}
              onChange={this.onChangeprice}
            />
            <Form.Label className="mt-3">
              <h4>Liczba akcji</h4>
            </Form.Label>
            <p className="text-muted">
              Wybierz liczbę akcji którą chcesz wystawić na sprzedaży
            </p>
            <Form.Control
              min={1}
              max={this.props.contract.shares}
              step={1}
              type="range"
              value={this.state.shares}
              onChange={this.onChangeshares}
            />
            <Form.Control
              min={1}
              max={this.props.contract.shares}
              step={1}
              type="number"
              value={this.state.shares}
              onChange={this.onChangeshares}
            />
            <div>
              <Button
                variant="primary"
                onClick={this.handleSubmit}
                className="mt-3"
              >
                {renderButtonContent(this.props.loading, "Dodaj ofertę")}
              </Button>
            </div>
          </Form.Group>
          {renderInfo(this.state.info)}
        </Form>
      </Container>
    );
  }

  renderLoadingContainer = () => {
    return (
      <Container className="text-center bg-light border rounded shadow-container create-market-container">
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        <h3>Pobieranie oferty</h3>
      </Container>
    );
  };

  renderErrorInfo = () => {
    return (
      <Container className="bg-light border rounded shadow-container create-market-container">
        <header>
          <h4>
            Nie możesz wystawić oferty, ponieważ wszystkie akcje z tego
            kontraktu sa wystawione na sprzedaż
          </h4>
          <hr className="my-4"></hr>
        </header>
      </Container>
    );
  };

  render() {
    if (this.props.contract && this.props.contract.shares > 0) {
      return <div>{this.renderAddOfferForm()}</div>;
    } else if (
      typeof this.props.loadingContract !== "undefined" &&
      this.props.loadingContract.pending
    ) {
      return <div>{this.renderLoadingContainer()}</div>;
    }
    return <div>{this.renderErrorInfo()}</div>;
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    loading: state.loading.ADD_OFFER,
    loadingContract: state.loading.FETCH_CONTRACT_DETAILS,
    alert: state.alert,
    contract: state.contracts.find(
      (contract) => contract.id.toString() === ownProps.match.params.id
    ),
  };
};

export default connect(mapStateToProps, { addOffer, fetchContractDetails })(
  AddOfferPage
);
