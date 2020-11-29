import React from 'react';
import {connect} from 'react-redux';
import {Container,Form,Spinner,Alert,Button} from 'react-bootstrap'; 
import {fetchMarket,editMarket} from '../../actions/marketActions';
import {reduxForm,Field} from 'redux-form';

class EditMarketPage extends React.Component {

    componentDidMount() {
        this.props.fetchMarket(this.props.match.params.id)
    }

    getSelectedOption = (option) => {
        return this.getOptions().find(opt => opt.text.toLowerCase() === option.toLowerCase())
    }

    getOptions() {
        return(
          [
            {val:"SPORT",text:"Sport",key:1},
            {val:"GOSPODARKA",text:"Gospodarka",key:2},
            {val:"CELEBRYCI",text:"Celebryci",key:3},
            {val:"POLITYKA",text:"Polityka",key:4},
            {val:"INNE",text:"Inne",key:5}
          ]
        )
      }

    renderInput = ({input, label,meta,type,placeholder,as,helpText,rows,disabled}) => {
        return (
        <Form.Group>
        <Form.Label>{label}</Form.Label>
        <Form.Control {...input} as={as} type={type} placeholder={placeholder} rows={rows} disabled={disabled}/>
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
        disabled,
        meta: { touched, error }
      }){return(
        <Form.Group>
        <Form.Label>{label}</Form.Label>
          <Form.Control {...input} as="select" disabled={disabled}>
            {options.map(option => (
              <option value={option.val} key={option.key}>
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
        console.log(formValues);
        this.props.editMarket(this.props.match.params.id,formValues);
    }

    renderForm() {
        if(this.props.currentMarket) {

            console.log(this.props);
            return(
                <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <Field disabled={this.props.currentMarket.published} type="text" label="Tytuł rynku" name="topic" component={this.renderInput} placeholder="Wprowadź tytuł rynku prognostycznego"></Field>
                <Field helpText="Jeżeli nie wiesz kiedy może zakończyć się dany rynek nie wypełniaj tego pola" type="date" label="Przewidywana data zakończenia rynku" name="predictedEndDate" component={this.renderInput}></Field>
                <Field disabled={this.props.currentMarket.published} name="category" label="Wybierz kategorię rynku" options={this.getOptions()} component={this.renderSelectField}/>
                {/* <Field validate={this.validateImageFormat} type="file" name="marketCover" component={this.renderFileInput} />
                <div className="img-box">
                {this.state.imageFile && (<Image className="img" src={this.state.imageFile} rounded/>)}
                </div> */}
                <Field disabled={this.props.currentMarket.published} as="textarea" rows="5" name="description" label="Krótko opisz rynek i jego zasady" component={this.renderInput} />
                <Button className="form-button" variant="primary" type="submit">
                  {this.renderButtonContent()}
                </Button>
                {/* <Button className="form-button" variant="primary" type="reset" onClick={this.resetForm} disabled={this.state.resetButtonDisable}>
                  Cofnij zmiany
                </Button> */}
                </Form>
            )
        }
    }

    render() {
        return(
            <Container className="bg-light border rounded shadow-container create-market-container">
                <header>
                    <h2>Edytuj rynek</h2>
                    <hr className="my-4"></hr>
                </header>
                {this.renderForm()}
            </Container>
        )
    }

}

const validate = formValues => {
    const errors = {}
    const requiredFields = [ 'marketTitle','description']
    requiredFields.forEach(field => {
    if (!formValues[ field ]) {
      errors[ field ] = 'To pole jest wymagane'
    }
  })

  if(formValues.predictedDateEnd){
      let predictedDate = new Date(formValues.predictedDateEnd);
      let dateNow = new Date();

      if(predictedDate < dateNow) {
        errors['predictedDateEnd'] = "Musisz podać datę późniejszą od dzisiejszej";
      }

  }
  return errors
}

const formWrapped = reduxForm(
    {
        form:'editMarketForm',
        validate,
        enableReinitialize: true
    }
)(EditMarketPage);


const mapStateToProps = (state, ownProps) => {
    return {
        loadingMarket: state.loading.FETCH_MARKET,
        loading: state.loading.EDIT_MARKET,
        currentMarket: state.markets.find(market => market.marketId == ownProps.match.params.id),
        alert: state.alert,
        initialValues: state.markets.find(market => market.marketId == ownProps.match.params.id)
    }
}

export default connect(mapStateToProps,{fetchMarket,editMarket})(formWrapped);