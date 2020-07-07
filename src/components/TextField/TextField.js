import React from 'react';
import { TextFieldShape } from '../Shape';

export const TextField = (props) => {
  const {
    name,
    value,
    error,
    onChange,
    onBlur,
  } = props;

  return (
    <p>
      <input
        className={error ? 'error__border' : ''}
        name={name}
        value={value}
        placeholder={`Please, enter ${name}`}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error
        ? (
          <p className="error__text">
            {`Please, enter correct ${name}`}
          </p>
        )
        : ''}
    </p>
  );
};

TextField.propTypes = TextFieldShape;
