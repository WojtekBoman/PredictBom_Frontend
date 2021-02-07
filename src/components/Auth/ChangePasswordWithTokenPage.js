import React from "react";
import { connect } from "react-redux";
import { Container, Form, Button } from "react-bootstrap";
import { Field, reduxForm } from "redux-form";
import { changePasswordWithToken } from "../../actions/tokenActions";
import { renderInput, renderInfo } from "../../helpers/FormInputs";
import { renderButtonContent } from "../../helpers/LoadingContent";

class ChangePasswordWithTokenPage extends React.Component {
  onSubmit = (formValues) => {
    this.props.changePasswordWithToken(formValues, this.props.token);
  };

  render() {
    return (
      <Container className="bg-light border rounded shadow-container create-market-container">
        <header>
          <h2>Wprowadź nowe hasło dla swojego konta</h2>
        </header>
        <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <Field
            type="password"
            name="newPassword"
            component={renderInput}
            placeholder="Wprowadź hasło"
          ></Field>
          <Field
            type="password"
            name="repeatedPassword"
            component={renderInput}
            placeholder="Powtórz hasło"
          ></Field>
          <Button variant="primary" type="submit">
            {renderButtonContent(this.props.loading, "Zmień hasło")}
          </Button>
        </Form>
        {renderInfo(this.props.alert)}
      </Container>
    );
  }
}

const validate = (formValues) => {
  const errors = {};
  const requiredFields = ["newPassword", "repeatedPassword"];
  requiredFields.forEach((field) => {
    if (!formValues[field]) {
      errors[field] = "To pole jest wymagane";
    }
  });

  if (formValues.newPassword !== formValues.repeatPassword) {
    errors.repeatPassword = "Podane hasła są różne";
  }
};

const mapStateToProps = (state) => {
  return {
    alert: state.alert,
    token: state.token.token,
    loading: state.loading.CHANGE_PASSWORD_WITH_TOKEN,
  };
};

const formWrapped = reduxForm({
  form: "changePasswordWithToken",
  validate,
})(ChangePasswordWithTokenPage);

export default connect(mapStateToProps, { changePasswordWithToken })(
  formWrapped
);
