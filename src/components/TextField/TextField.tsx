import classNames from 'classnames';
import React, { useState } from 'react';
import { urlPattern } from '../utils/regex';

type Props = {
  name: string,
  value: string,
  label?: string,
  placeholder?: string,
  required?: boolean,
  onChange?: (newValue: string) => void,
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

  const hasError = touched && required && !value;
  const hasUrlFormatError = (name === 'imdbUrl' || name === 'imgUrl')
    && touched && value && !urlPattern.test(value);
  const hasTextFormatError = (name === 'title' || name === 'description'
    || name === 'imdbId') && touched && value && !value.trim();

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
            'is-danger': hasError || hasUrlFormatError,
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
      {(hasUrlFormatError || hasTextFormatError) && (
        <p className="help is-danger">{`${label} must be valid`}</p>
      )}
    </div>
  );
};
