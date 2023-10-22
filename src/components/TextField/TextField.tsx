import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string;
  value: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (newValue: React.ChangeEvent<HTMLInputElement>) => void;
  checkIsValid?: (isValid: boolean) => void;
};

function getRandomDigits() {
  return Math.random().toFixed(16).slice(2);
}

export const TextField: React.FC<Props> = ({
  name,
  value = '',
  label = name,
  placeholder = `Enter ${label}`,
  required = false,
  onChange = () => {},
  checkIsValid = () => {},
}) => {
  // generage a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  // To show errors only if the field was touched (onBlur)

  const [touched, setTouched] = useState(false);
  const hasError = touched && required && !value;
  /* eslint-disable */
  const pattern =
    /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;
  const isInvalidEmail = Boolean(
    (name === "imdbUrl" || name === "imgUrl") && value && !value.match(pattern)
  );
  /* eslint-enable */

  const validateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (name === 'imdbUrl' || name === 'imgUrl') {
      checkIsValid(isInvalidEmail);
    } else {
      checkIsValid(false);
    }

    onChange(event);
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
            'is-danger': hasError || isInvalidEmail,
          })}
          placeholder={placeholder}
          value={value}
          onChange={validateChange}
          onBlur={() => setTouched(true)}
        />
      </div>

      {hasError && <p className="help is-danger">{`${label} is required`}</p>}

      {isInvalidEmail && <p className="help is-danger">Email is invalid</p>}
    </div>
  );
};
