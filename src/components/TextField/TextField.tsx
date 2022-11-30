import classNames from 'classnames';
import React, { useEffect, useState } from 'react';

type Props = {
  name: string,
  value: string,
  label?: string,
  required?: boolean,
  onChange?: React.Dispatch<React.SetStateAction<string>>,
  pattern?: RegExp
};

function getRandomDigits() {
  return Math.random().toString().slice(2);
}

export const TextField: React.FC<Props> = ({
  name,
  value,
  label = name,
  required = false,
  onChange = () => {},
  pattern,
}) => {
  const [id, setId] = useState('() =>');
  const [touched, setToched] = useState(false);
  const hasRequirError = touched && required && !value;
  const [hasValidError, setHasValidError] = useState(false);

  useEffect(() => {
    setId(`${name}-${getRandomDigits()}`);
  }, []);
  useEffect(() => {
    setHasValidError(false);
  }, [value]);

  const changetextError = () => {
    if (hasRequirError) {
      return `${label} is required`;
    }

    if (hasValidError) {
      return `${label} is not valid`;
    }

    return '';
  };

  const handleBlur = () => {
    setToched(true);

    if (pattern) {
      setHasValidError(!pattern.test(value));
    }
  };

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
            'is-danger': hasRequirError,
          })}
          type="text"
          placeholder={`Enter ${label}`}
          value={value}
          onChange={event => onChange(event.target.value)}
          onBlur={handleBlur}
        />
      </div>

      {(hasRequirError || hasValidError) && (
        <p className="help is-danger">{changetextError()}</p>
      )}
    </div>
  );
};
