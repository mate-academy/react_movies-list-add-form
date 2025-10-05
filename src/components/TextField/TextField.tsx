import React from 'react';
import classNames from 'classnames';

type Props = {
  name: string;
  label: string;
  value: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  required?: boolean;
  isTouched?: boolean;
  customValidate?: (value: string) => boolean;
  errorMessage?: string;
} & React.InputHTMLAttributes<HTMLInputElement>; // додаємо підтримку інпут-атрибутів

export const TextField: React.FC<Props> = ({
  name,
  label,
  value,
  onChange = () => {},
  onBlur = () => {},
  placeholder = `Enter ${label}`,
  required = false,
  isTouched = false,
  customValidate = () => false,
  errorMessage = 'Invalid value',
  ...rest // тут зберігаємо data-cy і подібні
}) => {
  const hasRequiredError = required && !value.trim();
  const hasCustomError = customValidate(value);
  const showError = isTouched && (hasRequiredError || hasCustomError);

  return (
    <div className="field">
      <label className="label" htmlFor={name}>{label}</label>

      <div className="control">
        <input
          id={name}
          name={name}
          type="text"
          className={classNames('input', {
            'is-danger': showError,
          })}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          {...rest} // тут вставляється data-cy
        />
      </div>

      {isTouched && hasRequiredError && (
        <p className="help is-danger">{`${label} is required`}</p>
      )}

      {isTouched && !hasRequiredError && hasCustomError && (
        <p className="help is-danger">{errorMessage}</p>
      )}
    </div>
  );
};
