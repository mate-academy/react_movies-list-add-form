import React from 'react';
import { InputShape } from './IndexShape';

const titleName = (name) => {
  let title = '';

  switch (name) {
    case 'title':
      title = `Title `;
      break;
    case 'imgUrl':
      title = `Image logo `;
      break;
    case 'imdbUrl':
      title = `IMDB logo `;
      break;
    case 'imdbId':
      title = `ID on IMDB `;
      break;
    default:
      break;
  }

  return title;
};

export const Input = ({ name, error, value, onBlurChecker, handleChange }) => (
  <p>
    <label className="App__label">
      <span>
        {titleName(name)}
      </span>
      <input
        className={(error) ? 'App__input border' : 'App__input'}
        placeholder="write title here"
        name={name}
        type="text"
        value={value}
        autoComplete="off"
        onBlur={onBlurChecker}
        onChange={handleChange}
      />
    </label>
    <div className="App__error">
      {error}
    </div>
  </p>
);

Input.propTypes = InputShape;
