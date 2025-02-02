import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string;
  value: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  isValid?: boolean;
  onChange?: (newValue: string) => void;
  onValidation?: (newValue: boolean) => void;
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
  isValid = true,
  onChange = () => {},
  onValidation = () => {},
}) => {
  // generate a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  // To show errors only if the field was touched (onBlur)
  const [touched, setTouched] = useState(false);
  const hasError = touched && required && !value;

  const pattern =
    // eslint-disable-next-line max-len
    /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

  const validateUrl = (url: string) => {
    if (name === 'imgUrl' || name === 'imdbUrl') {
      const validResult = pattern.test(url);

      onValidation?.(validResult);
    }
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
          onChange={event => {
            onChange(event.target.value);
            validateUrl(event.target.value);
          }}
          onBlur={event => {
            setTouched(true);
            validateUrl(event.target.value);
          }}
        />
      </div>

      {hasError && <p className="help is-danger">{`${label} is required`}</p>}
      {touched && !isValid && (
        <p className="help is-danger">{`${label} is not a valid URL`}</p>
      )}
    </div>
  );
};
