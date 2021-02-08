import React from 'react';
import { Alert } from "react-bootstrap";

export const renderInfo = (alert) => {
    if (alert.payload) {
      return (
        <Alert className="mt-3" variant="danger">
          {alert.payload}
        </Alert>
      );
    }
  }

  export const renderInfoWithClose = (alert, clear) => {
    if (alert.payload) {
      return (
        <Alert
          className="mt-3"
          onClose={() => clear()}
          variant="danger"
          dismissible
        >
          {alert.payload}
        </Alert>
      );
    }
  };