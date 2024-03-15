import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string;
  value: string;
  label?: string;
  placeholder?: string;
  hasError?: boolean;
  onChange?: (newValue: string, name: string) => void;
};

function getRandomDigits() {
  return Math.random().toFixed(16).slice(2);
}

export const TextField: React.FC<Props> = ({
  name,
  value,
  label = name,
  placeholder = `Enter ${label}`,
  hasError = false,
  onChange = () => {},
}) => {
  // generage a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  // To show errors only if the field was touched (onBlur)
  const [touched, setTouched] = useState(false);
  const isErrorShown = touched && hasError;

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
            'is-danger': isErrorShown,
          })}
          placeholder={placeholder}
          value={value}
          onChange={event => onChange(event.target.value, name)}
          onBlur={() => setTouched(true)}
        />
      </div>

      {isErrorShown && (
        <p className="help is-danger">{`${label} is invalid`}</p>
      )}
    </div>
  );
};
