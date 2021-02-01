import React from 'react'
import {Container,Form,Alert,Spinner,Button} from 'react-bootstrap';
import {renderInput, renderInfo} from '../../helpers/FormInputs';
import { renderButtonContent } from "../../helpers/LoadingContent";
import { Field, reduxForm } from 'redux-form';
import {connect} from 'react-redux';
import {sendToken} from '../../actions/tokenActions';

class ResetPasswordPage extends React.Component {

  onSubmit = (formValues) => {
    this.props.sendToken(formValues);
}

    render() {
        return(
        <Container className="bg-light border rounded shadow-container create-market-container">
            <header>
                <h2>Podaj swój adres e-mail</h2>
            </header>
            <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
            <Field onChange={this.checkIsEmptyField}
            helpText="Na podany adres e-mail zostanie wysłany token do resetu hasła" type="text" name="emailToReset" component={renderInput} placeholder="Adres e-mail konta"></Field>
                    <Button variant="primary" type="submit">
                        {renderButtonContent(this.props.loading,"Zatwierdź")}
                    </Button>
            </Form>
            {renderInfo(this.props.alert)}
        </Container>
        )
    }
}

const validate = formValues => {
    const errors = {};
    if(!formValues.emailToReset) {
        errors['emailToReset'] = "To pole jest wymagane";
    }

    return errors;
}

const mapStateToProps = state => {
    return {
        loading: state.loading.SEND_TOKEN,
        alert: state.alert
    }
}

const formWrapped = reduxForm(
    {
        form:'sendTokenForm',
        validate
    }
)(ResetPasswordPage);


export default connect(mapStateToProps,{sendToken})(formWrapped);