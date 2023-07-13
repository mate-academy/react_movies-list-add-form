import classNames from 'classnames';
import React, { useState } from 'react';
import { checkIsValidUrl } from '../../services/checkIsValidUrl';

type Props = {
  name: string,
  value: string,
  label?: string,
  placeholder?: string,
  required?: boolean,
  onChange?: React.ChangeEventHandler,
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
  onChange = () => { },
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  const [touched, setTouched] = useState(false);
  const [hasUrlError, setHasUrlError] = useState(false);
  const hasError = touched && required && !value;

  const handleFieldBlur = () => {
    if (name === 'imgUrl' || name === 'imdbUrl') {
      const isValidUrl = checkIsValidUrl(value);

      setHasUrlError(!isValidUrl);
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
            'is-danger': hasError,
          })}
          placeholder={placeholder}
          value={value}
          name={name}
          onChange={onChange}
          onBlur={() => handleFieldBlur}
        />
      </div>

      {!hasUrlError && hasError && (
        <p className="help is-danger">{`${label} is required`}</p>
      )}
    </div>
  );
};
