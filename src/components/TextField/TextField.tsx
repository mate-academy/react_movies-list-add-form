import classNames from 'classnames';
import React, { useState } from 'react';
import { urlIsValid } from '../../services/urlCheck';

type Props = {
  name: string,
  value: string,
  label?: string,
  placeholder?: string,
  required?: boolean,
  onChange?: (value: string, name: string) => void,
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
  required = true,
  onChange = () => {},
}) => {
  // generage a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  // To show errors only if the field was touched (onBlur)
  const [touched, setTouched] = useState(false);
  let hasError = touched && required && value.trim() === '';

  if (name === 'imgUrl' || name === 'imdbUrl') {
    hasError = touched && required && !urlIsValid(value);
  }

  const handleTouch = () => {
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
            'is-danger': hasError,
          })}
          placeholder={placeholder}
          value={value}
          onChange={event => onChange(event.target.value, name)}
          onBlur={handleTouch}
        />
      </div>

      {hasError && (
        ((name === 'imgUrl' || name === 'imdbUrl')
        && (!urlIsValid(value) && value.trim() !== '')
        )
          ? (<p className="help is-danger">{`${label} is not a valid URL`}</p>)
          : (<p className="help is-danger">{`${label} is required`}</p>)
      )}
    </div>
  );
};
