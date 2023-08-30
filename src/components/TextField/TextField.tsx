import classNames from 'classnames';
import React, { useEffect, useState } from 'react';

type Props = {
  name: string,
  value: string,
  label?: string,
  placeholder?: string,
  required?: boolean,
  onChange?: (newValue: string) => void,
  validateNoExtraWhitespace?: boolean;
  validateUrl?: boolean;
  setIsValid?: (isValid: boolean) => void;
};

function getRandomDigits() {
  return Math.random()
    .toFixed(16)
    .slice(2);
}

const pattern = new RegExp(
  '^((([A-Za-z]{3,9}:(?:\\/\\/)?)(?:[-;:&=+$,\\w]+@)?[A-Za-z0-9.-]+|'
  + '(?:www\\.|[-;:&=+$,\\w]+@)[A-Za-z0-9.-]+)'
  + '((?:\\/[+~%/.\\w-_]*)?\\??(?:[-+=&;%@,.\\w_]*)#?(?:[,.!/\\\\\\w]*))?)$',
);

export const TextField: React.FC<Props> = ({
  name,
  value,
  label = name,
  placeholder = `Enter ${label}`,
  required = false,
  onChange = () => {},
  validateNoExtraWhitespace = false,
  validateUrl = false,
  setIsValid,
}) => {
  // generage a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  // To show errors only if the field was touched (onBlur)
  const [touched, setTouched] = useState(false);
  const hasError = touched && required && !value;

  const isValidNoExtraWhitespace = (
    str: string,
  ) => (!/^[\s]+$/.test(str) && !/^\s+/.test(str));

  const hasWhitespaceValidationError
  = validateNoExtraWhitespace && !isValidNoExtraWhitespace(value);

  const isValidUrl = (evaluationValue: string) => pattern.test(evaluationValue);
  const hasValidationError = touched && validateUrl && !isValidUrl(value);

  useEffect(() => {
    if (setIsValid) {
      setIsValid(!hasValidationError && (
        !required || (required && value.trim() !== '')
      ));
    }
  }, [value, touched]);

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
            'is-danger': hasError || (touched && !isValidUrl),
          })}
          placeholder={placeholder}
          value={value}
          onChange={event => onChange(event.target.value)}
          onBlur={() => setTouched(true)}
        />
      </div>

      {hasError && (
        <p className="help is-danger">{`${label} is required`}</p>
      )}
      {hasValidationError && (
        <p className="help is-danger">{`${label} must be a valid URL`}</p>
      )}
      {hasWhitespaceValidationError && (
        <p className="help is-danger">{`${label} should not contain leading/trailing/multiple spaces.`}</p>
      )}
    </div>
  );
};
