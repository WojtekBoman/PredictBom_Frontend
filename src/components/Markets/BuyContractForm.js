import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {Alert,Container,Form, Button,Spinner} from 'react-bootstrap';
import {connect} from 'react-redux';
import Loader from 'react-loader-spinner';
import {buyContract} from '../../actions/contractActions';
import {alertActions} from '../../actions/alertActions';


class BuyContractForm extends React.Component {

    componentDidMount() {
        this.props.clear();
    }

    renderInput = ({input,max,min,label,meta,type,placeholder,as,helpText,rows}) => {
        return (
        <Form.Group>

        <Form.Label>{label}</Form.Label>
        <Form.Control {...input} max={max} min={min} as={as} type={type} placeholder={placeholder} rows={rows}/>
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

    onSubmit = (formValues) => {
        this.props.buyContract(this.props.betId, this.props.marketId,this.props.contractOption,formValues);
    }

    renderInfo() {
        if(this.props.alert.payload) {
            return <Alert className="login-alert" variant="danger">
                {this.props.alert.payload}
            </Alert>
        }
    }

    renderForm = () => {
        return(
            <div>
            <hr></hr>
            <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <h4>Wybrana opcja na {this.props.contractOption ? <span>tak</span> : <span>nie</span>}</h4>
        {/* <Field validate={this.validateImageFormat} type="file" name="marketCover" component={this.renderFileInput} />
        <div className="img-box">
        {this.state.imageFile && (<Image className="img" src={this.state.imageFile} rounded/>)}
        </div> */}
        <Form.Text style={{fontSize:"15px"}}>Podaj swoje kryteria zakupu akcji a system wyszuka dla ciebie najlepsze oferty. Iloczyn maksymalnej ceny za jedną akcję i ich liczby nie powinien przekraczać wartości twojego budżetu! Pamiętaj także o limicie zakupów do 1000 akcji dziennie.</Form.Text>
        <hr className="my-4"></hr>
        <Field type="number" max="1" name="maxPrice" label="Podaj maksymalną cenę 1 akcji" component={this.renderInput} />
        <Field type="number" min="1" max="1000" name="shares"  label="Ile akcji chcesz kupić" component={this.renderInput} />
        <div style={{display:"inline-block"}}>
        <Button className="form-button" variant="primary" type="submit">
          Kup
        </Button>
        <Button className="form-button" variant="primary" onClick={this.props.hideForm}>
          Zamknij
        </Button>
        </div>
        </Form>
        </div>
        )
    }

    renderLoadingPrice() {
        if ((typeof this.props.loading !== 'undefined') && this.props.loading.pending) {
            return(
            <div className="text-center">
            <Loader
                 type="TailSpin"
                 color="black"
            />
            </div>
            )
        }
    }

    render() {
        return(
            <div>
                {this.renderForm()}
                {this.renderLoadingPrice()}
                {this.renderInfo()}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        alert: state.alert,
        loading: state.loading.BUY_CONTRACT,
    }
}

const validate = formValues => {
    const errors = {};
    const requiredFields = [ 'maxPrice','shares']
    requiredFields.forEach(field => {
    if (!formValues[ field ]) {
      errors[ field ] = 'To pole jest wymagane'
    }
  })

    return errors
}

const formWrapped = reduxForm(
    {
        form:'buyContractForm',
        validate
    }
)(BuyContractForm);

export default connect(mapStateToProps,{buyContract,clear:alertActions.clear})(formWrapped);