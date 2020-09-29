import React from 'react';
import {Alert,Container,Form, Button,Spinner} from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import {connect} from 'react-redux';
import {login} from '../../actions/loginActions';
import { alertActions } from '../../actions/alertActions';



class LoginPage extends React.Component {

    componentWillUnmount() {
        this.props.clear();
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


    renderInput = ({input, label,meta,type,placeholder}) => {
        return (
        <Form.Group>
        <Form.Label>{label}</Form.Label>
        <Form.Control {...input} type={type} placeholder={placeholder}/>
        {this.renderError(meta)}
        </Form.Group>
        )
    }

    onSubmit = (formValues) => {
        this.props.login(formValues)
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

    render(){
        return(
            <Container className="bg-light border rounded shadow-container form-container">
            <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <h2>Logowanie</h2>
                    <Field type="text" label="Nazwa użytkownika" name="username" component={this.renderInput} placeholder="Wprowadź nazwę użytkownika"></Field>
                    <Form.Text className="text-muted">
                    Zapewniamy że twoje dane będą bezpieczne 
                    </Form.Text>
                    <Field type="password" label="Hasło" name="password" component={this.renderInput} placeholder="Wprowadź hasło"></Field>
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

    if(!formValues.username) {
        errors.username = 'Musisz podać nazwę użytkownika';
    }

    if(!formValues.password) {
        errors.password = 'Musisz podać hasło';
    }

    return errors;
}

const mapStateToProps = state => {
    return {
        alert: state.alert,
        loading: state.loading.LOGIN
        }
}

const formWrapped = reduxForm(
    {
        form:'loginForm',
        validate
    }
)(LoginPage);

const {clear} = alertActions;

export default connect(mapStateToProps,{login,clear})(formWrapped);