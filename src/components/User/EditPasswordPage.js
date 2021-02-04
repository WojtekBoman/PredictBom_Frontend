import React from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { Container, Form, Button } from "react-bootstrap";
import { renderInput, renderInfo } from "../../helpers/FormInputs";
import { renderButtonContent } from "../../helpers/LoadingContent";
import { editPassword } from "../../actions/loginActions";
import BackHeader from "../BackHeader";

class EditPasswordPage extends React.Component {
  state = {
    resetButtonDisable: true,
  };

  onSubmit = (formValues) => {
    this.props.editPassword(formValues);
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
  render() {
    return (
      <Container className="bg-light border rounded shadow-container profile-container">
        <BackHeader title="Zmiana hasła" />
        <hr className="my-4"></hr>
        <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <Field
            onChange={this.checkIsEmptyField}
            type="password"
            label="Stare hasło"
            name="oldPassword"
            component={renderInput}
            placeholder="Wprowadź stare hasło"
          ></Field>
          <Field
            onChange={this.checkIsEmptyField}
            type="password"
            label="Nowe hasło"
            name="newPassword"
            component={renderInput}
            placeholder="Wprowadź nowe hasło"
          ></Field>
          <Field
            onChange={this.checkIsEmptyField}
            type="password"
            label="Powtórz nowe hasło"
            name="repeatedNewPassword"
            component={renderInput}
            placeholder="Powtórz nowe hasło"
          ></Field>
          <Button
            id="submitNewPassword"
            className="form-button"
            variant="primary"
            type="submit"
          >
            {renderButtonContent(this.props.loading, "Zatwierdź")}
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
        {renderInfo(this.props.alert)}
      </Container>
    );
  }
}

const validate = (formValues) => {
  const errors = {};
  const requiredFields = ["oldPassword", "newPassword", "repeatedNewPassword"];
  requiredFields.forEach((field) => {
    if (!formValues[field]) {
      errors[field] = "To pole jest wymagane";
    }
  });

  if (formValues.newPassword !== formValues.repeatNewPassword) {
    errors.repeatNewPassword = "Podane hasła są różne";
  }

  return errors;
};

const mapStateToProps = (state) => {
  return {
    alert: state.alert,
    loading: state.loading.EDIT_PASSWORD,
  };
};

const formWrapped = reduxForm({
  form: "editPasswordForm",
  validate,
})(EditPasswordPage);

export default connect(mapStateToProps, { editPassword })(formWrapped);
