import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string,
  value: string,
  label?: string,
  placeholder?: string,
  required?: boolean,
  onChange?: (newValue: string) => void,
  pattern?: RegExp
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
  pattern = null,
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  const checkUrl = pattern ? pattern.test(value) : true;
  const [touched, setTouched] = useState(false);
  const hasError = touched && required && !value && !pattern;
  const hasErrorUrl = touched && required && pattern && !checkUrl;

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
            'is-danger': hasError || hasErrorUrl,
          })}
          placeholder={placeholder}
          value={value}
          onChange={event => onChange(event.target.value)}
          onBlur={() => setTouched(true)}
        />
      </div>

      {(hasError || hasErrorUrl) && (
        <p className="help is-danger">{`${label} is required`}</p>
      )}
    </div>
  );
};
