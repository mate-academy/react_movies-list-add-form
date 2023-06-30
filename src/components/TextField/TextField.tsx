import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string,
  value: string,
  label?: string,
  placeholder?: string,
  required?: boolean,
  onChange?: (newValue: string) => void,
};

function getRandomDigits() {
  return Math.random()
    .toFixed(16)
    .slice(2);
}

// eslint-disable-next-line max-len
const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

export const TextField: React.FC<Props> = ({
  name,
  value,
  label = name,
  placeholder = `Enter ${label}`,
  required = false,
  onChange = () => {},
}) => {
  // generage a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);
  const [fieldErrorMessage, setFieldErrorMessage] = useState('');

  const validateTextField = (fieldData: string, isUrl = false): void => {
    if (isUrl && !fieldData.match(pattern) && fieldData) {
      setFieldErrorMessage('Please insert correct url');

      return;
    }

    switch (true) {
      case !fieldData:
        setFieldErrorMessage(`${label} is required`);
        break;
      case (fieldData.length < 3) && !isUrl:
        setFieldErrorMessage(`${label} requires min 2 characters`);
        break;
      default:
        setFieldErrorMessage('');
    }
  };

  const hasError = required && fieldErrorMessage;

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
          onBlur={(event) => validateTextField(
            event.target.value,
            label.toLowerCase().includes('url'),
          )}
        />
      </div>

      {hasError && (
        <p className="help is-danger">{fieldErrorMessage}</p>
      )}
    </div>
  );
};
