import React from 'react';

interface TextFieldProps {
  name: string;
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  error?: string;
  required?: boolean;
}

export const TextField: React.FC<TextFieldProps> = ({
  name,
  label,
  value,
  onChange,
  onBlur,
  error,
  required,
}) => (
  <div className="field">
    <label className="label" htmlFor={name}>
      {label}
    </label>
    <div className="control">
      <input
        id={name}
        name={name}
        type="text"
        className={`input ${error ? 'is-danger' : ''}`}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
      />
    </div>
    {error && <p className="help is-danger">{error}</p>}
  </div>
);
