import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string,
  value: string,
  label?: string,
  required?: boolean,
  onChange?: (newValue: string) => void,
  onValidation?: (item: string) => boolean,
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
  onValidation,
}) => {
  // generage a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  // To show errors only if the field was touched (onBlur)
  const [touched, setToched] = useState(false);
  const [valid, setValid] = useState(true);
  const hasError = touched && required && !value;
  const invalid = value && !valid;
  const handleOnBlur = () => {
    setToched(true);

    if (onValidation) {
      const itemToValidate = onValidation(value);

      setValid(itemToValidate);
    }
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
            'is-danger': hasError,
          })}
          type="text"
          placeholder={`Enter ${label}`}
          value={value}
          onChange={event => onChange(event.target.value)}
          onBlur={handleOnBlur}
        />
      </div>

      {invalid && (
        <p className="help is-danger">{`${label} is invalid`}</p>
      )}

      {hasError && (
        <p className="help is-danger">{`${label} is required`}</p>
      )}
    </div>
  );
};
