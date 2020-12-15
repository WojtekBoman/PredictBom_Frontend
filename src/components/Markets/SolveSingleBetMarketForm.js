import React from 'react';
import {connect} from 'react-redux';
import {Form,Button,Alert,Spinner} from 'react-bootstrap';
import {reduxForm,Field} from 'redux-form';
import {solveSingleBetMarket} from '../../actions/marketActions';

class SolveSingleBetMarketForm extends React.Component {

    state = {
        title:null
    }

    componentDidMount() {
        this.props.initialize({correctBetOption:"0"})
      }

    getOptions() {
        const options = [
            {val:0,text:`Wybierz prawidłową opcję dla zakładu "${this.props.bets[0].title}"`,key:1,selected:"selected"},
            {val:true,text:"Wybierz opcję na tak",key:2},
            {val:false,text:"Wybierz opcję na nie",key:3}
        ];
        
        return options;
      }

      renderSelectField = ({
        input,
        options,
        label,
        type,
        meta: { touched, error }
      }) => {return(
        <Form.Group>
        <Form.Label>{label}</Form.Label>
          <Form.Control {...input} as="select">
            {options.map(option => (
              <option value={option.val} key={option.key}>
                {option.text}
              </option>
            ))}
          </Form.Control>
          {error && touched && <div>{this.renderError({error,touched})}</div>}
        </Form.Group>
      );
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

    onSubmit = (formValues) => {
     
        this.props.solveSingleBetMarket(this.props.marketId,this.props.bets[0].id,formValues.correctBetOption);
    }

    render() {
        return(
            <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
            <Field name="correctBetOption" label={`Wybierz prawidłową opcję dla zakładu "${this.props.bets[0].title}"`} options={this.getOptions()} component={this.renderSelectField}/>
            <Button className="form-button" variant="primary" type="submit">
              {this.renderButtonContent()}
            </Button>
            {this.renderInfo()}
        </Form>
        )
    }
}

const validate = formValues => {
    const errors = {}

  if(formValues.correctBetOption== "0") errors['correctBetOption'] = "Wybierz prawidłową opcję !";
  return errors
}

const formWrapped = reduxForm(
    {
        form:'SolveSingleBetMarketForm',
        validate
    }
)(SolveSingleBetMarketForm);

const mapStateToProps = (state) => {
    return{
        loading: state.loading.SOLVE_SINGLE_BET_MARKET,
        alert: state.alert
    }
}


export default connect(mapStateToProps,{solveSingleBetMarket})(formWrapped);