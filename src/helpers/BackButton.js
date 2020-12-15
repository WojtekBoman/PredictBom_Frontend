import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowCircleLeft} from '@fortawesome/free-solid-svg-icons';
import history from '../history';

const BackButton = () => {
    return(
        <FontAwesomeIcon style={{display:"inline-block", marginRight:"10px"}} className="back-icon" icon={faArrowCircleLeft} size={"2x"} onClick={() => history.goBack()}>
        </FontAwesomeIcon>
        )
}

export default BackButton;