import React from 'react';
import { Container, Table,Modal,Form,Button } from 'react-bootstrap';
import {connect} from 'react-redux';
import {fetchOffers} from '../../actions/offerActions';
import BuyOfferModal from './BuyOfferModal';
import PaginationBar from '../Markets/PaginationBar';
import {updateOfferPagination} from '../../actions/paginationActions';
import Offer from './Offer';
import {changePage} from '../../actions/filterOfferActions';
import BackButton from '../../helpers/BackButton';
import {alertActions} from '../../actions/alertActions';
import Loader from 'react-loader-spinner';

class BetOffers extends React.Component {

    state = {
        showModalForm:false,
        maxValue:1000,
        id:0
    }

    componentDidMount() {
        this.props.fetchOffers(this.props.match.params.id,this.props.match.params.option,this.props.filter.page,this.props.filter.pageSize);
    }

    componentDidUpdate(prevProps,prevState) {
        if(!(JSON.stringify(this.props.filter)===JSON.stringify(prevProps.filter))){
            this.props.fetchOffers(this.props.match.params.id,this.props.match.params.option,this.props.filter.page,this.props.filter.pageSize);
        }
        
    }

    componentWillUnmount() {
        this.props.clear()
    }

    handleClose = () => {
        this.setState({showModalForm:false})
        this.props.clear();
    }

    handleShow = (maxValue,id) => {
        this.setState({showModalForm:true,maxValue,id});
    }

    renderLoading(){
        if(typeof(this.props.loading) !== "undefined" && this.props.loading.pending){
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

    renderInfo() {

    }

    renderContent() {
        if(this.props.offers && typeof(this.props.loading) !== "undefined" && !this.props.loading.pending) {
        return(
            <div>
                  <div className="table-responsive">
                    {this.props.offers && (
                        <Table striped bordered hover>
                        <thead>
                            <tr>
                            <th>Cena akcji [$]</th>
                            <th>Liczba akcji</th>
                            <th>Data wystawienia</th>
                            <th>Sprzedawca</th>
                            {this.props.user && (<th>Czynności</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.offers.map(offer => <Offer user={this.props.user} isOwner={this.props.user && this.props.user.username === offer.dealer} user={offer.user} dealer={offer.dealer ? offer.dealer : "Organizator rynku"} onClickShowModal={this.handleShow} offerId={offer.id} shares={offer.shares} price={offer.price} createdDate={offer.createdDate}/>)}
                        </tbody>
                        </Table>
                    )}
                 </div>
                <PaginationBar paginationInfo={this.props.pagination} changePage={changePage}/>
            </div>
        )
        }
    }

    render() {
        console.log(this.props.user);
        return (
            <Container className="bg-light border rounded shadow-container create-market-container">
                <header style={{display:"inline-block"}}>
                    <BackButton />
                    <h2 style={{display:"inline-block"}}>Oferty</h2>
                    </header>
                <hr className="my-4"></hr>
                {this.renderLoading()}
                {this.renderContent()}
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
        user: state.login.user,
        loading: state.loading.FETCH_OFFERS,
        alert: state.alert
    }
}

export default connect(mapStateToProps,{fetchOffers,updateOfferPagination,clear:alertActions.clear})(BetOffers)