import React from "react";
import { connect } from "react-redux";
import { Container, Form, Button } from "react-bootstrap";
import { fetchMarket, editMarket } from "../../actions/marketActions";
import { reduxForm, Field } from "redux-form";
import BackHeader from "../BackHeader";
import { MarketCategories } from "../../helpers/MarketCategories";
import {
  renderInput,
  renderInfo,
  renderSelectField,
} from "../../helpers/FormInputs";
import { renderButtonContent } from "../../helpers/LoadingContent";

class EditMarketPage extends React.Component {
  componentDidMount() {
    this.props.fetchMarket(this.props.match.params.id);
  }

  getSelectedOption = (option) => {
    return this.getOptions().find(
      (opt) => opt.text.toLowerCase() === option.toLowerCase()
    );
  };

  onSubmit = (formValues) => {
    console.log(formValues);
    this.props.editMarket(this.props.match.params.id, formValues);
  };

  renderForm() {
    if (this.props.currentMarket) {
      return (
        <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <Field
            disabled={this.props.currentMarket.published}
            type="text"
            label="Tytuł rynku"
            name="topic"
            component={renderInput}
            placeholder="Wprowadź tytuł rynku prognostycznego"
          ></Field>
          <Field
            helpText="Jeżeli nie wiesz kiedy może zakończyć się dany rynek nie wypełniaj tego pola"
            type="date"
            label="Przewidywana data zakończenia rynku"
            name="endDate"
            component={renderInput}
          ></Field>
          <Field
            disabled={this.props.currentMarket.published}
            name="category"
            label="Wybierz kategorię rynku"
            options={MarketCategories}
            component={renderSelectField}
          />
          <Field
            disabled={this.props.currentMarket.published}
            as="textarea"
            rows="5"
            name="description"
            label="Krótko opisz rynek i jego zasady"
            component={renderInput}
          />
          <Button className="form-button" variant="primary" type="submit">
            {renderButtonContent(this.props.loading,"Zatwierdź")}
          </Button>
        </Form>
      );
    }
  }

  render() {
    return (
      <Container className="bg-light border rounded shadow-container create-market-container">
        <BackHeader title="Edytuj rynek" />
        <hr className="my-4"></hr>
        {this.renderForm()}
        {renderInfo(this.props.alert)}
      </Container>
    );
  }
}

const validate = (formValues) => {
  const errors = {};
  const requiredFields = ["marketTitle", "description"];
  requiredFields.forEach((field) => {
    if (!formValues[field]) {
      errors[field] = "To pole jest wymagane";
    }
  });

  if (formValues.predictedDateEnd) {
    let predictedDate = new Date(formValues.predictedDateEnd);
    let dateNow = new Date();

    if (predictedDate < dateNow) {
      errors["predictedDateEnd"] =
        "Musisz podać datę późniejszą od dzisiejszej";
    }
  }
  return errors;
};

const formWrapped = reduxForm({
  form: "editMarketForm",
  validate,
  enableReinitialize: true,
})(EditMarketPage);

const mapStateToProps = (state, ownProps) => {
  return {
    loadingMarket: state.loading.FETCH_MARKET,
    loading: state.loading.EDIT_MARKET,
    currentMarket: state.markets.find(
      (market) => market.marketId.toString() === ownProps.match.params.id
    ),
    alert: state.alert,
    initialValues: state.markets.find(
      (market) => market.marketId.toString() === ownProps.match.params.id
    ),
  };
};

export default connect(mapStateToProps, { fetchMarket, editMarket })(
  formWrapped
);
