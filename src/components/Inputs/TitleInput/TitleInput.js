import React from 'react';
import PropTypes from 'prop-types';

export const TitleInput = ({ onChangeInput, title, handleValidate, error }) => (
  <>
    <input
      maxLength="40"
      type="text"
      placeholder="Title"
      value={title}
      className={error ? `App__input App__input-error` : `App__input`}
      id="title"
      onChange={event => onChangeInput(event.target.value, 'title')}
      onBlur={event => handleValidate(event.target.value, 'title')}
    />
    {error && <div className="error__container"> Please enter the title </div>}
  </>
);

TitleInput.propTypes = {
  onChangeInput: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  handleValidate: PropTypes.func.isRequired,
  error: PropTypes.bool.isRequired,
};
