import React from 'react';
import { Container, Table,Modal,Form,Button } from 'react-bootstrap';
import {connect} from 'react-redux';
import {fetchOffers} from '../../actions/offerActions';
import BuyOfferModal from './BuyOfferModal';
import PaginationBar from '../Markets/PaginationBar';
import {updateOfferPagination} from '../../actions/paginationActions';
import Offer from './Offer';
import {changePage} from '../../actions/filterOfferActions';

class BetOffers extends React.Component {

    state = {
        showModalForm:false,
        maxValue:1000,
        id:0,

    }

    componentDidMount() {
        this.props.fetchOffers(this.props.match.params.id,this.props.match.params.option,this.props.filter.page,this.props.filter.pageSize);
    }

    componentDidUpdate(prevProps,prevState) {
        if(!(JSON.stringify(this.props.filter)===JSON.stringify(prevProps.filter))){
            this.props.fetchOffers(this.props.match.params.id,this.props.match.params.option,this.props.filter.page,this.props.filter.pageSize);
        }
        
    }



    handleClose = () => {
        this.setState({showModalForm:false})
    }

    handleShow = (maxValue,id) => {
        this.setState({showModalForm:true,maxValue,id});
    }

    render() {
   
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
                            <th>Sprzedawca</th>
                            <th>Czynności</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.offers.map(offer => <Offer isOwner={this.props.user && this.props.user.username === offer.dealer} user={offer.user} dealer={offer.dealer ? offer.dealer : "Organizator rynku"} onClickShowModal={this.handleShow} offerId={offer.id} countOfShares={offer.countOfContracts} price={offer.valueOfShares} createdDate={offer.createdDate}/>)}
                        </tbody>
                        </Table>
                    )}
                </div>
                <PaginationBar paginationInfo={this.props.pagination} changePage={changePage}/>
               <BuyOfferModal id={this.state.id} maxValue={this.state.maxValue} handleClose={this.handleClose} showModalForm={this.state.showModalForm} />
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        offers: state.offers,
        pagination: state.pagination.offersPagination,
        filter: state.filterOffers,
        user: state.login.user
    }
}

export default connect(mapStateToProps,{fetchOffers,updateOfferPagination})(BetOffers)