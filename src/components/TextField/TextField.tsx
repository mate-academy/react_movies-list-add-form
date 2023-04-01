import classNames from 'classnames';
import React, { ChangeEvent, useState } from 'react';

type Props = {
  name: string,
  value: string,
  label?: string,
  required?: boolean,
  onChange?: (newValue: string, inputName: string) => void,
  validation?: boolean,
};

function getRandomDigits() {
  return Math.random().toString().slice(2);
}

export const TextField: React.FC<Props> = ({
  name,
  value,
  label = name,
  required = false,
  onChange = () => {},
  validation,
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  const [touched, setTouched] = useState(false);
  const hasError = touched && required && !value;
  const hasValidationError = validation === false;
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value, name);
  };

  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {label}
      </label>

      <div className="control">
        <input
          id={id}
          data-cy={`movie-${name}`}
          className={classNames('input', {
            'is-danger': hasError || hasValidationError,
          })}
          type="text"
          placeholder={`Enter ${label}`}
          value={value}
          onChange={handleChange}
          onBlur={() => setTouched(true)}
        />
      </div>

      {(hasError || hasValidationError) && (
        <p className="help is-danger">{`${label} is required`}</p>
      )}
    </div>
  );
};
