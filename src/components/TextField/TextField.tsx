import React from 'react';

interface TextFieldProps {
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  required?: boolean;
  error?: string;
}

export const TextField: React.FC<TextFieldProps> = ({
  name,
  label,
  value,
  onChange,
  onBlur,
  required,
  error,
}) => {
  return (
    <div className={`field ${error ? 'is-danger' : ''}`}>
      <label className="label">{label}</label>
      <div className="control">
        <input
          className={`input ${error ? 'is-danger' : ''}`}
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          required={required}
        />
      </div>
      {error && <p className="help is-danger">{error}</p>}
    </div>
  );
};
