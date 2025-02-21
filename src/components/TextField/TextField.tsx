import React from 'react';
import classNames from 'classnames';

type Props = {
  name: string;
  value: string;
  defaultValue?: string; // Adding defaultValue prop
  label?: string;
  placeholder?: string;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
};

export const TextField: React.FC<Props> = ({
  name,
  value,
  defaultValue = '', // Set defaultValue as an empty string if not provided
  label = name,
  placeholder = `Enter ${label}`,
  required = false,
  onChange,
  onBlur,
  error,
}) => {
  const id = `input-${name}`;
  const hasError = !!error;

  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {label}
      </label>
      <div className="control">
        <input
          type="text"
          id={id}
          name={name}
          data-cy={`movie-${name}`}
          className={classNames('input', { 'is-danger': hasError })}
          placeholder={placeholder}
          value={value} // Controlled value
          defaultValue={defaultValue} // Default value when first rendered
          onChange={onChange}
          onBlur={onBlur}
          required={required}
        />
      </div>
      {error && <p className="help is-danger">{error}</p>}
    </div>
  );
};
