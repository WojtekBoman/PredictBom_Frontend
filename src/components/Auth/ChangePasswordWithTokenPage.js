import React from 'react';
import {connect} from 'react-redux';
import {Container, Form, Button, Spinner,Alert} from 'react-bootstrap';
import {Field,reduxForm} from 'redux-form';
import {changePasswordWithToken} from '../../actions/tokenActions';

class ChangePasswordWithTokenPage extends React.Component {
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
    console.log(formValues,this.props.token);
    this.props.changePasswordWithToken(formValues,this.props.token)
}

    render() {
        return(
        <Container className="bg-light border rounded shadow-container create-market-container">
            <header>
                <h2>Wprowadź nowe hasło dla swojego konta</h2>
            </header>
            <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
            <Field type="password" name="newPassword" component={this.renderInput} placeholder="Wprowadź hasło"></Field>
            <Field type="password" name="repeatedPassword" component={this.renderInput} placeholder="Powtórz hasło"></Field>
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
    const requiredFields = ['newPassword','repeatedPassword']
    requiredFields.forEach(field => {
    if (!formValues[ field ]) {
      errors[ field ] = 'To pole jest wymagane'
    }
  })
 
  
  if(formValues.newPassword !== formValues.repeatPassword){
    errors.repeatPassword = "Podane hasła są różne";
  }
}

const mapStateToProps = state => {
    return {
        alert: state.alert,
        token: state.token.token,
        loading: state.loading.CHANGE_PASSWORD_WITH_TOKEN
    }
}

const formWrapped = reduxForm(
    {
        form:'changePasswordWithToken',
        validate
    }
)(ChangePasswordWithTokenPage);


export default connect(mapStateToProps,{changePasswordWithToken})(formWrapped);