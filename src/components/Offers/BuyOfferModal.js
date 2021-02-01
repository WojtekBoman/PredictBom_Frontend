import React from "react";
import { connect } from "react-redux";
import { Modal, Button, Form, Alert, Spinner } from "react-bootstrap";
import { buyShares } from "../../actions/offerActions";
import { renderButtonContent } from "../../helpers/LoadingContent";

class BuyOfferModal extends React.Component {
  state = {
    shares: 1,
    showTypeInfo: false,
  };

  renderInfo() {
    if (this.props.alert.payload) {
      return (
        <Alert className="login-alert" variant="danger">
          {this.props.alert.payload}
        </Alert>
      );
    }
  }

  renderTypeInfo() {
    if (this.state.showTypeInfo) {
      return (
        <Alert className="login-alert" variant="danger">
          Podaj liczbę całkowitą
        </Alert>
      );
    }
  }

  renderButtonContent() {
    if (
      typeof this.props.loading !== "undefined" &&
      this.props.loading.pending
    ) {
      return (
        <div>
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          Ładowanie...
        </div>
      );
    } else {
      return "Zatwierdź";
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.buyShares(this.props.id, this.state.shares);
  };

  onChangeShares = (e) => {
    this.setState({ shares: e.target.value });
  };

  render() {
    return (
      <Modal
        show={this.props.showModalForm}
        onHide={this.props.handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Zakup akcji</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="formBasicRange">
              <Form.Label>
                <h4>Liczba akcji</h4>
              </Form.Label>
              <p className="text-muted">Wprowadź ile akcji chcesz kupić</p>
              <Form.Control
                min={1}
                step="1"
                max={this.props.maxValue}
                value={this.state.shares}
                onChange={this.onChangeShares}
                type="number"
              />
              <hr className="my-4"></hr>
              <div style={{ marginTop: "10px" }}>
                <Button
                  type="submit"
                  variant="primary"
                  style={{ marginRight: "10px" }}
                >
                  {renderButtonContent(this.props.loading)}
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => this.props.handleClose()}
                >
                  Zamknij
                </Button>
              </div>
            </Form.Group>
            {this.renderInfo()}
            {this.renderTypeInfo()}
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.loading.BUY_CONTRACT,
    alert: state.alert,
  };
};

export default connect(mapStateToProps, { buyShares })(BuyOfferModal);
