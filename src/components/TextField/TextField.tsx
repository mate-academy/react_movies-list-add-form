import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string;
  value: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (newValue: string) => void;
  imgUrlError?: boolean;
  imdbUrlError?: boolean;
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
  imgUrlError = false,
  imdbUrlError = false,
}) => {
  // generate a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  // To show errors only if the field was touched (onBlur)
  const [touched, setTouched] = useState(false);
  const hasError = touched && required && !value;

  let errorMessage = '';

  if (imgUrlError) {
    errorMessage = 'Invalid Image Url';
  } else if (imdbUrlError) {
    errorMessage = 'Invalid Imdb Url';
  } else if (hasError) {
    errorMessage = `${label} is required`;
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
            'is-danger': hasError || imgUrlError || imdbUrlError,
          })}
          placeholder={placeholder}
          value={value}
          onChange={event => onChange(event.target.value.trimStart())}
          onBlur={() => setTouched(true)}
        />
      </div>

      {(hasError || imgUrlError || imdbUrlError) && (
        <p className="help is-danger">{errorMessage}</p>
      )}
    </div>
  );
};
