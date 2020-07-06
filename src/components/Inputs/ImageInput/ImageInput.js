import React from 'react';
import PropTypes from 'prop-types';

export const ImageInput = (props) => {
  const { onChangeInput, imgUrl, handleValidate, error } = props;

  return (
    <>
      <input
        maxLength="100"
        type="text"
        placeholder="Image URL"
        className={error ? `App__input App__input-error` : `App__input`}
        value={imgUrl}
        onChange={event => onChangeInput(event.target.value, 'imgUrl')}
        onBlur={event => handleValidate(event.target.value, 'imgUrl')}
      />
      {error
      && <div className="error__container">Please enter the correct URL</div>}
    </>
  );
};

ImageInput.propTypes = {
  onChangeInput: PropTypes.func.isRequired,
  imgUrl: PropTypes.string.isRequired,
  handleValidate: PropTypes.func.isRequired,
  error: PropTypes.bool.isRequired,
};
