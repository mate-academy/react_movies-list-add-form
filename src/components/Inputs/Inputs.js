import React from 'react';
import { Input } from '../Input';

export const Inputs = ({ state, changeHandler }) => (
  Object.entries(state).map(([name, value]) =>
    <Input
      name={name}
      value={value}
      changeHandler={changeHandler}
    />)
)
