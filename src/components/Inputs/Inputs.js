import React from 'react';
import PropTypes from 'prop-types';
import { Input } from '../Input';

export const Inputs = ({ state, changeHandler }) => (
  Object.entries(state).map(([name, value]) => (
    <Input
      key={name}
      name={name}
      value={value}
      changeHandler={changeHandler}
    />
  ))
);

Inputs.propTypes = {
  state: PropTypes.objectOf(PropTypes.string).isRequired,
  changeHandler: PropTypes.func.isRequired,
};
