import React from 'react';
import {connect} from 'react-redux';
import EditMarketPage from '../Markets/EditMarketPage';
import {reduxForm, Field} from 'redux-form';
import { Container, Form,Alert,Spinner,Button } from 'react-bootstrap';
import {editPassword} from '../../actions/loginActions';
import BackButton from '../../helpers/BackButton';

class EditPasswordPage extends React.Component {

    state = {
        resetButtonDisable:true,
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
  
    onSubmit = (formValues) => {
        this.props.editPassword(formValues);
    }
  
      resetForm = () => {
        this.setState({resetButtonDisable:true})
        this.props.reset();
      }
        
      checkIsEmptyField = (e) => {
        e.target.value ? this.setState({resetButtonDisable:false}) : this.setState({resetButtonDisable:true});
      }
    render(){
        return(
            <Container className="bg-light border rounded shadow-container profile-container">
                <header style={{display:"inline-block"}}>
                    <BackButton />
                    <h3 style={{display:"inline-block"}}>Zmiana hasła</h3>
                    <hr className="my-4"></hr>
                </header>
                <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <Field onChange={this.checkIsEmptyField} type="password" label="Stare hasło" name="oldPassword" component={this.renderInput} placeholder="Wprowadź stare hasło"></Field>
                <Field onChange={this.checkIsEmptyField} type="password" label="Nowe hasło" name="newPassword" component={this.renderInput} placeholder="Wprowadź nowe hasło"></Field>
                <Field onChange={this.checkIsEmptyField} type="password" label="Powtórz nowe hasło" name="repeatedNewPassword" component={this.renderInput} placeholder="Powtórz nowe hasło"></Field>
                <Button id="submitNewPassword" className="form-button" variant="primary" type="submit">
                    {this.renderButtonContent()}
                </Button>
                <Button className="form-button" variant="primary" type="reset" onClick={this.resetForm} disabled={this.state.resetButtonDisable}>
                  Cofnij zmiany
                </Button>
                </Form>
                {this.renderInfo()}
            </Container>
        )
    }
}

const validate = formValues => {
    const errors = {}
    const requiredFields = ['oldPassword', 'newPassword','repeatedNewPassword']
    requiredFields.forEach(field => {
    if (!formValues[ field ]) {
      errors[ field ] = 'To pole jest wymagane'
    }
  })
 
  if(formValues.newPassword !== formValues.repeatNewPassword){
    errors.repeatNewPassword = "Podane hasła są różne";
  }

  return errors
}


const mapStateToProps = state => {
    return {
        alert: state.alert,
        loading: state.loading.EDIT_PASSWORD
    }
}

const formWrapped = reduxForm(
    {
        form:'editPasswordForm',
        validate
    }
)(EditPasswordPage);


export default connect(mapStateToProps,{editPassword})(formWrapped);