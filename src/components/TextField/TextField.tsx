import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string;
  value: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (newValue: string) => void;
  onBlur?: () => void;
  validate?: (value: string) => boolean; // додана опція валідації
};

export const TextField: React.FC<Props> = ({
  name,
  value,
  label = name,
  placeholder = `Enter ${label}`,
  required = false,
  onChange = () => {},
  onBlur = () => {},
  validate,
}) => {
  const [touched, setTouched] = useState(false);
  const hasError =
    touched && required && (!value || (validate && !validate(value)));

  return (
    <div className="field">
      <label className="label" htmlFor={name}>
        {label}
      </label>

      <div className="control">
        <input
          type="text"
          id={name}
          data-cy={`movie-${name}`}
          className={classNames('input', { 'is-danger': hasError })}
          placeholder={placeholder}
          value={value}
          onChange={event => onChange(event.target.value)}
          onBlur={() => {
            setTouched(true);
            onBlur();
          }}
        />
      </div>

      {hasError && <p className="help is-danger">{`${label} is required`}</p>}
    </div>
  );
};
