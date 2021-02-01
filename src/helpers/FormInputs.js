import React from 'react';
import { Alert, Container, Form, Button, Spinner } from "react-bootstrap";

export const renderInput = ({
  input,
  label,
  meta,
  type,
  placeholder,
  as,
  helpText,
  rows,
  max,
  min,
  disabled,
}) => {
  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        {...input}
        min={min}
        max={max}
        as={as}
        type={type}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
      />
      {renderError(meta)}
      {helpText && <Form.Text className="text-muted">{helpText}</Form.Text>}
    </Form.Group>
  );
};

export const renderSelectField = ({
  input,
  options,
  label,
  type,
  disabled,
  meta: { touched, error }
}) => {return(
  <Form.Group>
  <Form.Label>{label}</Form.Label>
    <Form.Control {...input} as="select" disabled={disabled}>
      {options.map(option => (
        <option id={option.val} value={option.val} key={option.key}>
          {option.text}
        </option>
      ))}
    </Form.Control>
    {touched && error && <span>{error}</span>}
  </Form.Group>
);
      }

export const renderInfo = (alert) => {
    if (alert.payload) {
      return (
        <Alert className="login-alert" variant="danger">
          {alert.payload}
        </Alert>
      );
    }
  }

  export const renderInfoWithClose = (alert,clear) => {
    if (alert.payload) {
      return (
        <Alert className="login-alert" onClose={() => clear()} variant="danger" dismissible>
          {alert.payload}
        </Alert>
      );
    }
  }


  const renderError = ({ error, touched }) => {
    if (touched && error) {
      return <Alert variant="danger">{error}</Alert>;
    }
  }