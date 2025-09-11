import React, { useState } from 'react';
import classNames from 'classnames';

type Props = {
  name: string;
  value: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  onChange: (value: string) => void;
};

  
export const TextField: React.FC<Props> = ({
  name,
  value,
  label = name,
  placeholder = `Enter ${label}`,
  required = false,
  onChange,
}) => {
  
  const [touched, setTouched] = useState(false);

  const handleBlur = () => {
    onChange(value.trim());
    setTouched(true);
  };

  const hasError = required && touched && value.trim() === '';

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
          onChange={e => onChange(e.target.value)}
          onBlur={handleBlur}
        />
      </div>

      {hasError && <p className="help is-danger">{`${label} is required`}</p>}
    </div>
  );
};
