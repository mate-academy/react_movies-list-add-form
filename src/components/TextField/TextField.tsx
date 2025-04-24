import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string;
  value: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (newValue: string) => void;
  validate?: (newValue: string) => boolean;
  errorMessage?: string;
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
  validate,
  errorMessage = 'Invalid value',
}) => {
  // генерируйте уникальный идентификатор один раз при загрузке компонента
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  // Показывать ошибки только в том случае, если поле было затронуто (onBlur)
  const [touched, setTouched] = useState(false);
  const isEmpty = required && !value.trim();
  const isInvalid = validate && !validate(value);
  const hasError = touched && (isEmpty || isInvalid);

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
          onBlur={() => setTouched(true)}
        />
      </div>

      {hasError && (
        <p className="help is-danger">
          {isEmpty ? `${label} is required` : errorMessage}
        </p>
      )}
    </div>
  );
};
