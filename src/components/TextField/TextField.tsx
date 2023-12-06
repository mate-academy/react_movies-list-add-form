import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string,
  value: string,
  label?: string,
  placeholder?: string,
  required?: boolean,
  onChange?: (newValue: React.ChangeEvent<HTMLInputElement>) => void,
  urlChecker?: { isUrlWrong: boolean,
    setIsUrlWrong: (newWalue: boolean) => void },
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
  urlChecker = null,
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);
  const [touched, setTouched] = useState(false);
  const hasError = touched && required && !value;

  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {label}
      </label>

      <div className="control">
        <input
          name={name}
          type="text"
          id={id}
          data-cy={`movie-${name}`}
          className={classNames('input', {
            'is-danger': hasError || (urlChecker?.isUrlWrong),
          })}
          placeholder={placeholder}
          value={value}
          onChange={event => onChange(event)}
          onBlur={() => setTouched(true)}
          onInput={() => urlChecker?.setIsUrlWrong(false)}
        />
      </div>

      {hasError && (
        <p className="help is-danger">{`${label} is required`}</p>
      )}
      {urlChecker?.isUrlWrong && (
        <p className="help is-danger">URL is incorrect</p>
      )}
    </div>
  );
};
