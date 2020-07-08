import React from 'react';
import { MovieInputShape } from '../Shapes/MovieInputShape';
import { changeFieldHolder } from '../Helpers/changeFieldHolder';

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

  const inputName = error
  && touched ? `App__input App__input-error` : `App__input`;

  return (
    <>
      <input
        type="text"
        placeholder={changeFieldHolder(field)}
        maxLength={maxLength}
        value={value}
        className={inputName}
        onChange={event => onChangeInput(event.target.value, field)}
        onBlur={event => handleValidate(event.target.value, field)}
      />
      {error && touched
      && <div className="error__container">{`Please enter the ${field}`}</div>}
    </>
  );
};

MovieInput.propTypes = MovieInputShape.isRequired;
