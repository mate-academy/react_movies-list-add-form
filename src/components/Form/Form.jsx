import React from 'react';
import PropTypes from 'prop-types';

import './Form.scss';

export const Form = ({ label, name, onInputChange, value }) => (
  <>
    <label>
      {`${label}: `}
      <input
        className="movie-input"
        value={value}
        onChange={onInputChange}
        name={name}
        type="text"
        required
      />
    </label>
  </>
);

Form.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
