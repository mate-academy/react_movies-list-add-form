import React from 'react';
import { InputsInformationShape } from '../Shapes/InputsInformationShape';
import { ButtonSecurity } from '../Helpers/ButtonSecurity';

export const MovieButton = ({ inputs, regex }) => (
  <button
    type="submit"
    className="App__button"
    disabled={ButtonSecurity(inputs, regex)}
    style={ButtonSecurity(inputs, regex) ? { opacity: 0.5 } : { opacity: 1 }}
  >
    Add a movie
  </button>
);

MovieButton.propTypes = InputsInformationShape.isRequired;
