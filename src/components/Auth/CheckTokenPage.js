import React from "react";
import { connect } from "react-redux";
import { Form, Button, Container } from "react-bootstrap";
import { Field, reduxForm } from "redux-form";
import { checkToken } from "../../actions/tokenActions";
import { renderInput } from "../../helpers/FormInputs";
import { renderInfoWithClose } from "../../helpers/InfoComponents";
import { alertActions } from "../../actions/alertActions";
import { renderButtonContent } from "../../helpers/LoadingContent";

class CheckTokenPage extends React.Component {
  componentWillUnmount() {
    this.props.clear();
  }

  onSubmit = (formValues) => {
    this.props.checkToken(formValues);
  };

  render() {
    return (
      <Container className="bg-light border rounded shadow-container create-market-container">
        <header>
          <h2>
            Wprowadź token który otrzymałeś na podany wcześniej adres e-mail
          </h2>
        </header>
        <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <Field
            type="text"
            name="token"
            component={renderInput}
            placeholder="Token"
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
  if (!formValues.token) {
    errors["token"] = "To pole jest wymagane";
  }

  return errors;
};

const mapStateToProps = (state) => {
  return {
    loading: state.loading.CHECK_TOKEN,
    alert: state.alert,
  };
};

const formWrapped = reduxForm({
  form: "checkTokenForm",
  validate,
})(CheckTokenPage);

export default connect(mapStateToProps, {
  checkToken,
  clear: alertActions.clear,
})(formWrapped);
