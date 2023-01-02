import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string,
  value: string,
  label?: string,
  required?: boolean,
  validation?: boolean,
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
};

function getRandomDigits() {
  return Math.random().toString().slice(2);
}

// eslint-disable-next-line max-len
export const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

export const TextField: React.FC<Props> = ({
  name,
  value,
  label = name,
  required = false,
  onChange = () => {},
  validation = false,

}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  const [touched, setToched] = useState(false);

  const [patternError, setPatternError] = useState('');
  const hasError = touched && required && !value;
  const needValidation = patternError !== '' && validation;

  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {label}
      </label>

      <div className="control">
        <input
          name={name}
          id={id}
          data-cy={`movie-${name}`}
          className={classNames('input', {
            'is-danger': hasError || needValidation,

          })}
          type="text"
          placeholder={`Enter ${label}`}
          value={value}
          onChange={event => onChange(event)}
          onBlur={() => {
            setToched(true);
            setPatternError(!pattern.test(value) ? 'Data is not correct' : '');
          }}
        />
      </div>

      {hasError && (
        <p className="help is-danger">{`${label} is required`}</p>
      )}

      {(needValidation && !hasError) && (
        <p className="help is-danger">{patternError}</p>
      )}
    </div>
  );
};
