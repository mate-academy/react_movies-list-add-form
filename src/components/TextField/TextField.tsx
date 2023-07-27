import classNames from 'classnames';
import React, { useState } from 'react';
import { pattern } from '../../constants/pattern';

type Props = {
  name: string,
  value: string,
  label?: string,
  placeholder?: string,
  required?: boolean,
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
};

function getRandomDigits() {
  return Math.random()
    .toFixed(16)
    .slice(2);
}

export const TextField: React.FC<Props> = ({
  name,
  value,
  label = name,
  placeholder = `Enter ${label}`,
  required = false,
  onChange = () => {},
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  const [touched, setTouched] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const hasError = touched && required && !value;

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event);
    setErrorMessage('');
  };

  const handleOnBlur = () => {
    if (value === '' && name !== 'description') {
      setErrorMessage(`${label} is required`);
    }

    if ((name === 'imgUrl' && !value.match(pattern) && value !== '')
    || (name === 'imdbUrl' && !value.match(pattern) && value !== '')) {
      setErrorMessage(`${label} is not a valid URL`);
    }

    setTouched(true);
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
            'is-danger': hasError || errorMessage,
          })}
          placeholder={placeholder}
          value={value}
          onChange={handleOnChange}
          onBlur={handleOnBlur}
        />
      </div>

      {(hasError || errorMessage) && (
        <p className="help is-danger">{errorMessage}</p>
      )}
    </div>
  );
};
