import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string,
  value: string,
  label?: string,
  required?: boolean,
  onChange?: (newValue: string) => void,
  pattern?: RegExp,
};

function getNewId(name: string) {
  const similarIds = Array.from<HTMLInputElement>(document
    .querySelectorAll('.input')).filter(input => input.id.startsWith(name))
    .map(input => +input.id.slice(name.length + 1));

  const maxId = similarIds.reduce((acc, curr) => Math.max(acc, curr), -1);

  return maxId + 1;
}

export const TextField: React.FC<Props> = ({
  name,
  value,
  label = name,
  required = false,
  onChange = () => {},
  pattern,
}) => {
  const [id] = useState(() => `${name}-${getNewId(name)}`);

  // To show errors only if the field was touched (onBlur)
  const [touched, setTouched] = useState(false);
  const error = touched && required && !value;

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
            'is-danger': error,
          })}
          type="text"
          placeholder={`Enter ${label}`}
          value={value}
          onChange={event => onChange(event.target.value)}
          onBlur={() => setTouched(true)}
        />
      </div>

      {error && (
        <p className="help is-danger">{`${label} is required`}</p>
      )}

      {!error && touched && pattern && !pattern.test(value) && (
        <p className="help is-danger">{`${label} does not match expected format`}</p>
      )}
    </div>
  );
};
