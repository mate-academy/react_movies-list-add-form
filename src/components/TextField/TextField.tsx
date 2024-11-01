import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string;
  value: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (newValue: string) => void;
  onValid?: (isValid: boolean) => void;
};

function testPattern(text: string): boolean {
  const pattern = new RegExp(
    '^(' +
      '((([A-Za-z]{3,9}:(?:\\/\\/)?)(?:[-;:&=+$,\\w]+@)?' +
      '[A-Za-z0-9.-]+|(?:www\\.|[-;:&=+$,\\w]+@)[A-Za-z0-9.-]+)' +
      '((?:\\/[+~%/.\\w-_]*)?\\??(?:[-+=&;%@,.\\w_]*)#?' +
      '(?:[,.!/\\\\\\w]*))?)' +
      ')$',
    'i',
  );

  return pattern.test(text);
}

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
  onValid = () => {},
}) => {
  // generate a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);
  const [errorMessage, setErrorMessage] = useState('');
  // To show errors only if the field was touched (onBlur)

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    onChange(event.target.value);
    setErrorMessage('');
  }

  function validateValue() {
    if (!value && required) {
      return `${label} is required`;
    }

    if (name === 'imdbUrl' || name === 'imgUrl') {
      if (testPattern(value)) {
        onValid(true);
      } else {
        onValid(false);

        return `${label} is not valid`;
      }
    }

    return '';
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
            'is-danger': errorMessage,
          })}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onBlur={() => setErrorMessage(validateValue())}
        />
      </div>

      {errorMessage && <p className="help is-danger">{errorMessage}</p>}
    </div>
  );
};
