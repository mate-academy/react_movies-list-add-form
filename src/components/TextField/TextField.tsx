import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string,
  value: string,
  label?: string,
  placeholder?: string,
  required?: boolean,
  onChange?: (newValue: string) => void,
  isUrl?: boolean,
  setIsLinkValid?: (isValid: boolean) => void;
};

function getRandomDigits() {
  return Math.random()
    .toFixed(16)
    .slice(2);
}

// eslint-disable-next-line max-len
const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;
const regexp = new RegExp(pattern);

export const TextField: React.FC<Props> = ({
  name,
  value,
  label = name,
  placeholder = `Enter ${label}`,
  required = false,
  onChange = () => {},
  isUrl = false,
  setIsLinkValid = () => {},
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  const [touched, setTouched] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const hasError = touched && required && (!value.trim() || errorMessage);

  const handleOnBlur = (valueStr: string) => {
    setTouched(true);

    if (!valueStr.trim()) {
      const error = `${label} is required!`;

      setErrorMessage(error);

      return;
    }

    if (!isUrl) {
      setErrorMessage('');

      return;
    }

    if (!regexp.test(valueStr)) {
      const error = `${label} is not valid url!`;

      setIsLinkValid(false);
      setErrorMessage(error);

      return;
    }

    setIsLinkValid(true);
    setErrorMessage('');
  };

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
          onChange={event => onChange(event.currentTarget.value)}
          onBlur={event => handleOnBlur(event.currentTarget.value)}
        />
      </div>

      {hasError && (
        <p className="help is-danger">{errorMessage}</p>
      )}
    </div>
  );
};
