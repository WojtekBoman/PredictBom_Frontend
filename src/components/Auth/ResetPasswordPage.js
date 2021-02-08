import React from "react";
import { Container, Form, Button } from "react-bootstrap";
import { renderInput } from "../../helpers/FormInputs";
import { renderInfoWithClose } from "../../helpers/InfoComponents";
import { renderButtonContent } from "../../helpers/LoadingContent";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { sendToken } from "../../actions/tokenActions";
import { alertActions } from "../../actions/alertActions";

class ResetPasswordPage extends React.Component {
  componentWillUnmount() {
    this.props.clear();
  }

  onSubmit = (formValues) => {
    this.props.sendToken(formValues);
  };

  render() {
    return (
      <Container className="bg-light border rounded shadow-container create-market-container">
        <header>
          <h2>Podaj swój adres e-mail</h2>
        </header>
        <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <Field
            onChange={this.checkIsEmptyField}
            helpText="Na podany adres e-mail zostanie wysłany token do resetu hasła"
            type="text"
            name="emailToReset"
            component={renderInput}
            placeholder="Adres e-mail konta"
          ></Field>
          <Button variant="primary" type="submit">
            {renderButtonContent(this.props.loading, "Zatwierdź")}
          </Button>
        </Form>
        {renderInfoWithClose(this.props.alert, this.props.clear)}
      </Container>
    );
  }
}

const validate = (formValues) => {
  const errors = {};
  if (!formValues.emailToReset) {
    errors["emailToReset"] = "To pole jest wymagane";
  }

  return errors;
};

const mapStateToProps = (state) => {
  return {
    loading: state.loading.SEND_TOKEN,
    alert: state.alert,
  };
};

const formWrapped = reduxForm({
  form: "sendTokenForm",
  validate,
})(ResetPasswordPage);

export default connect(mapStateToProps, {
  sendToken,
  clear: alertActions.clear,
})(formWrapped);
