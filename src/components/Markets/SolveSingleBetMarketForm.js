import React from "react";
import { connect } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { reduxForm, Field } from "redux-form";
import { solveMarket } from "../../actions/marketActions";
import {renderSelectField} from '../../helpers/FormInputs';
import { renderInfo } from "../../helpers/InfoComponents";
import {renderButtonContent} from '../../helpers/LoadingContent'; 

class SolveSingleBetMarketForm extends React.Component {
  state = {
    title: null,
  };

  componentDidMount() {
    this.props.initialize({ correctBetOption: 0 });
  }

  getOptions() {
    const options = [
      {
        val: 0,
        text: `Wybierz prawidłową opcję dla zakładu "${this.props.bets[0].title}"`,
        key: 1,
        selected: "selected",
      },
      { val: true, text: "Wybierz opcję na tak", key: 2 },
      { val: false, text: "Wybierz opcję na nie", key: 3 },
    ];

    return options;
  }

//   renderError({ error, touched }) {
//     if (touched && error) {
//       return <Alert variant="danger">{error}</Alert>;
//     }
//   }

  onSubmit = (formValues) => {
    this.props.solveMarket(
      this.props.marketId,
      this.props.bets[0].id,
      formValues.correctBetOption
    );
  };

  render() {
    return (
      <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <Field
          name="correctBetOption"
          label={`Wybierz prawidłową opcję dla zakładu "${this.props.bets[0].title}"`}
          options={this.getOptions()}
          component={renderSelectField}
        />
        <Button className="form-button" variant="primary" type="submit">
          {renderButtonContent(this.props.loading,"Zatwierdź")}
        </Button>
        {renderInfo(this.props.alert)}
      </Form>
    );
  }
}

const validate = (formValues) => {
  const errors = {};

  if (formValues.correctBetOption === 0)
    errors["correctBetOption"] = "Wybierz prawidłową opcję !";
  return errors;
};

const formWrapped = reduxForm({
  form: "SolveSingleBetMarketForm",
  validate,
})(SolveSingleBetMarketForm);

const mapStateToProps = (state) => {
  return {
    loading: state.loading.SOLVE_MARKET,
    alert: state.alert,
  };
};

export default connect(mapStateToProps, { solveMarket })(formWrapped);
