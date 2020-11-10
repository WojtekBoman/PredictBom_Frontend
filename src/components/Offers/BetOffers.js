import React from 'react';
import { Container, Table,Modal,Form,Button } from 'react-bootstrap';
import {connect} from 'react-redux';
import {fetchOffers} from '../../actions/offerActions';
import BuyOfferModal from './BuyOfferModal';
import Offer from './Offer';


class BetOffers extends React.Component {

    state = {
        showModalForm:false,
        maxValue:1000,
        id:0,

    }

    componentDidMount() {
        console.log(this.props.match.params.id,this.props.match.params.option);
        this.props.fetchOffers(this.props.match.params.id,this.props.match.params.option);
    }

    handleClose = () => {
        this.setState({showModalForm:false})
    }

    handleShow = (maxValue,id) => {
        this.setState({showModalForm:true,maxValue,id});
    }

    render() {
        console.log(this.props.offers);
        return (
            <Container className="bg-light border rounded shadow-container create-market-container">
                <header><h4>Oferty</h4></header>
                <hr className="my-4"></hr>
                <div>
                    {this.props.offers && (
                        <Table striped bordered hover>
                        <thead>
                            <tr>
                            <th>Cena akcji [$]</th>
                            <th>Liczba akcji</th>
                            <th>Data wystawienia</th>
                            <th>Czynności</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.offers.map(offer => <Offer onClickShowModal={this.handleShow} offerId={offer.id} countOfShares={offer.countOfContracts} price={offer.valueOfShares} createdDate={offer.createdDate}/>)}
                        </tbody>
                        </Table>
                    )}
                </div>
               <BuyOfferModal id={this.state.id} maxValue={this.state.maxValue} handleClose={this.handleClose} showModalForm={this.state.showModalForm} />
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        offers: state.offers
    }
}

export default connect(mapStateToProps,{fetchOffers})(BetOffers)