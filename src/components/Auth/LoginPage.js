import React from "react";
import {Container, Form, Button } from "react-bootstrap";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { login } from "../../actions/loginActions";
import { alertActions } from "../../actions/alertActions";
import { Link } from "react-router-dom";
import {renderInput} from '../../helpers/FormInputs';
import {renderInfo} from '../../helpers/InfoComponents';
import { renderButtonContent } from "../../helpers/LoadingContent";
import BackHeader from '../BackHeader';

class LoginPage extends React.Component {
  componentWillUnmount() {
    this.props.clear();
  }

  onSubmit = (formValues) => {
    this.props.login(formValues);
  };

  render() {
    return (
      <Container className="bg-light border rounded shadow-container form-container">
        <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <BackHeader title="Logowanie" />
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
            type="password"
            label="Hasło"
            name="password"
            component={renderInput}
            placeholder="Wprowadź hasło"
          ></Field>

          <Button id="loginButton" variant="primary" type="submit">
            {renderButtonContent(this.props.loading,"Zaloguj się")}
          </Button>
        </Form>
        <Link to="/resetPassword">Zapomniałeś hasła ?</Link>
        {renderInfo(this.props.alert)}
      </Container>
    );
  }
}

const validate = (formValues) => {
  const errors = {};

  if (!formValues.username) {
    errors.username = "Musisz podać nazwę użytkownika";
  }

  if (!formValues.password) {
    errors.password = "Musisz podać hasło";
  }

  return errors;
};

const mapStateToProps = (state) => {
  return {
    alert: state.alert,
    loading: state.loading.LOGIN,
  };
};

const formWrapped = reduxForm({
  form: "loginForm",
  validate,
})(LoginPage);

export default connect(mapStateToProps, { login, clear: alertActions.clear })(formWrapped);
