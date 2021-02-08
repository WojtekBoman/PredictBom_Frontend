import React from "react";
import { Alert, Form } from "react-bootstrap";

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
  meta,
}) => {
  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Form.Control {...input} as="select" disabled={disabled}>
        {options.map((option) => (
          <option id={option.val} value={option.val} key={option.key}>
            {option.text}
          </option>
        ))}
      </Form.Control>
      {renderError(meta)}
    </Form.Group>
  );
};

export const renderFileInput = ({
  input,
  type,
  meta,
  accept,
  methodToHandle,
}) => {
  return (
    <div>
      <input
        name={input.name}
        type={type}
        accept={accept}
        onChange={(event) => methodToHandle(event, input)}
      />
      {renderError(meta)}
    </div>
  );
};



const renderError = ({ error, touched }) => {
  if (touched && error) {
    return <Alert variant="danger">{error}</Alert>;
  }
};
