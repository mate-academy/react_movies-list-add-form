import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string;
  value: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (newValue: string) => void;
  // Додаємо функцію валідації Url
  validate?: (value: string) => string | null;
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
}) => {
  // генеруємо унікальний id один раз при завантаженні компонента
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  // Щоб показувати помилки тільки якщо поле було торкнуте (onBlur)
  const [touched, setTouched] = useState(false);

  // Перевіряємо обов'язковість
  const requiredError = required && !value ? `${label} is required` : null;

  // Перевіряємо кастомну валідацію
  const validationError = validate ? validate(value) : null;

  // Загальна помилка
  const error = requiredError || validationError;
  const hasError = touched && !!error;

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

      {hasError && <p className="help is-danger">{error}</p>}
    </div>
  );
};
