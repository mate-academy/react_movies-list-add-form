import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string;
  value: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (newValue: string) => void;
  additionalValidations?: { (): string }[];
  message?: (fieldName: string) => string;
  disableButtonOnValidation?: (toDisable: boolean) => void;
};

function getRandomDigits() {
  return Math.random().toFixed(16).slice(2);
}

export const TextField: React.FC<Props> = ({
  name,
  value,
  label = name,
  placeholder = `Enter ${label}`,
  required = false,
  onChange = () => {},
  additionalValidations = null,
}) => {
  // generate a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  // To show errors only if the field was touched (onBlur)
  const [touched, setTouched] = useState(false);
  let hasError = touched && required && !value;
  let errorMessage = () => {
    return `${label} is required`;
  };

  if (!hasError && touched && required) {
    additionalValidations?.forEach(validate => {
      const message = validate();

      if (message && message.length > 0) {
        hasError = true;
        errorMessage = () => {
          return message;
        };
      }
    });
  }

  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {label}
      </label>

      <div className="control">
        <input
          type="text"
          id={id}
          data-cy={`movie-${name}`}
          className={classNames('input', {
            'is-danger': hasError,
          })}
          placeholder={placeholder}
          value={value}
          onChange={event => onChange(event.target.value)}
          onBlur={() => setTouched(true)}
        />
      </div>

      {hasError && <p className="help is-danger">{errorMessage()}</p>}
    </div>
  );
};
