import classNames from 'classnames';
import React, { useState, useEffect } from 'react';
import { pattern } from '../../utils/pattern';

type Props = {
  name: string,
  value: string,
  label?: string,
  required?: boolean,
  setErrorCount: (newValue: number) => void,
  onChange?: (newValue: string) => void,
};

function getRandomDigits() {
  return Math.random().toString().slice(2);
}

export const TextField: React.FC<Props> = ({
  name,
  value,
  label = name,
  required = false,
  setErrorCount = () => {},
  onChange = () => {},
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);
  const [touched, setToched] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const hasError = touched && required && !isValid;

  const validateInput = (newValue: string) => {
    switch (name) {
      case 'description':
        return true;

      case 'imgUrl':
      case 'imdbUrl':
        return pattern.isLink.test(newValue);

      default:
        return pattern.isNotEmpty.test(newValue);
    }
  };

  const handleBlur = () => {
    setToched(true);
    setIsValid(validateInput(value));
  };

  useEffect(() => {
    setErrorCount(document.querySelectorAll('.help').length);
  }, [isValid]);

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
          placeholder={`Enter ${label}`}
          value={value}
          onChange={event => onChange(event.target.value)}
          onBlur={() => handleBlur()}
        />
      </div>

      { hasError && (
        <p className="help is-danger">{`valid ${label} is required`}</p>
      )}
    </div>
  );
};
