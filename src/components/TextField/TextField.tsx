import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string,
  value: string,
  label?: string,
  required?: boolean,
  onChange?: (field:string, newValue: string) => void,
  customValidation?: (value: string) => boolean
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
  customValidation = () => true,
}) => {
  // generage a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  // To show errors only if the field was touched (onBlur)
  const [touched, setToched] = useState(false);
  const hasErrorRequired = touched && required && !value;
  const hasErrorURL = touched && required && !customValidation(value);

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
            'is-danger': hasErrorRequired || hasErrorURL,
          })}
          type="text"
          placeholder={`Enter ${label}`}
          value={value}
          onChange={event => onChange(name, event.target.value)}
          onBlur={() => setToched(true)}
        />
      </div>

      {hasErrorRequired && (
        <p className="help is-danger">{`${label} is required`}</p>
      )}
      {hasErrorURL && (
        <p className="help is-danger">Please use correct url</p>
      )}
    </div>
  );
};
