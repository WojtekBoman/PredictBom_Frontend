import React from "react";
import { connect } from "react-redux";
import { Modal, Button, Form } from "react-bootstrap";
import { buyShares } from "../../actions/offerActions";
import { renderButtonContent } from "../../helpers/LoadingContent";
import { renderInfo } from "../../helpers/InfoComponents";

class BuyOfferModal extends React.Component {
  state = {
    shares: 1
  };

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
              <div className="mt-3">
                <Button
                  type="submit"
                  variant="primary"
                  className="mr-3"
                >
                  {renderButtonContent(this.props.loading,"Zakup akcje")}
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => this.props.handleClose()}
                >
                  Zamknij
                </Button>
              </div>
            </Form.Group>
            {renderInfo(this.props.alert)}
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
