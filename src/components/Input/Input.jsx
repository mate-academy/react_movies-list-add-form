import React from 'react';
import PropTypes from 'prop-types';

export const Input = (
  {
    handlerChange,
    name,
    value,
    titleError,
    imgUrlError,
    imdbUrlError,
    imdbIdError,
  },
) => (
  <>
    <input
      type="text"
      className="form__input"
      name={name}
      placeholder={`Enter ${name}...`}
      value={value}
      onChange={handlerChange}
    />
    {
      name === 'title' && (
        <p className="form__error">{titleError}</p>
      )
    }
    {
      name === 'imgUrl' && (
        <p className="form__error">{imgUrlError}</p>
      )
    }
    {
      name === 'imdbUrl' && (
        <p className="form__error">{imdbUrlError}</p>
      )
    }
    {
      name === 'imdbId' && (
        <p className="form__error">{imdbIdError}</p>
      )
    }
  </>
);

Input.propTypes = {
  handlerChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  titleError: PropTypes.string.isRequired,
  imgUrlError: PropTypes.string.isRequired,
  imdbUrlError: PropTypes.string.isRequired,
  imdbIdError: PropTypes.string.isRequired,
};
