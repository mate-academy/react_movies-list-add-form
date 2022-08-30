import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string,
  value: string,
  label?: string,
  required?: boolean,
  pattern?: (url: string) => boolean;
  onChange?: (newValue: string) => void,
};

function getRandomDigits() {
  return Math.random().toString().slice(2);
}

export const TextField: React.FC<Props> = ({
  name,
  value,
  label = name,
  required = false,
  pattern = () => {},
  onChange = () => {},
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  const [touched, setToched] = useState(false);
  const [urlError, setUrlError] = useState(false);

  const hasError = touched && required && !value;

  const onBlur = () => {
    let error = hasError;

    if (name === 'imgUrl' || name === 'imdbUrl') {
      error = error || !pattern(value);

      setUrlError(error);
    }

    setToched(true);
  };

  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {label}
      </label>

      <div className="control">
        <input
          id={id}
          data-cy={`movie-${name}`}
          className={classNames('input', {
            'is-danger': hasError,
          })}
          type="text"
          placeholder={`Enter ${label}`}
          value={value}
          onChange={event => onChange(event.target.value)}
          onBlur={() => onBlur()}
        />
      </div>

      {hasError && (
        <p className="help is-danger">
          {`${label} is required`}
        </p>
      )}

      {urlError && (
        <p className="help is-danger">
          Please enter valid URL link
        </p>
      )}
    </div>
  );
};
