import React from 'react';
import {connect} from 'react-redux';
import {Form,Button,Spinner,Alert} from 'react-bootstrap';
import {reduxForm,Field} from 'redux-form';
import {solveMultiBetMarket} from '../../actions/marketActions';

class SolveMultiBetMarketForm extends React.Component {

    state={
        correctBetId:""
    }

    componentDidMount() {
        this.props.initialize({correctBetId:"0"})
      }

    handleCorrectBetId = (e) => {
        this.setState({correctBetId:e.target.value})
        console.log(this.state)
    }

    handleSubmit(e){
        e.preventDefault();
        console.log(this.state);
    }
    
    getOptions() {
        const options = [{val:0,text:"Wybierz zakład",key:1,selected:"selected"}];
        for(let i = 0; i < this.props.bets.length; i++) options.push({val:this.props.bets[i].id,text:this.props.bets[i].chosenOption,key:i+1});
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
        console.log(this.props,formValues)
        this.props.solveMultiBetMarket(this.props.marketId,formValues.correctBetId);
    }

    render() {
        return(
            <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <Field name="correctBetId" label="Wybierz prawidłowy zakład" options={this.getOptions()} component={this.renderSelectField}/>
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

  if(formValues.correctBetId == "0") errors['correctBetId'] = "Wybierz zakład !";
  return errors
}

const formWrapped = reduxForm(
    {
        form:'SolveMultiBetMarketForm',
        validate
    }
)(SolveMultiBetMarketForm);

const mapStateToProps = (state) => {
    return{
        loading: state.loading.SOLVE_MULTI_BET_MARKET,
        alert: state.alert
    }
}

export default connect(mapStateToProps,{solveMultiBetMarket})(formWrapped);