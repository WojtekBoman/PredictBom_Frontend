import React from 'react';
import {connect} from 'react-redux';
import {Form,Spinner,Alert,Button,Container} from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import {checkToken} from '../../actions/tokenActions';

class CheckTokenPage extends React.Component {

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
    console.log(formValues);
    this.props.checkToken(formValues);
}

    render() {
        return(
        <Container className="bg-light border rounded shadow-container create-market-container">
            <header>
                <h2>Wprowadź token który otrzymałeś na podany wcześniej adres e-mail</h2>
            </header>
            <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
            <Field  type="text" name="token" component={this.renderInput} placeholder="Token"></Field>
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
    if(!formValues.token) {
        errors['token'] = "To pole jest wymagane";
    }

    return errors;
}

const mapStateToProps = state => {
    return {
        loading: state.loading.CHECK_TOKEN,
        alert: state.alert
    }
}

const formWrapped = reduxForm(
    {
        form:'checkTokenForm',
        validate
    }
)(CheckTokenPage);


export default connect(mapStateToProps,{checkToken})(formWrapped);