import React from 'react';
import {Spinner} from 'react-bootstrap';


export const renderButtonContent = (loading, submitText) => {
    if ((typeof loading !== 'undefined') && loading.pending) {
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
        return submitText
    }
}
