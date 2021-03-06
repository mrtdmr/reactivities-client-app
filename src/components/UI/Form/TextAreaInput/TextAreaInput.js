import React from 'react';
import { Form, Label } from 'semantic-ui-react';

const TextAreaInput = ({
  input,
  width,
  rows,
  placeholder,
  meta: { touched, error }
}) => {
  return (
    <Form.Field error={touched && !!error}>
      <textarea
        {...input}
        placeholder={placeholder}
        width={width}
        rows={rows}
      />
      {touched && error && (
        <Label basic color='red'>
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

export default TextAreaInput;
