import React from 'react'
import {Container,Form,Alert,Spinner,Button} from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import {connect} from 'react-redux';
import {sendToken} from '../../actions/tokenActions';


class ResetPasswordPage extends React.Component {

    renderInput = ({input, label,meta,type,placeholder,as,helpText,rows}) => {
        return (
        <Form.Group>
        <Form.Label>{label}</Form.Label>
        <Form.Control {...input} as={as} type={type} placeholder={placeholder} rows={rows}/>
        {this.renderError(meta)}
        {helpText && (<Form.Text className="text-muted">{helpText}</Form.Text>)}    
        </Form.Group>
        )
    }

    renderError({error,touched}) {
        if(touched && error) {
            return(
                <Alert variant='danger'>
                    {error}
                </Alert>
            )
        }
    }

    renderButtonContent() {
        if ((typeof this.props.loading !== 'undefined') && this.props.loading.pending) {
            return (
                <div>
                <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                />
                Ładowanie...
                </div>
            )
        }else{
            return "Zatwierdź"
        }
    }
  
    renderInfo() {
      if(this.props.alert.payload) {
          return <Alert className="login-alert" variant="danger">
              {this.props.alert.payload}
          </Alert>
      }
  }

  renderInfo() {
    if(this.props.alert.payload) {
        return <Alert className="login-alert" variant="danger">
            {this.props.alert.payload}
        </Alert>
    }
}

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
            helpText="Na podany adres e-mail zostanie wysłany token do resetu hasła" type="text" name="emailToReset" component={this.renderInput} placeholder="Adres e-mail konta"></Field>
                    <Button variant="primary" type="submit">
                        {this.renderButtonContent()}
                    </Button>
            </Form>
            {this.renderInfo()}
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