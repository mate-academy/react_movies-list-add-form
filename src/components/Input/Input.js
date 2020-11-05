import React from 'react';
import PropTypes from 'prop-types';

export const Input = ({
  fields,
  field,
  errors,
  handleChange,
  onBlur,
}) => (
  <>
    <label
      key={field}
      className="label"
      htmlFor={field}
    >
      {field}
    </label>
    <input
      className={errors[field]
        ? 'input input--error'
        : 'input'}
      type="text"
      id={field}
      name={field}
      value={fields[field]}
      placeholder={field}
      onChange={handleChange}
      onBlur={onBlur}
    />
    {errors[field] && (
      <div className="error">Please enter correct value</div>
    )}
  </>
);

Input.propTypes = {
  fields: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imgUrl: PropTypes.string.isRequired,
    imdbUrl: PropTypes.string.isRequired,
    imdbId: PropTypes.string.isRequired,
  }).isRequired,
  field: PropTypes.string.isRequired,
  errors: PropTypes.shape({
    title: PropTypes.bool.isRequired,
    imgUrl: PropTypes.bool.isRequired,
    imdbUrl: PropTypes.bool.isRequired,
    imdbId: PropTypes.bool.isRequired,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
};
