import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowCircleLeft} from '@fortawesome/free-solid-svg-icons';
import history from '../history';
import './BackButton.scss';

const BackButton = () => {
    return(
        <FontAwesomeIcon className="back-icon" icon={faArrowCircleLeft} size={"2x"} onClick={() => history.goBack()}>
        </FontAwesomeIcon>
        )
}

export default BackButton;