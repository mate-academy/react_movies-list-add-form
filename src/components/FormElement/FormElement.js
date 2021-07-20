import React from 'react';
import PropTypes from 'prop-types';
import './FormElement.scss';

export const FormElement = ({
  type,
  name,
  id,
  value,
  onChange,
  rows,
  cols,
}) => (
  <label htmlFor={id} className="addMovieForm__Label">
    {name}
    :
    {type === 'text'
      ? (
        <input
          type="text"
          id={id}
          name={name}
          value={value}
          onChange={({ target }) => {
            onChange(target.value);
          }}
        />
      )
      : (
        <textarea
          id={id}
          name={name}
          value={value}
          cols={cols}
          rows={rows}
          onChange={({ target }) => {
            onChange(target.value);
          }}
        />
      )}
  </label>
);

FormElement.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  rows: PropTypes.number,
  cols: PropTypes.number,
};

FormElement.defaultProps = {
  rows: 8,
  cols: 23,
};
