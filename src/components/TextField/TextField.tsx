import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string;
  value: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (newValue: string) => void;
  isUrlField?: boolean;
  onValidationChange: (fieldName: string, hasError: boolean) => void;
};

function getRandomDigits() {
  return Math.random().toFixed(16).slice(2);
}

export const TextField: React.FC<Props> = ({
  name,
  value,
  label = name,
  placeholder = `Enter ${label}`,
  required = false,
  onChange = () => {},
  isUrlField = false,
  onValidationChange = () => {},
}) => {
  // generate a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  // To show errors only if the field was touched (onBlur)
  const [touched, setTouched] = useState(false);

  const pattern =
    // eslint-disable-next-line max-len
    /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;
  const hasRequiredError = touched && required && !value.trim();
  const hasUrlError =
    touched &&
    value.trim().length > 0 &&
    isUrlField &&
    !pattern.test(value.trim());
  const hasError = hasRequiredError || hasUrlError;

  const handleBlur = () => {
    setTouched(true);
    onChange(value.trim().replace(/\s\s+/g, ' '));
    onValidationChange(name, hasUrlError);
  };

  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {label}
      </label>

      <div className="control">
        <input
          type="text"
          id={id}
          data-cy={`movie-${name}`}
          className={classNames('input', {
            'is-danger': hasError,
          })}
          placeholder={placeholder}
          value={value}
          onChange={event => onChange(event.target.value)}
          onBlur={handleBlur}
        />
      </div>

      {hasRequiredError && (
        <p className="help is-danger">{`${label} is required`}</p>
      )}
      {hasUrlError && (
        <p className="help is-danger">{`${label} Should be correct`}</p>
      )}
    </div>
  );
};
