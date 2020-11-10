import React from 'react';
import {connect} from 'react-redux';
import {Alert,Container,Form,Button,Spinner,Modal,Row,Col} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTimesCircle} from '@fortawesome/free-solid-svg-icons';
import {addBet,deleteBet,fetchMarket} from '../../actions/marketActions';
import { Field, reduxForm } from 'redux-form';
import MarketModal from './MarketModal';
import BetsList from './BetsList';
import {alertActions} from '../../actions/alertActions';
import {Link} from "react-router-dom"
import { LinkContainer } from 'react-router-bootstrap';
import { Line, Circle } from 'rc-progress';

class EditBetsPage extends React.Component {
    
    state = {
        marketId: this.props.match.params.id,
        chosenOption: "",
        showModal:false,
    }

    componentDidMount() {
        if(!this.props.currentMarket) this.props.fetchMarket(this.props.match.params.id)
    }

    renderButtonContent() {
        if ((typeof this.props.addingLoading !== 'undefined') && this.props.addingLoading.pending) {
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
            return "Dodaj zakład"
        }
    }
  
    renderInfo() {

    
      return (
          <Modal show={this.props.alert.payload != undefined} onHide={this.props.clear}>
            <Modal.Header closeButton>
              <Modal.Title>Zakłady</Modal.Title>
            </Modal.Header>
            <Modal.Body>{this.props.alert.payload}</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.props.clear}>
                Powrót
              </Button>

            </Modal.Footer>
          </Modal>   
        )
  }

  renderInput = ({input, label,meta,type,placeholder,as,helpText,rows,max}) => {
    return (
    <Form.Group>
    <Form.Label>{label}</Form.Label>
    <Form.Control {...input} max={max} as={as} type={type} placeholder={placeholder} rows={rows}/>
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

// renderFailedFetch = () => {
//     if(this.props.alert.payload && !this.state.submittedForm) {
//         return(
//             <Alert variant='danger'>
//                 {this.props.alert.payload}
//             </Alert>
//         )
//     }
// }

onSubmit = (formValues) => {
    this.props.addBet(this.props.match.params.id,formValues.yesPrice,formValues.noPrice,formValues.chosenOption)
}

renderBetsList = () => {
        return(
            <BetsList bets={this.props.currentMarket.bets} correctBetId={this.props.currentMarket.correctBetId}
            published={this.props.currentMarket.published} marketId={this.props.match.params.id} />
        )
} 

    renderLoading = () => {
        if((typeof this.props.loadingMarket !== 'undefined') && this.props.loadingMarket.pending) {
            return(
                <Container className="text-center bg-light border rounded shadow-container create-market-container">
                    <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    />
                    <h3>Pobieranie danych rynku</h3>
                </Container>
            )
        }
    }

    renderNextStepButton = () => {
        if(this.props.currentMarket.bets) {
            return(<LinkContainer to={`/markets/makePublic/${this.props.match.params.id}`}>
                <Button variant="primary" type="submit">
                        Zatwierdź zakłady
                </Button>
            </LinkContainer>)
        }
    }

    renderPageContent() {
        if(this.props.currentMarket){
            return(
                <Container className="bg-light border rounded shadow-container create-market-container">
                <h3>{this.props.currentMarket.topic}</h3>
                <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <Field onChange={this.checkIsEmptyField} type="text" label="Dodawanie zakładu" name="chosenOption" component={this.renderInput} placeholder="Wprowadź tytuł zakładu"></Field>
                <Row>
                    <Col sm={6}>
                    <Field type="number" label="Podaj cenę kontraktu na tak" max="1" name="yesPrice" component={this.renderInput} placeholder="Podaj cenę kontraktu na tak"></Field>
                    </Col>
                    <Col sm={6}>
                    <Field type="number" label="Podaj cenę kontraktu na nie" max="1" name="noPrice" component={this.renderInput} placeholder="Podaj cenę kontraktu na nie"></Field>
                    </Col>
                </Row>
                    <Button variant="primary" type="submit">
                        {this.renderButtonContent()}
                    </Button>
                </Form>
                {this.renderInfo()}            
                {this.renderBetsList()}
                {this.renderNextStepButton()}
            </Container>
            )
        }
    }

    renderFailedToFetch() {
        if(!this.props.currentMarket && (typeof this.props.loadingMarket !== 'undefined') && !this.props.loadingMarket.pending){
            return(
            <Container className="text-center bg-light border rounded shadow-container create-market-container">
                <FontAwesomeIcon icon={faTimesCircle} size={"6x"}/>
                <h2>Wystąpił błąd pobierania danych. Odśwież stronę i spróbuj ponownie</h2>
            </Container>
            )
        }
    }
 

    render(){
        return( 
            <div>
            {this.renderLoading()}
            {this.renderFailedToFetch()}
            {this.renderPageContent()}
            {this.renderInfo()}
            {/* {this.renderFailedFetch()} */}
            </div>
           )
    }
}

const validate = formValues => {
    const errors = {};
    const requiredFields = [ 'chosenOption','yesPrice','noPrice']
    requiredFields.forEach(field => {
    if (!formValues[ field ]) {
      errors[ field ] = 'To pole jest wymagane'
    }
  })

    const betsSumValue = (parseFloat(formValues.yesPrice) + parseFloat(formValues.noPrice));
    if(betsSumValue > 1.10 || betsSumValue < 1) {
        console.log(formValues)
        errors['yesPrice'] = "Różnica między cenami na tak i nie może wynosić maksymalnie 10 $";
    }

    return errors;
}

const mapStateToProps = (state,ownProps) => {
    return {
      alert: state.alert,
      addingLoading: state.loading.ADD_BET,
      loadingMarket: state.loading.FETCH_MARKET,
      currentMarket: state.markets.find(market => market.marketId == ownProps.match.params.id)
    }
  }



const formWrapped = reduxForm(
    {
        form:'editBets',
        validate
    }
)(EditBetsPage);

export default connect(mapStateToProps,{addBet,deleteBet,fetchMarket,clear:alertActions.clear})(formWrapped);