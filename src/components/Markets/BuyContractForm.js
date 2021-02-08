import React from "react";
import { Field, reduxForm } from "redux-form";
import {Form, Button} from "react-bootstrap";
import { connect } from "react-redux";
import Loader from "react-loader-spinner";
import { buyContract } from "../../actions/contractActions";
import { alertActions } from "../../actions/alertActions";
import {renderInput} from '../../helpers/FormInputs';
import { renderInfo } from "../../helpers/InfoComponents";
import './BuyContractForm.scss';

class BuyContractForm extends React.Component {
  componentDidMount() {
    this.props.clear();
  }

  onSubmit = (formValues) => {
    this.props.buyContract(
      this.props.betId,
      this.props.marketId,
      this.props.contractOption,
      formValues
    );
  };

  renderForm = () => {
    return (
      <div>
        <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <h4>
            Wybrana opcja na  
            {this.props.contractOption ? <span> tak</span> : <span> nie</span>}
          </h4>
          <Form.Text className="buy-info">
            Podaj swoje kryteria zakupu akcji a system wyszuka dla ciebie
            najlepsze oferty. Iloczyn maksymalnej ceny za jedną akcję i ich
            liczby nie powinien przekraczać wartości twojego budżetu! Pamiętaj
            także o limicie zakupów do 1000 akcji dziennie.
          </Form.Text>
          <hr className="my-4"></hr>
          <Field
            type="number"
            max="1"
            name="maxPrice"
            label="Podaj maksymalną cenę 1 akcji"
            component={renderInput}
          />
          <Field
            type="number"
            min="1"
            max="1000"
            name="shares"
            label="Ile akcji chcesz kupić"
            component={renderInput}
          />
          <div className="buy-form-buttons">
            <Button className="form-button" variant="primary" type="submit">
              Kup
            </Button>
            <Button
              className="form-button"
              variant="primary"
              onClick={this.props.hideForm}
            >
              Zamknij
            </Button>
          </div>
        </Form>
      </div>
    );
  };

  renderLoadingPrice() {
    if (
      typeof this.props.loading !== "undefined" &&
      this.props.loading.pending
    ) {
      return (
        <div className="text-center">
          <Loader type="TailSpin" color="black" />
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        {this.renderForm()}
        {this.renderLoadingPrice()}
        {renderInfo(this.props.alert)}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    alert: state.alert,
    loading: state.loading.BUY_CONTRACT,
  };
};

const validate = (formValues) => {
  const errors = {};
  const requiredFields = ["maxPrice", "shares"];
  requiredFields.forEach((field) => {
    if (!formValues[field]) {
      errors[field] = "To pole jest wymagane";
    }
  });

  return errors;
};

const formWrapped = reduxForm({
  form: "buyContractForm",
  validate,
})(BuyContractForm);

export default connect(mapStateToProps, {
  buyContract,
  clear: alertActions.clear,
})(formWrapped);
