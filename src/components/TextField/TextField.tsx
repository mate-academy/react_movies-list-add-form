import classNames from 'classnames';
import React, { useState } from 'react';
import { validateField } from '../../services/validation';

type Props = {
  name: string,
  value: string,
  label?: string,
  placeholder?: string,
  required?: boolean,
  onChange: (newValue: string) => void,
};

function getRandomDigits() {
  return Math.random()
    .toFixed(16)
    .slice(2);
}

export const TextField: React.FC<Props> = ({
  name,
  value,
  label = name,
  placeholder = `Enter ${label}`,
  required = false,
  onChange,
}) => {
  // generage a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);
  const [errorMsg, setErrorMsg] = useState('');

  const handleOnBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    const { name: fieldName, value: fieldValue } = e.target;

    if (required && !fieldValue.trim()) {
      setErrorMsg(`${label} is required`);

      return;
    }

    if ((fieldName === 'imgUrl' || fieldName === 'imdbUrl')
        && !validateField(fieldValue)) {
      setErrorMsg(`${label} format is wrong`);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMsg('');
    onChange(e.target.value);
  };

  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {label}
      </label>

      <div className="control">
        <input
          name={name}
          type="text"
          id={id}
          data-cy={`movie-${name}`}
          className={classNames('input', {
            'is-danger': errorMsg,
          })}
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          onBlur={handleOnBlur}
        />
      </div>

      {errorMsg && (
        <p className="help is-danger">{errorMsg}</p>
      )}
    </div>
  );
};
