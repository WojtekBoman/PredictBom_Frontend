import React from 'react';
import {Alert,Container,Form, Button,Spinner} from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import {connect} from 'react-redux';
import {createMarket} from '../../actions/marketActions';
import BackButton from '../../helpers/BackButton';


class CreateMarketPage extends React.Component {

    state = {
      resetButtonDisable:true,
    }

    componentDidMount() {
      this.props.initialize({category:"SPORT"})
    }

    getOptions() {
      return(
        [
          {val:"SPORT",text:"Sport",key:1},
          {val:"ECONOMY",text:"Gospodarka",key:2},
          {val:"CELEBRITIES",text:"Celebryci",key:3},
          {val:"POLICY",text:"Polityka",key:4},
          {val:"OTHER",text:"Inne",key:5}
        ]
      )
    }

    renderInput = ({input, label,meta,type,placeholder,as,helpText,rows,id}) => {
        return (
        <Form.Group>
        <Form.Label>{label}</Form.Label>
        <Form.Control id={id} {...input} as={as} type={type} placeholder={placeholder} rows={rows}/>
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

    renderSelectField({
        input,
        options,
        label,
        type,
        meta: { touched, error }
      }){return(
        <Form.Group>
        <Form.Label>{label}</Form.Label>
          <Form.Control {...input} as="select">
            {options.map(option => (
              <option id={option.val} value={option.val} key={option.key}>
                {option.text}
              </option>
            ))}
          </Form.Control>
          {touched && error && <span>{error}</span>}
        </Form.Group>
      );
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
        console.log(formValues)
        this.props.createMarket(formValues);
    }

    resetForm = () => {
      this.setState({resetButtonDisable:true})
      this.props.reset();
    }
      
    checkIsEmptyField = (e) => {
      e.target.value ? this.setState({resetButtonDisable:false}) : this.setState({resetButtonDisable:true});
    }

    render() {

        return(
            <Container className="bg-light border rounded shadow-container create-market-container">
              <header style={{display:"inline-block"}}>
                <BackButton />
                <h2 style={{display:"inline-block"}}>Tworzenie rynku prognostycznego</h2>
                </header>  
                <hr className="my-4"></hr>
                <Form onSubmit={this.props.handleSubmit(this.onSubmit)} encType="multipart/form-data">
                <Field type="text" label="Tytuł rynku" name="topic" component={this.renderInput} placeholder="Wprowadź tytuł rynku prognostycznego"></Field>
                <Field helpText="Jeżeli nie wiesz kiedy może zakończyć się dany rynek nie wypełniaj tego pola" type="date" label="Przewidywana data zakończenia rynku" name="endDate" component={this.renderInput}></Field>
                <Field name="category" label="Wybierz kategorię rynku" options={this.getOptions()} component={this.renderSelectField}/>
                {/* <Field validate={this.validateImageFormat} type="file" name="marketCover" component={this.renderFileInput} />
                <div className="img-box">
                {this.state.imageFile && (<Image className="img" src={this.state.imageFile} rounded/>)}
                </div> */}
                <Field as="textarea" rows="5" id="description" name="description" label="Krótko opisz rynek i jego zasady" component={this.renderInput} />
                <Button id="createMarketButton" className="form-button" variant="primary" type="submit">
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
    const requiredFields = [ 'topic','description']
    requiredFields.forEach(field => {
    if (!formValues[ field ]) {
      errors[ field ] = 'To pole jest wymagane'
    }
  })

  if(formValues.endDate){
      let predictedDate = new Date(formValues.endDate);
      let dateNow = new Date();

      if(predictedDate < dateNow) {
        errors['endDate'] = "Musisz podać datę późniejszą od dzisiejszej";
      }

  }
  return errors
}

const mapStateToProps = state => {
  return {
    alert: state.alert,
    loading: state.loading.CREATE_MARKET
  }
}

const formWrapped = reduxForm(
    {
        form:'createMarketForm',
        validate
    }
)(CreateMarketPage);

export default connect(mapStateToProps,{createMarket})(formWrapped);