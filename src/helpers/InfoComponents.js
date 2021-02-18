import React from 'react';
import { Alert } from "react-bootstrap";

export const renderInfo = (alert, variant="danger") => {
    if (alert.payload) {
      return (
        <Alert className="mt-3" variant={variant}>
          {alert.payload}
        </Alert>
      );
    }
  }

  export const renderInfoWithClose = (alert, clear,variant="danger") => {
    if (alert.payload) {
      return (
        <Alert
          className="mt-3"
          onClose={() => clear()}
          variant={variant}
          dismissible
        >
          {alert.payload}
        </Alert>
      );
    }
  };