import React from 'react';
import { Form, Label } from 'semantic-ui-react';
import { DateTimePicker } from 'react-widgets';

const DateInput = ({
  input,
  width,
  placeholder,
  date = false,
  time = false,
  meta: { touched, error },
  ...rest
}) => {
  return (
    <Form.Field error={touched && !!error}>
      <DateTimePicker
        culture='TR'
        placeholder={placeholder}
        value={input.value ? new Date(input.value) : null}
        onChange={input.onChange}
        date={date}
        time={time}
        {...rest}
      />
      {touched && error && (
        <Label basic color='red'>
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

export default DateInput;
