import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string,
  value: string,
  label?: string,
  isValid?: boolean,
  required?: boolean,
  onChange?: (newValue: React.ChangeEvent<HTMLInputElement>) => void,
};

function getRandomDigits() {
  return Math.random().toString().slice(2);
}

export const TextField: React.FC<Props> = ({
  name,
  value,
  label = name,
  isValid = false,
  required = false,
  onChange = () => {},
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  const [touched, setToched] = useState(false);
  const hasError = touched && required && !value;
  const isValidUrl = (touched && isValid);

  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {label}
      </label>

      <div className="control">
        <input
          name={name}
          id={id}
          data-cy={`movie-${name}`}
          className={classNames('input', {
            'is-danger': hasError || isValidUrl,
          })}
          type="text"
          placeholder={`Enter ${label}`}
          value={value}
          onChange={onChange}
          onBlur={() => setToched(true)}
        />
      </div>

      {(hasError && (
        <p className="help is-danger">{`${label} is required`}</p>
      )) || (isValidUrl && (
        <p className="help is-danger">{`${label} is not valid`}</p>
      ))}
    </div>
  );
};
