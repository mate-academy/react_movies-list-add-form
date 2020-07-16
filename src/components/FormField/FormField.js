import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';
import './FormField.scss';

export const FormField = ({
  id,
  name,
  value,
  label,
  placeholder,
  error,
  onChange,
  onBlur,
}) => (
  <Form.Input
    error={!!error && { content: error }}
    type="text"
    id={id}
    name={name}
    label={`Movie ${label}`}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    onBlur={onBlur}
  />
);

FormField.defaultProps = {
  placeholder: '',
  error: '',
};

FormField.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
};
