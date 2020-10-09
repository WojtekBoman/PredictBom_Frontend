import React from 'react';
import {Modal, Button} from 'react-bootstrap'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

class MarketModal extends React.Component {

    render() {
        return (
          <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              <h3>Info</h3>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div className>
          
        <h5 className=" d-flex justify-content-center align-items-center alert alert-dark"> <FontAwesomeIcon className="m-3" size="2x" icon={faInfoCircle} />{this.props.message}</h5>
        </div>
            {/* <p>
             
            </p> */}
          </Modal.Body>
          <Modal.Footer> 
            <div className="col-sm-12 d-flex justify-content-center"> 
            <Button id="okButton" className="col-sm-6">OK</Button>
            </div>
          </Modal.Footer>
        </Modal>
  
  
        );
    }
  }

  export default MarketModal;