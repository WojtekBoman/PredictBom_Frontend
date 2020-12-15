import React from 'react';
import {connect} from 'react-redux';
import {Container,Form,Spinner,Button,Alert} from 'react-bootstrap';
import {fetchContractDetails,addOffer} from '../../actions/contractActions';
import BackButton from '../../helpers/BackButton'

class AddOfferPage extends React.Component {
    
    state = {
        price:0.5,
        shares:1,
        info:""
    }

    componentDidMount() {
        this.props.fetchContractDetails(this.props.match.params.id);
    }

    onChangeprice = (e) => {
        this.setState({price: e.target.value});
    }

    onChangeshares = (e) => {
        this.setState({shares: e.target.value})
    }

    renderInfo() {
        if(this.state.info) {
            return <Alert className="login-alert" variant="danger">
                {this.state.info}
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

    handleSubmit = (e) => {
    
        if(this.state.shares > 0 && this.state.price){
            this.props.addOffer(this.props.match.params.id,this.state.shares,this.state.price);
        } else{
            this.setState({info:"Wprowadziłeś błędne dane, podane wartości muszą być większe od zera !"})
        }

    }

    render() {
       

        if(this.props.contract && this.props.contract.shares > 0){
        return(
           
            <Container className="bg-light border rounded shadow-container create-market-container">
                <header style={{display:"inline-block"}}>
                    <BackButton />
                    <h3 style={{display:"inline-block"}}>Dodaj nową ofertę</h3>
                    <hr className="my-4"></hr>
                </header>
                <Form>
                    <Form.Group controlId="formBasicRange">
                        <Form.Label><h4>Cena sprzedaży</h4></Form.Label>
                        <p className="text-muted">Wybierz cenę z zakresu od 0 do 1 $ (Przesuń pasek lub wpisz ręcznie)</p>
                        <Form.Control min={0.01} max={1} step={0.01} type="range" value={this.state.price} onChange={this.onChangeprice}/>
                        <Form.Control min={0.01} max={1} step={0.01} type="number" value={this.state.price} onChange={this.onChangeprice}/>
                        <Form.Label><h4>Liczba akcji</h4></Form.Label>
                        <p className="text-muted">Wybierz liczbę akcji którą chcesz wystawić na sprzedaży</p>
                        <Form.Control min={1} max={this.props.contract.shares} step={1} type="range" value={this.state.shares} onChange={this.onChangeshares}/>
                        <Form.Control min={1} max={this.props.contract.shares} step={1} type="number" value={this.state.shares} onChange={this.onChangeshares}/>
                        <div>
                        <Button variant="primary" onClick={this.handleSubmit} style={{marginTop:"10px"}}>
                            {this.renderButtonContent()}
                        </Button>
                        </div>
                    </Form.Group>
                    {this.renderInfo()}
                </Form>
            </Container>
        )
        }
        return(
            <Container className="bg-light border rounded shadow-container create-market-container">
            <header>
                <h4>Nie możesz wystawić oferty, ponieważ wszystkie akcje z tego kontraktu sa wystawione na sprzedaż</h4>
                <hr className="my-4"></hr>
            </header>
        </Container>
        )
    }
}

const mapStateToProps = (state,ownProps) => {
    return {
        loading: state.loading.ADD_OFFER,
        loadingContract: state.loading.FETCH_CONTRACT_DETAILS,
        alert: state.alert,
        contract: state.contracts.find(contract => contract.id == ownProps.match.params.id) 
    }
}

export default connect(mapStateToProps,{addOffer,fetchContractDetails})(AddOfferPage);