import classNames from 'classnames';
import React, { useState } from 'react';
import { Movie } from '../../types/Movie';
import { urlRegex } from '../NewMovie';

type Props = {
  name: string;
  value: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (field: keyof Movie, newValue: string) => void;
  setError?: (error: string) => void;
  error?: string;
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
  setError = () => {},
  error = false,
}) => {
  // generate a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  // To show errors only if the field was touched (onBlur)
  const [touched, setTouched] = useState(false);

  const hasError = touched && required && error;

  const handleOnBlur = (
    event: React.FocusEvent<HTMLInputElement, Element>,
  ): void => {
    setTouched(true);
    const newValue = event.target.value;

    if (!newValue) {
      setError(`${label} is required`);
    } else {
      if (['imgUrl', 'imdbUrl'].includes(name) && !urlRegex.test(newValue)) {
        setError(`Enter valid url`);
      }
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
          onChange={event => onChange(name as keyof Movie, event.target.value)}
          onBlur={handleOnBlur}
        />
      </div>

      {hasError && <p className="help is-danger">{error}</p>}
    </div>
  );
};
