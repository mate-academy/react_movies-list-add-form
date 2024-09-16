import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useValidator } from '../../hooks/useValidator';
import { PublicValidator } from '../../utils/Validator';

type Props = {
  name: string;
  value: string;
  label?: string;
  placeholder?: string;
  setIsValid?: (hasError: boolean) => void;
  onChange?: (newValue: string) => void;
  validationCallback?: (validator: PublicValidator) => void;
};

function getRandomDigits() {
  return Math.random().toFixed(16).slice(2);
}

export const TextField: React.FC<Props> = ({
  name,
  value,
  label = name,
  placeholder = `Enter ${label}`,
  setIsValid = () => {},
  validationCallback = () => {},
  onChange = () => {},
}) => {
  // generate a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  // To show errors only if the field was touched (onBlur)
  const [touched, setTouched] = useState(false);
  const isValid = useValidator(value, validationCallback);

  useEffect(() => {
    setIsValid(isValid);
  }, [setIsValid, isValid]);

  const isErrorShown = touched && !isValid;

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
            'is-danger': isErrorShown,
          })}
          placeholder={placeholder}
          value={value}
          onChange={event => onChange(event.target.value)}
          onBlur={() => setTouched(true)}
        />
      </div>

      {isErrorShown && (
        <p className="help is-danger">{`${label} is invalid`}</p>
      )}
    </div>
  );
};
