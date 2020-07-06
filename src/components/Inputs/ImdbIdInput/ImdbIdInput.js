import React from 'react';
import PropTypes from 'prop-types';

export const ImdbIdInput = (props) => {
  const { onChangeInput, imdbId, handleValidate, error } = props;

  return (
    <>
      <input
        maxLength="20"
        type="text"
        value={imdbId}
        placeholder="Imdb ID"
        className={error ? `App__input App__input-error` : `App__input`}
        onChange={event => onChangeInput(event.target.value, 'imdbId')}
        onBlur={event => handleValidate(event.target.value, 'imdbId')}
      />
      {error && <div className="error__container">Please enter the ID</div>}
    </>
  );
};

ImdbIdInput.propTypes = {
  onChangeInput: PropTypes.func.isRequired,
  imdbId: PropTypes.string.isRequired,
  handleValidate: PropTypes.func.isRequired,
  error: PropTypes.bool.isRequired,
};
