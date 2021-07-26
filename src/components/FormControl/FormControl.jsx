import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

export const FormControl = (
  { name, placeHolder, onChange, row = 1, as = 'input' },
) => (
  <Form.Control
    onChange={({ target }) => onChange(placeHolder, target)}
    value={name}
    placeholder={placeHolder}
    rows={row}
    as={as}
    type="text"
  />
);

FormControl.propTypes = {
  name: PropTypes.string.isRequired,
  placeHolder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  row: PropTypes.number,
  as: PropTypes.string,
};

FormControl.defaultProps = {
  row: 1,
  as: 'input',
};
