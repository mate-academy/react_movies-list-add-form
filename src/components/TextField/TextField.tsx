import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string;
  value: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (newValue: string) => void;
  validator?: (value: string, pattern: RegExp) => boolean;
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
  validator = () => 'is required',
}) => {
  // generage a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  const pattern =
    // eslint-disable-next-line max-len
    /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;
  const baseErrorMsg = 'is required';
  const inputErrorMsg = 'contains a mistake';

  // To show errors only if the field was touched (onBlur)
  const [touched, setTouched] = useState(false);
  const [errorMessage, setErrorMessage] = useState(baseErrorMsg);
  const [isValid, setIsValid] = useState(false);

  const hasError = touched && required && (!value || (value && !isValid));

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
          onBlur={() => {
            setTouched(true);

            if (validator) {
              const isOk = validator(value, pattern);

              if (!isOk && value !== '') {
                setErrorMessage(inputErrorMsg);
                setIsValid(false);
              }

              if (isOk) {
                setErrorMessage(baseErrorMsg);
                setIsValid(true);
              }
            }
          }}
        />
      </div>

      {hasError && (
        <p className="help is-danger">{`${label} ${errorMessage}`}</p>
      )}
    </div>
  );
};
