import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string,
  value: string,
  label?: string,
  required?: boolean,
  isValid?: boolean,
  onChange?: (newValue: string, verified: boolean) => void,
};

function getRandomDigits() {
  return Math.random().toString().slice(2);
}

export const TextField: React.FC<Props> = ({
  name,
  value,
  label = name,
  required = false,
  isValid = false,
  onChange = () => {},
}) => {
  // generage a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  // To show errors only if the field was touched (onBlur)
  const [touched, setToched] = useState(false);
  const [verified, setVerified] = useState(false);
  const hasInvalidUrl = touched && isValid && !verified;
  const hasError = touched && required && !value;
  let fieldVerified = false;

  const inputValidation = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    // eslint-disable-next-line max-len
    const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

    if (name === 'imgUrl' || name === 'imdbUrl') {
      if (pattern.test(newValue)) {
        fieldVerified = true;
      } else {
        fieldVerified = false;
      }
    }

    setVerified(fieldVerified);

    return onChange(event.target.value, fieldVerified);
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
            'is-danger': hasError || hasInvalidUrl,
          })}
          type="text"
          placeholder={`Enter ${label}`}
          value={value}
          onChange={event => inputValidation(event)}
          onBlur={() => setToched(true)}
        />
      </div>

      {(hasError || hasInvalidUrl) && (
        <p className="help is-danger">
          {`${label} is ${hasError ? 'required' : 'invalid'}`}
        </p>
      )}
    </div>
  );
};
