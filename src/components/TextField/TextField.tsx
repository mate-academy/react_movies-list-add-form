import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string;
  value: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  change?: string;
  // onChange?: (newValue: string) => void;
  // isFormValid?: number;
  setIsFormValid?: (newValue: boolean) => void;
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
  // onChange = () => {},
  // isFormValid = () => {},
  setIsFormValid = () => {},
}) => {
  // generage a unique id once on component load
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  const [touched, setTouched] = useState(false);
  const [text, setText] = useState('');

  const hasError = touched && required && !value;

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const newValue = event.target.value;

  //   setText(newValue);
  //   setTouched(!!newValue.trim());

  //   // Проверка на заполнение обязательных полей и обновление состояния в родительском компоненте
  //   if (required) {
  //     const isFilled = !!newValue.trim();

  //     setIsFormValid(isFilled);
  //   }
  // };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
    setTouched(!text && false);

    if (setIsFormValid && !text) {
      setIsFormValid(true);
    }
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
          value={text}
          // onChange={handleChange}
          onChange={handleOnChange}
          onBlur={() => !text.trim() && setTouched(true)}
          // onBlur={() => setTouched(!text)}
        />
      </div>

      {hasError && <p className="help is-danger">{`${label} is required`}</p>}
    </div>
  );
};
