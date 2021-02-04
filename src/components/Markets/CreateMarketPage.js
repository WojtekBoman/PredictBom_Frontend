import React from "react";
import { Container, Form, Button } from "react-bootstrap";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { createMarket } from "../../actions/marketActions";
import {
  renderInput,
  renderInfoWithClose,
  renderSelectField,
} from "../../helpers/FormInputs";
import { renderButtonContent } from "../../helpers/LoadingContent";
import BackHeader from "../BackHeader";
import { MarketCategories } from "../../helpers/MarketCategories";
import { alertActions } from "../../actions/alertActions";

class CreateMarketPage extends React.Component {
  state = {
    resetButtonDisable: true,
  };

  componentDidMount() {
    this.props.initialize({ category: "SPORT" });
  }

  componentWillUnmount() {
    this.props.clear();
  }

  onSubmit = (formValues) => {
    console.log(formValues);
    this.props.createMarket(formValues);
  };

  resetForm = () => {
    this.setState({ resetButtonDisable: true });
    this.props.reset();
  };

  checkIsEmptyField = (e) => {
    e.target.value
      ? this.setState({ resetButtonDisable: false })
      : this.setState({ resetButtonDisable: true });
  };

  renderForm = () => {
    return (
      <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <Field
          onChange={this.checkIsEmptyField}
          type="text"
          label="Tytuł rynku"
          name="topic"
          component={renderInput}
          placeholder="Wprowadź tytuł rynku prognostycznego"
        ></Field>
        <Field
          onChange={this.checkIsEmptyField}
          helpText="Jeżeli nie wiesz kiedy może zakończyć się dany rynek nie wypełniaj tego pola"
          type="date"
          label="Przewidywana data zakończenia rynku"
          name="endDate"
          component={renderInput}
        ></Field>
        <Field
          onChange={this.checkIsEmptyField}
          name="category"
          label="Wybierz kategorię rynku"
          options={MarketCategories}
          component={renderSelectField}
        />
        <Field
          onChange={this.checkIsEmptyField}
          as="textarea"
          rows="5"
          id="description"
          name="description"
          label="Krótko opisz rynek i jego zasady"
          component={renderInput}
        />
        <Button
          id="createMarketButton"
          className="form-button"
          variant="primary"
          type="submit"
        >
          {renderButtonContent(this.props.loading, "Stwórz rynek")}
        </Button>
        <Button
          className="form-button"
          variant="primary"
          type="reset"
          onClick={this.resetForm}
          disabled={this.state.resetButtonDisable}
        >
          Cofnij zmiany
        </Button>
      </Form>
    );
  };

  render() {
    return (
      <Container className="bg-light border rounded shadow-container create-market-container">
        <BackHeader title="Tworzenie rynku prognostycznego" />
        <hr className="my-4"></hr>
        {this.renderForm()}
        {renderInfoWithClose(this.props.alert, this.props.clear)}
      </Container>
    );
  }
}

const validate = (formValues) => {
  const errors = {};
  const requiredFields = ["topic", "description"];
  requiredFields.forEach((field) => {
    if (!formValues[field]) {
      errors[field] = "To pole jest wymagane";
    }
  });

  if (formValues.endDate) {
    let predictedDate = new Date(formValues.endDate);
    let dateNow = new Date();

    if (predictedDate < dateNow) {
      errors["endDate"] = "Musisz podać datę późniejszą od dzisiejszej";
    }
  }
  return errors;
};

const mapStateToProps = (state) => {
  return {
    alert: state.alert,
    loading: state.loading.CREATE_MARKET,
  };
};

const formWrapped = reduxForm({
  form: "createMarketForm",
  validate,
})(CreateMarketPage);

export default connect(mapStateToProps, {
  createMarket,
  clear: alertActions.clear,
})(formWrapped);
