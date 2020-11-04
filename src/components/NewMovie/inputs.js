import React from 'react';
import { Input } from './input';

export const Inputs = ({ state, onChange }) => {
  return (
    Object.entries(state).map(([name, value]) => {
      return (
        <Input
          key={name}
          name={name}
          value={value}
          onChange={onChange}
        />
      );
    })
  );
};
