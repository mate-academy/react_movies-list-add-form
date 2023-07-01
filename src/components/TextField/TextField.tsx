import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string,
  value: string,
  label?: string,
  placeholder?: string,
  required?: boolean,
  onChangeCallback?: (newValue: string, hasError: boolean) => void,
};

function getRandomDigits() {
  return Math.random()
    .toFixed(16)
    .slice(2);
}

function validateFormField(
  label: string,
  fieldData: string,
  isUrl: boolean,
): string {
  // eslint-disable-next-line max-len
  const patternUrl = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

  if (fieldData && isUrl && !fieldData.match(patternUrl)) {
    return 'Please insert correct url';
  }

  switch (true) {
    case !fieldData:
      return `${label} is required`;
    case (fieldData.length < 3) && !isUrl:
      return `${label} requires min 3 characters`;
    default:
      return '';
  }
}

export const TextField: React.FC<Props> = ({
  name,
  value,
  label = name,
  placeholder = `Enter ${label}`,
  required = false,
  onChangeCallback = () => {},
}) => {
  // generage a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);
  const [fieldErrorMessage, setFieldErrorMessage] = useState('');
  const handlerInputChange
    = (event: React.ChangeEvent<HTMLInputElement>): void => {
      const fieldErrorText = validateFormField(
        label,
        event.target.value,
        label.toLowerCase().includes('url'),
      );

      setFieldErrorMessage(fieldErrorText);
      onChangeCallback(event.target.value, !!fieldErrorText);
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
          onChange={(event) => onChangeCallback(event.target.value, false)}
          onBlur={(event) => handlerInputChange(event)}
        />
      </div>

      {hasError && (
        <p className="help is-danger">{fieldErrorMessage}</p>
      )}
    </div>
  );
};
