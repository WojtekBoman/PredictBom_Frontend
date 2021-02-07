import React from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import {deleteOffer} from '../../actions/contractActions';

class Offer extends React.Component {

    state = {
        submitted:false
    }

    renderButtonContent = (text) => {
        if (this.state.submitted && (typeof this.props.loading !== 'undefined') && this.props.loading.pending) {
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
                <td>{this.props.shares}</td>
                <td>{this.props.createdDate}</td>
               {(!this.props.isOwner || window.location.href.includes("offers"))  && <td>{this.props.dealer}</td>} 
               {(this.props.isOwner && this.props.user && window.location.href.includes("offers")) && 
               <td>
                   <LinkContainer to="/contracts">
                        <Button variant="primary">Wyświetl ofertę</Button>
                   </LinkContainer>
               </td>
               }
               {!this.props.isOwner && this.props.user && this.props.user.roles.includes("ROLE_PLAYER") && (<td><Button variant="primary" onClick={() => this.props.onClickShowModal(this.props.shares,this.props.offerId)}>{this.renderButtonContent("Kup")}</Button></td>)}
                {this.props.isOwner && !window.location.href.includes("offers") && (<td><Button onClick={this.deleteOffer} variant="danger">{this.renderButtonContent("Usuń")}</Button></td>)}    
            </tr>
        )
    }
   
}

const mapStateToProps = state => {
    return {
        loading: state.loading.DELETE_OFFER,
        user: state.login.user,
        alert: state.alert
    }
}

export default connect(mapStateToProps,{deleteOffer})(Offer);