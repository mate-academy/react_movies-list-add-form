import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string,
  value: string,
  label?: string,
  placeholder?: string,
  required?: boolean,
  onChange?: (newValue: React.ChangeEvent<HTMLInputElement>) => void,
  validation?: (str: string) => boolean;
};

function getRandomDigits() {
  return Math.random()
    .toFixed(16)
    .slice(2);
}

export const TextField: React.FC<Props> = ({
  name,
  value,
  label = name,
  placeholder = `Enter ${label}`,
  required = false,
  onChange = () => {},
  validation,
}) => {
  // generage a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  // To show errors only if the field was touched (onBlur)
  const [touched, setTouched] = useState(false);
  const hasError = touched && required && !(value.trim());

  const [isValid, setIsValid] = useState(true);

  const handleBlur = () => {
    setTouched(true);
    setIsValid(true);

    if (validation && value !== '') {
      setIsValid(validation(value));
    }
  };

  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {label}
      </label>

      <div className="control">
        <input
          name={name}
          type="text"
          id={id}
          data-cy={`movie-${name}`}
          className={classNames('input', {
            'is-danger': hasError || !isValid,
          })}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={handleBlur}
        />
      </div>

      {hasError && isValid && (
        <p className="help is-danger">{`${label} is required`}</p>
      )}
      {!isValid && (
        <p className="help is-danger">Invalid URL</p>
      )}
    </div>
  );
};
