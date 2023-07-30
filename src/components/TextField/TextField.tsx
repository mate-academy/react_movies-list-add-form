import classNames from 'classnames';
import React, { useState } from 'react';
import { pattern } from '../../utils';

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
  const thisIsUrl = name === 'imdbUrl' || name === 'imgUrl';
  const [touched, setTouched] = useState(false);
  const hasError = touched && required && !value.trim();
  const hasErrorRegex = touched
    && required && !value.match(pattern) && value.trim() && thisIsUrl;
  const onBlurHandler = () => {
    setTouched(true);
  };

  const urlHasError = thisIsUrl && hasErrorRegex;

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
          onChange={event => onChange(event.target.value)}
          onBlur={onBlurHandler}
        />
      </div>
      {(hasError || hasErrorRegex) && (<p className="help is-danger">{urlHasError ? `${label} is invalid` : `${label} is required`}</p>)}
    </div>
  );
};
