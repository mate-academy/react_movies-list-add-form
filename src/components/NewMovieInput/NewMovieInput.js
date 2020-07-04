import React from 'react';
import PropTypes from 'prop-types';

export const NewMovieInput = (props) => {
  const {
    name,
    valueItem,
    handleInput,
    isValidatedInput,
  } = props;

  return (
    <label>
      <input
        type="text"
        value={valueItem.value}
        name={name}
        onChange={event => handleInput(event)}
        onBlur={event => isValidatedInput(event)}
        placeholder={name}
        className={
          `w-100 p-2 form-control ${!valueItem.isValid && 'is-invalid'}`
        } //  "is-invalid" class for error
      />
    </label>
  );
};

NewMovieInput.propTypes = {
  name: PropTypes.string.isRequired,
  valueItem: PropTypes.shape({
    value: PropTypes.string.isRequired,
    isValid: PropTypes.bool.isRequired,
  }).isRequired,
  handleInput: PropTypes.func.isRequired,
  isValidatedInput: PropTypes.func.isRequired,
};
