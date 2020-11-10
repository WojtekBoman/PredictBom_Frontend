import React from 'react';
import {connect} from 'react-redux';
import {Modal, Button, Form, Alert, Spinner} from 'react-bootstrap';
import {buyShares} from '../../actions/offerActions';

class BuyOfferModal extends React.Component {

    state = {
        countOfShares:1
    }

    renderInfo() {
        if(this.props.alert.payload) {
            return <Alert className="login-alert" variant="danger">
                {this.props.alert.payload}
            </Alert>
        }
    }

    
    renderButtonContent() {
        if ((typeof this.props.loading !== 'undefined') && this.props.loading.pending) {
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
            )
        }else{
            return "Zatwierdź"
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.buyShares(this.props.id,this.state.countOfShares);
    }

    onChangeCountOfContracts = e => {
        this.setState({countOfShares:e.target.value});
    }

    render() {
        return(
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
        <Form>
            <Form.Group controlId="formBasicRange">
                <Form.Label><h4>Liczba akcji</h4></Form.Label>
                <p className="text-muted">Wprowadź ile akcji chcesz kupić</p>
                <Form.Control min={1} max={this.props.maxValue} value={this.state.countOfShares} onChange={this.onChangeCountOfContracts}  type="number"/>
                <Button onClick={this.handleSubmit} variant="primary" style={{marginTop:"10px"}}>
                    {this.renderButtonContent()}
                </Button>
            </Form.Group>
            {this.renderInfo()}
        </Form>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={() => this.props.handleClose()}>
            Zamknij
        </Button>
        </Modal.Footer>
    </Modal>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.loading.BUY_CONTRACT,
        alert: state.alert
    }
}

export default connect(mapStateToProps,{buyShares})(BuyOfferModal);