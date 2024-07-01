import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string;
  value: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (newValue: string) => void;
  id?: string;
};
// id generator due to date
const generateUniqueId = () => Date.now().toString();

export const TextField: React.FC<Props> = ({
  name,
  value,
  label = name,
  placeholder = `Enter ${label}`,
  required = false,
  onChange = () => {},
  id,
}) => {
  const [generatedId] = useState(() => `${name}-${generateUniqueId()}`);
  const inputId = id || generatedId;

  const [touched, setTouched] = useState(false);
  const hasError = touched && required && !value;

  return (
    <div className="field">
      <label className="label" htmlFor={inputId}>
        {label}
      </label>
      <div className="control">
        <input
          type="text"
          id={inputId}
          data-cy={`movie-${name}`}
          className={classNames('input', {
            'is-danger': hasError,
          })}
          placeholder={placeholder}
          value={value}
          onChange={event => onChange(event.target.value)}
          onBlur={() => setTouched(true)}
        />
      </div>
      {hasError && <p className="help is-danger">{`${label} is required`}</p>}
    </div>
  );
};
