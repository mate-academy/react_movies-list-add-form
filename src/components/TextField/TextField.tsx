import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string;
  value: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (newValue: string) => void;
  onBlur?: () => void;
};

export const TextField: React.FC<Props> = ({
  name,
  value,
  label,
  placeholder = `Enter ${label}`,
  required = false,
  onChange = () => {},
  onBlur = () => {},
}) => {
  const [hasError, setHasError] = useState(false); // Видалили 'touched', якщо він не використовується

  const handleBlur = () => {
    if (required && !value.trim()) {
      setHasError(true);
    } else {
      setHasError(false);
    }

    onBlur();
  };

  return (
    <div className="field">
      <label className="label" htmlFor={name}>
        {label}
      </label>
      <div className="control">
        <input
          type="text"
          id={name}
          className={classNames('input', { 'is-danger': hasError })}
          placeholder={placeholder}
          value={value}
          onChange={event => onChange(event.target.value)}
          onBlur={handleBlur}
        />
        {hasError && <p className="help is-danger">{`${label} is required`}</p>}
      </div>
    </div>
  );
};
