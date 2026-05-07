import classNames from 'classnames';
import { useState } from 'react';

type Props = {
  name: string;
  value: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (newValue: string) => void;
  validate?: (value: string) => string | null;
};

function getRandomDigits() {
  return Math.random().toFixed(16).slice(2);
}

export const TextField = ({
  name,
  value,
  label = name,
  placeholder = `Enter ${label}`,
  required = false,
  onChange = () => {},
  validate,
}: Props) => {
  // generate a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  // To show errors only if the field was touched (onBlur)
  const [touched, setTouched] = useState(false);
  const validationError = validate?.(value);

  let errorMessage = '';

  if (touched) {
    if (required && !value) {
      errorMessage = `${label} is required`;
    } else if (validationError) {
      errorMessage = `${label} ${validationError}`;
    }
  }

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
            'is-danger': Boolean(errorMessage),
          })}
          placeholder={placeholder}
          value={value}
          onChange={event => onChange(event.target.value)}
          onBlur={() => setTouched(true)}
        />
      </div>

      {Boolean(errorMessage) && (
        <p className="help is-danger">{errorMessage}</p>
      )}
    </div>
  );
};
