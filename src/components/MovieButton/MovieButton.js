import React from 'react';
import { InputsInformationShape } from '../Shapes/InputsInformationShape';

export const MovieButton = ({ errors }) => {
  const inputsAmount = Array
    .from(Object.values(errors))
    .some(error => error === true);

  return (
    <button
      type="submit"
      className="App__button"
      disabled={inputsAmount}
    >
      Add a movie
    </button>
  );
};

MovieButton.propTypes = InputsInformationShape.isRequired;
