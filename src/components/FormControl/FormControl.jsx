import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import './FormControl.scss';

export const FormControl = (
  { name, placeHolder, onChange, row = 1, as = 'input' },
) => (
  <div className="form__input">
    <span className="form__phrase">
      {(name.length > 0) && 'Looks good!'}
    </span>
    <Form.Control
      className={name.length && 'active'}
      onChange={({ target }) => onChange(placeHolder, target)}
      value={name}
      placeholder={placeHolder}
      rows={row}
      as={as}
      type="text"
    />
  </div>
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
