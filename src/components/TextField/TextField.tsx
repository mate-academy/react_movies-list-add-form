import React, { useState } from 'react';

interface TextFieldProps {
  name?: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  validate?: (value: string) => string | null;
  [key: string]: unknown;
}

export const TextField: React.FC<TextFieldProps> = ({
  name,
  label,
  value,
  onChange,
  required = false,
  validate,
  ...rest
}) => {
  const [error, setError] = useState('');
  const [touched, setTouched] = useState(false);

  const validateField = () => {
    let errorMessage = '';

    if (required && !value.trim()) {
      errorMessage = `${label} is required`;
    } else if (validate) {
      const validationError = validate(value.trim());

      if (validationError) {
        errorMessage = validationError;
      }
    }

    setError(errorMessage);
  };

  const handleBlur = () => {
    setTouched(true);
    validateField();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);

    if (touched) {
      validateField();
    }
  };

  return (
    <div className="field">
      <label className="label">{label}</label>

      <div className="control">
        <input
          {...rest}
          name={name}
          className={`input ${error ? 'is-danger' : ''}`}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>

      {error && <p className="help is-danger">{error}</p>}
    </div>
  );
};
