import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string,
  value: string,
  label?: string,
  required?: boolean,
  onChange: (name: string, newValue: string) => void,
  isValid?: (item: string) => boolean,
};

function getRandomDigits() {
  return Math.random().toString().slice(2);
}

export const TextField: React.FC<Props> = ({
  name,
  value,
  label = name,
  required = false,
  onChange = () => { },
  isValid,
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  const [touched, setToched] = useState(false);
  const [valid, setValid] = useState(true);
  const notValid = value && !valid;
  const hasError = touched && required && !value;
  const handleOnBlur = () => {
    setToched(true);

    if (isValid) {
      const itemToValid = isValid(value);

      setValid(itemToValid);
    }
  };

  return (
    <div className="field">
      <label
        className="label"
        htmlFor={id}
      >
        {label}
      </label>

      <div className="control">
        <input
          id={id}
          name={name}
          data-cy={`movie-${name}`}
          className={classNames('input', {
            'is-danger': hasError || notValid,
          })}
          type="text"
          placeholder={`Enter ${label}`}
          value={value}
          onChange={event => onChange(event.target.name, event.target.value)}
          onBlur={handleOnBlur}
        />
      </div>

      {notValid && (
        <p className="help is-danger">{`${label} is not valid`}</p>
      )}

      {hasError && (
        <p className="help is-danger">{`${label} is required`}</p>
      )}
    </div>
  );
};
