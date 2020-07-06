import React from 'react';
import PropTypes from 'prop-types';

export const ImdbUrlInput = (props) => {
  const { onChangeInput, imdbUrl, handleValidate, error } = props;

  return (
    <>
      <input
        maxLength="100"
        type="text"
        placeholder="Imdb URL"
        className={error ? `App__input App__input-error` : `App__input`}
        value={imdbUrl}
        onChange={event => onChangeInput(event.target.value, 'imdbUrl')}
        onBlur={event => handleValidate(event.target.value, 'imdbUrl')}
      />
      {error
      && <div className="error__container">Please enter the correct URL</div>}
    </>
  );
};

ImdbUrlInput.propTypes = {
  onChangeInput: PropTypes.func.isRequired,
  imdbUrl: PropTypes.string.isRequired,
  handleValidate: PropTypes.func.isRequired,
  error: PropTypes.bool.isRequired,
};
