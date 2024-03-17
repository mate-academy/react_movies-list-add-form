import classNames from 'classnames';
import React, { useState } from 'react';
import { patternRegular, patternURL } from '../../constants';

type Props = {
  name: string;
  value: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (newValue: string) => void;
  pattern?: RegExp;
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
  pattern = patternRegular,
}) => {
  // generage a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  // To show errors only if the field was touched (onBlur)
  const [touched, setTouched] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (required && !value) {
      setErrorMessage(`${label} is required`);
    } else if (!e.target.value.match(pattern)) {
      switch (pattern) {
        case patternURL:
          setErrorMessage('URL is not valid');
          break;

        default:
          setErrorMessage('Special characters are not allowed');
      }
    } else {
      setErrorMessage('');
    }

    onChange(e.target.value);
  };

  const hasError = touched && errorMessage;

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
          onChange={handleChange}
          onBlur={() => setTouched(true)}
        />
      </div>
      {hasError && <p className="help is-danger">{errorMessage}</p>}
    </div>
  );
};
