import React from 'react';
import {connect} from 'react-redux';
import {Table} from 'react-bootstrap';
import Offer from './Offer';


class OffersList extends React.Component {

    render() {
 
        return(
            <div>
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
                {this.props.offers.map(offer => <Offer key={offer.id} isOwner={this.props.isOwner} offerId={offer.id} shares={offer.shares} price={offer.price} createdDate={offer.createdDate}/>)}
            </tbody>
            </Table>
       
            </div>
        )
    }
}

export default connect()(OffersList);