import React from 'react';
import {connect} from 'react-redux';
import {Container,Form,Spinner,Button,Alert} from 'react-bootstrap';
import {fetchContractDetails,addOffer} from '../../actions/contractActions';

class AddOfferPage extends React.Component {
    
    state = {
        sellPrice:0.5,
        countOfShares:0,
        info:""
    }

    componentDidMount() {
        this.props.fetchContractDetails(this.props.match.params.id);
    }

    onChangeSellPrice = (e) => {
        this.setState({sellPrice: e.target.value});
    }

    onChangeCountOfShares = (e) => {
        this.setState({countOfShares: e.target.value})
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
    
        if(this.state.countOfShares > 0 && this.state.sellPrice){
            this.props.addOffer(this.props.match.params.id,this.state.countOfShares,this.state.sellPrice);
        } else{
            this.setState({info:"Wprowadziłeś błędne dane, podane wartości muszą być większe od zera !"})
        }

    }

    render() {
       

        if(this.props.contract){
        return(
           
            <Container className="bg-light border rounded shadow-container create-market-container">
                <header>
                    <h4>Dodaj nową ofertę</h4>
                    <hr className="my-4"></hr>
                </header>
                <Form>
                    <Form.Group controlId="formBasicRange">
                        <Form.Label><h4>Cena sprzedaży</h4></Form.Label>
                        <p className="text-muted">Wybierz cenę z zakresu od 0 do 1 $ (Przesuń pasek lub wpisz ręcznie)</p>
                        <Form.Control min={0.01} max={1} step={0.01} type="range" value={this.state.sellPrice} onChange={this.onChangeSellPrice}/>
                        <Form.Control min={0.01} max={1} step={0.01} type="number" value={this.state.sellPrice} onChange={this.onChangeSellPrice}/>
                        <Form.Label><h4>Liczba akcji</h4></Form.Label>
                        <p className="text-muted">Wybierz liczbę akcji którą chcesz wystawić na sprzedaży</p>
                        <Form.Control min={1} max={this.props.contract.countOfContracts} step={1} type="range" value={this.state.countOfShares} onChange={this.onChangeCountOfShares}/>
                        <Form.Control min={1} max={this.props.contract.countOfContracts} step={1} type="number" value={this.state.countOfShares} onChange={this.onChangeCountOfShares}/>
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
            <div>XD</div>
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