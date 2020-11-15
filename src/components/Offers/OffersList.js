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
                {this.props.offers.map(offer => <Offer isOwner={this.props.isOwner} offerId={offer.id} countOfShares={offer.countOfContracts} price={offer.valueOfShares} createdDate={offer.createdDate}/>)}
            </tbody>
            </Table>
       
            </div>
        )
    }
}

export default connect()(OffersList);