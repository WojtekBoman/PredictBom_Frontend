import React from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import {deleteOffer} from '../../actions/contractActions';

class Offer extends React.Component {

    renderButtonContent = (text) => {
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
            return text
        }
    }

    deleteOffer = () => {
        this.props.deleteOffer(this.props.offerId);
    }

    render(){
        return(
            <tr>
                <td>{this.props.price}</td>
                <td>{this.props.countOfShares}</td>
                <td>{this.props.createdDate}</td>
               {(!this.props.isOwner || window.location.href.includes("offers"))  && <td>{this.props.dealer}</td>} 
                <td>
                    {this.props.isOwner ? 
                    (<Button onClick={this.deleteOffer} variant="danger">{this.renderButtonContent("Usuń")}</Button>)
                    :
                    (<Button variant="primary" onClick={() => this.props.onClickShowModal(this.props.countOfShares,this.props.offerId)}>{this.renderButtonContent("Kup")}</Button>)
                }
                </td>        
            </tr>
        )
    }
   
}

const mapStateToProps = state => {
    return {
        loading: state.loading.DELETE_OFFER
    }
}

export default connect(mapStateToProps,{deleteOffer})(Offer);