import React from 'react';
import { InputsInformationShape } from '../Shapes/InputsInformationShape';
import { validateForm } from '../Helpers/validateForm';
import { urlValidator } from '../Helpers/urlValidator';

export const MovieButton = ({ inputs }) => {
  const buttonOpacity = validateForm(inputs, urlValidator)
    ? { opacity: 0.5 }
    : { opacity: 1 };

  return (
    <button
      type="submit"
      className="App__button"
      disabled={validateForm(inputs, urlValidator)}
      style={buttonOpacity}
    >
      Add a movie
    </button>
  );
};

MovieButton.propTypes = InputsInformationShape.isRequired;
