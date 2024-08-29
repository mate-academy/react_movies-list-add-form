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
  validate?: (url: string) => boolean;
};

function getRandomDigits() {
  return Math.random().toFixed(16).slice(2);
}

const defaultValidate = () => true;

export const TextField: React.FC<Props> = ({
  name,
  value,
  label = name,
  placeholder = `Enter ${label}`,
  required = false,
  onChange = () => {},
  onBlur = () => {},
  validate = defaultValidate,
}) => {
  // generate a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  // To show errors only if the field was touched (onBlur)
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateInput = (inputValue: string) => {
    if (required && !inputValue.trim()) {
      setError(`${label} is required`);
    } else if (validate && !validate(inputValue)) {
      setError(`Invalid ${label}`);
    } else {
      setError(null);
    }
  };

  const handleBlur = () => {
    setTouched(true);
    validateInput(value);

    onBlur();
  };

  const handleChange = (newValue: string) => {
    onChange(newValue);

    if (touched) {
      validateInput(newValue);
    }
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
            'is-danger': !!error,
          })}
          placeholder={placeholder}
          value={value}
          onChange={event => handleChange(event.target.value)}
          onBlur={handleBlur}
        />
      </div>

      {error && <p className="help is-danger">{error}</p>}
    </div>
  );
};
