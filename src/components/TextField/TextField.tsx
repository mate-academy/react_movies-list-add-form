import classNames from 'classnames';
import { useState } from 'react';

type Props = {
  name: string;
  value: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (value: string) => void; // Change the type of onChange
  isValidUrl?: (url: string) => boolean;
};

function getRandomDigits() {
  return Math.random().toFixed(16).slice(2);
}

const validateUrl = (url: string) => {
  // Regular expression for validating URLs
  const pattern =
    // eslint-disable-next-line max-len
    /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

  return pattern.test(url);
};

// Update the TextField component
export const TextField: React.FC<Props> = ({
  name,
  value,
  label = name,
  placeholder = `Enter ${label}`,
  required = false,
  onChange = () => {},
  isValidUrl = () => true,
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  // To show errors only if the field was touched (onBlur)
  const [touched, setTouched] = useState(false);
  const hasError = touched && required && !value.trim(); // Check for spaces

  const isValid =
    name === 'imgUrl' || name === `imdbUrl`
      ? validateUrl(value)
      : isValidUrl(value);

  const hasLinkError = touched && !isValid;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = event.target;

    onChange(inputValue);
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
            'is-danger': hasError || hasLinkError,
          })}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onBlur={() => setTouched(true)}
          pattern={isValid ? undefined : 'invalid'}
        />
      </div>

      {(hasError || hasLinkError) && (
        <p className="help is-danger">
          {hasError ? `${label} is required` : `${label} is invalid`}
        </p>
      )}
    </div>
  );
};
