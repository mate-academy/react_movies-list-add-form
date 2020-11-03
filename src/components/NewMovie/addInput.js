import React from 'react';

export const AddInput = ({ state, onChange }) => {
  return (
    Object.entries(state).map(([name, value]) => {
      return (
        <div key={name} className="movie-form">
          <label htmlFor={name}>
            {name}
          </label>
          <input
            id={name}
            required={(name !== 'description')}
            value={value}
            onChange={event => onChange(event, name)}
          />
        </div>
      );
    })
  );
};
