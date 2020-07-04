import React from 'react';

export const NewMovieInput = (props) => {
  const { name, value, handleInput } = props;

  return (
    <label>
      <input
        type="text"
        defaultValue={value}
        name={name}
        onBlur={event => handleInput(event)}
        placeholder={name}
        className="w-100 p-2 form-control" //  "is-invalid" class for error
      />
    </label>
  );
};
