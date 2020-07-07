import React from 'react';
import { MovieInputShape } from '../Shapes/MovieInputShape';
import { PlaceholderHelper } from '../Helpers/PlaceholderHelper';

export const MovieInput = (props) => {
  const {
    onChangeInput,
    handleValidate,
    value,
    field,
    maxLength,
    error,
    touched,
  } = props;

  return (
    <>
      <input
        type="text"
        placeholder={PlaceholderHelper(field)}
        maxLength={maxLength}
        value={value}
        className={error
           && touched ? `App__input App__input-error` : `App__input`}
        onChange={event => onChangeInput(event.target.value, field)}
        onBlur={event => handleValidate(event.target.value, field)}
      />
      {error && touched
      && <div className="error__container">{`Please enter the ${field}`}</div>}
    </>
  );
};

MovieInput.propTypes = MovieInputShape.isRequired;
