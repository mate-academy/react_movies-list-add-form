import classNames from 'classnames';
import { useState } from 'react';

interface TextFieldProps {
  name: string,
  value: string,
  label?: string,
  required?: boolean,
  onChange?: (newValue: string) => void,
  validateUrl?: (value: string) => boolean,
}

function getRandomDigits() {
  return Math.random().toString().slice(2);
}

export const TextField: React.FC<TextFieldProps> = ({
  name,
  value,
  label = name,
  required = false,
  onChange = () => {},
  validateUrl = () => true,
}) => {
  // generage a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  // To show errors only if the field was touched (onBlur)
  const [wasTouched, setWasTouched] = useState(false);
  const hasError = wasTouched && required && !value;

  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {label}
      </label>
      <div className="control">
        <input
          id={id}
          data-cy={`movie-${name}`}
          className={classNames('input', {
            'is-danger': hasError,
          })}
          type="text"
          name={name}
          placeholder={`Enter ${label}`}
          value={value}
          onBlur={() => setWasTouched(true)}
          onChange={event => onChange(event.target.value)}
        />
      </div>

      {hasError && (
        <p className="help is-danger">{`${label} is required`}</p>
      )}

      {value && !validateUrl(value) && (
        <p className="help is-danger">{`${label} is incorrect`}</p>
      )}
    </div>
  );
};
