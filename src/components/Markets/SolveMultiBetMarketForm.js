import React from "react";
import { connect } from "react-redux";
import { Form, Button, Alert } from "react-bootstrap";
import { reduxForm, Field } from "redux-form";
import { solveMarket } from "../../actions/marketActions";
import { renderInfo } from "../../helpers/InfoComponents";
import { renderButtonContent } from "../../helpers/LoadingContent";

class SolveMultiBetMarketForm extends React.Component {
  state = {
    correctBetId: "",
  };

  componentDidMount() {
    this.props.initialize({ correctBetId: "0" });
  }

  handleCorrectBetId = (e) => {
    this.setState({ correctBetId: e.target.value });
  };

  // handleSubmit(e) {
  //   e.preventDefault();
  // }

  getOptions() {
    const options = [
      { val: 0, text: "Wybierz zakład", key: 1, selected: "selected" },
    ];
    for (let i = 0; i < this.props.bets.length; i++)
      options.push({
        val: this.props.bets[i].id,
        text: this.props.bets[i].title,
        key: i + 1,
      });
    return options;
  }

  renderSelectField = ({
    input,
    options,
    label,
    type,
    meta: { touched, error },
  }) => {
    return (
      <Form.Group>
        <Form.Label>{label}</Form.Label>
        <Form.Control {...input} as="select">
          {options.map((option) => (
            <option value={option.val} key={option.key}>
              {option.text}
            </option>
          ))}
        </Form.Control>
        {error && touched && <div>{this.renderError({ error, touched })}</div>}
      </Form.Group>
    );
  };

  renderError({ error, touched }) {
    if (touched && error) {
      return <Alert variant="danger">{error}</Alert>;
    }
  }

  onSubmit = (formValues) => {
    this.props.solveMarket(
      this.props.marketId,
      formValues.correctBetId
    );
  };

  render() {
    return (
      <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <Field
          name="correctBetId"
          label="Wybierz prawidłowy zakład"
          options={this.getOptions()}
          component={this.renderSelectField}
        />
        <Button className="form-button" variant="primary" type="submit">
          {renderButtonContent(this.props.loading, "Zatwierdź")}
        </Button>
        {renderInfo(this.props.alert)}
      </Form>
    );
  }
}

const validate = (formValues) => {
  const errors = {};

  if (formValues.correctBetId === 0)
    errors["correctBetId"] = "Wybierz zakład !";
  return errors;
};

const formWrapped = reduxForm({
  form: "SolveMultiBetMarketForm",
  validate,
})(SolveMultiBetMarketForm);

const mapStateToProps = (state) => {
  return {
    loading: state.loading.SOLVE_MARKET,
    alert: state.alert,
  };
};

export default connect(mapStateToProps, { solveMarket })(formWrapped);
