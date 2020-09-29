import React from 'react';
import {Alert,Container,Form, Button,Spinner} from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import {connect} from 'react-redux';
import {register} from '../../actions/registerActions';

class RegisterPage extends React.Component {

    
    renderError({error,touched}) {
        if(touched && error) {
            return(
                <Alert variant='danger'>
                    {error}
                </Alert>
            )
        }
    }


    renderInput = ({input, label,meta,type,placeholder}) => {
        return (
        <Form.Group>
        <Form.Label>{label}</Form.Label>
        <Form.Control {...input} type={type} placeholder={placeholder}/>
        {this.renderError(meta)}
        </Form.Group>
        )
    }

    renderInfo() {
        if(this.props.alert.payload) {
            return <Alert className="login-alert" variant="danger">
                {this.props.alert.payload}
            </Alert>
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

    onSubmit = (formValues) => {
        this.props.register(formValues);
    }

    render(){
        console.log(this.props);
        return(
            <Container className="bg-light border rounded shadow-container form-container">
            <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <h2>Dołącz do PredictBom</h2>
                    <Field type="text" label="Nazwa użytkownika" name="username" component={this.renderInput} placeholder="Wprowadź nazwę użytkownika"></Field>
                    <Form.Text className="text-muted">
                    Zapewniamy że twoje dane będą bezpieczne 
                    </Form.Text>
                    <Field type="text" label="Imię" name="firstName" component={this.renderInput} placeholder="Podaj swoje imię"></Field>
                    <Field type="text" label="Nazwisko" name="surname" component={this.renderInput} placeholder="Podaj swoje nazwisko"></Field>
                    <Field type="text" label="Adres e-mail" name="email" component={this.renderInput} placeholder="Wprowadź swój adres e-mail"></Field>
                    <Field type="password" label="Hasło" name="password" component={this.renderInput} placeholder="Wprowadź hasło"></Field>
                    <Field type="password" label="Powtórz hasło" name="repeatPassword" component={this.renderInput} placeholder="Powtórz swoje hasło"></Field>
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
    const errors = {}
    const requiredFields = [ 'username','firstName', 'surname', 'email', 'password','repeatPassword']
    requiredFields.forEach(field => {
    if (!formValues[ field ]) {
      errors[ field ] = 'To pole jest wymagane'
    }
  })
  if (formValues.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formValues.email)) {
    errors.email = 'Niepoprawny adres e-mail'
  }

  if(formValues.password !== formValues.repeatPassword){
    errors.repeatPassword = "Podane hasła są różne";
  }

  return errors
}

const mapStateToProps = state => {
    return {
        alert: state.alert,
        loading: state.loading.REGISTER
        }
}


const formWrapped = reduxForm(
    {
        form:'registerForm',
        validate
    }
)(RegisterPage);

export default connect(mapStateToProps,{register})(formWrapped);