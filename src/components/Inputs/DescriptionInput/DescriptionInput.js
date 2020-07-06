import React from 'react';
import PropTypes from 'prop-types';

export const DescriptionInput = (props) => {
  const { onChangeInput, description, handleValidate, error } = props;

  return (
    <>
      <input
        maxLength="250"
        type="text"
        placeholder="Description"
        className={error ? `App__input App__input-error` : `App__input`}
        value={description}
        onChange={event => onChangeInput(event.target.value, 'description')}
        onBlur={event => handleValidate(event.target.value, 'description')}
      />
      {error
       && <div className="error__container">Please enter the description</div>}
    </>
  );
};

DescriptionInput.propTypes = {
  onChangeInput: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired,
  handleValidate: PropTypes.func.isRequired,
  error: PropTypes.bool.isRequired,
};
