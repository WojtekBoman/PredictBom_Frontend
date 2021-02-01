import React from "react";
import { Alert, Container, Form, Button, Spinner } from "react-bootstrap";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { register } from "../../actions/registerActions";
import { alertActions } from "../../actions/alertActions";
import { renderInput, renderInfo } from "../../helpers/FormInputs";
import { renderButtonContent } from "../../helpers/LoadingContent";
import BackHeader from "../BackHeader";

class RegisterPage extends React.Component {
  componentWillUnmount() {
    this.props.clear();
  }

  onSubmit = (formValues) => {
    this.props.register(formValues);
  };

  render() {
    return (
      <Container className="bg-light border rounded shadow-container form-container">
        <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <BackHeader title="Rejestracja" />
          <hr className="my-4"></hr>
          <Field
            type="text"
            label="Nazwa użytkownika"
            name="username"
            component={renderInput}
            placeholder="Wprowadź nazwę użytkownika"
          ></Field>
          <Form.Text className="text-muted">
            Zapewniamy że twoje dane będą bezpieczne
          </Form.Text>
          <Field
            type="text"
            label="Imię"
            name="firstName"
            component={renderInput}
            placeholder="Podaj swoje imię"
          ></Field>
          <Field
            type="text"
            label="Nazwisko"
            name="surname"
            component={renderInput}
            placeholder="Podaj swoje nazwisko"
          ></Field>
          <Field
            type="text"
            label="Adres e-mail"
            name="email"
            component={renderInput}
            placeholder="Wprowadź swój adres e-mail"
          ></Field>
          <Field
            type="password"
            label="Hasło"
            name="password"
            component={renderInput}
            placeholder="Wprowadź hasło"
          ></Field>
          <Field
            type="password"
            label="Powtórz hasło"
            name="repeatPassword"
            component={renderInput}
            placeholder="Powtórz swoje hasło"
          ></Field>
          <Button variant="primary" type="submit">
            {renderButtonContent(this.props.loading, "Załóż konto")}
          </Button>
        </Form>
        {renderInfo(this.props.alert)}
      </Container>
    );
  }
}

const validate = (formValues) => {
  const errors = {};
  const requiredFields = [
    "username",
    "firstName",
    "surname",
    "email",
    "password",
    "repeatPassword",
  ];
  requiredFields.forEach((field) => {
    if (!formValues[field]) {
      errors[field] = "To pole jest wymagane";
    }
  });
  if (
    formValues.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formValues.email)
  ) {
    errors.email = "Niepoprawny adres e-mail";
  }

  if (formValues.password !== formValues.repeatPassword) {
    errors.repeatPassword = "Podane hasła są różne";
  }

  return errors;
};

const mapStateToProps = (state) => {
  return {
    alert: state.alert,
    loading: state.loading.REGISTER,
  };
};

const formWrapped = reduxForm({
  form: "registerForm",
  validate,
})(RegisterPage);

export default connect(mapStateToProps, {
  register,
  clear: alertActions.clear,
})(formWrapped);
