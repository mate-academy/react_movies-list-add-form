import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string;
  value: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (newValue: string) => void;
  validate?: (value: string) => boolean;
  errorText?: string;
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
  errorText,
}) => {
  // generate a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  // To show errors only if the field was touched (onBlur)
  const [touched, setTouched] = useState(false);

  // Базовая проверка на required
  const isRequiredError = touched && required && !value.trim();

  // Дополнительная проверка с помощью функции validate
  const isCustomError = touched && value.trim() && validate && !validate(value);

  // Флаг наличия ошибки
  const hasError = isRequiredError || isCustomError;

  // Текст ошибки
  const displayErrorText = isRequiredError
    ? `${label} is required`
    : isCustomError && errorText
      ? errorText
      : '';

  // Обработчик потери фокуса
  const handleBlur = () => {
    setTouched(true);
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
            'is-danger': hasError,
          })}
          placeholder={placeholder}
          value={value}
          onChange={event => onChange(event.target.value)}
          onBlur={handleBlur}
        />
      </div>

      {hasError && <p className="help is-danger">{displayErrorText}</p>}
    </div>
  );
};
