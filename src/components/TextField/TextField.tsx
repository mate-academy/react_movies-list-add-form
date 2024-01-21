import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string;
  value: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function generateRandomString() {
  return Math.random().toFixed(16).slice(2);
}

export const TextField: React.FC<Props> = ({
  name,
  value,
  label = name,
  placeholder = `Enter ${label}`,
  required = false,
  onChange = () => {},
}) => {
  const [id] = useState(() => `${name}-${generateRandomString()}`);
  const [inputErrorMessage, setInputErrorMessage] = useState('');
  const [blurred, setBlurred] = useState(false);

  const updateErrorMessage = (newValue: string) => {
    setInputErrorMessage(() => {
      if (name === 'description') {
        return '';
      }

      if (required && !newValue) {
        return `${label} is required`;
      }

      if (!newValue.trim()) {
        return `${label} cannot be just spaces`;
      }

      return '';
    });
  };

  const handleBlur = () => {
    setBlurred(true);
    updateErrorMessage(value);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value: newValue, ...rest } = event.target;

    updateErrorMessage(newValue);
    onChange({ ...event, currentTarget: { ...rest, value: newValue } });
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
          name={name}
          data-cy={`movie-${name}`}
          className={classNames('input', {
            'is-danger': inputErrorMessage,
          })}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>

      {(blurred || inputErrorMessage) && (
        <p className="help is-danger">
          {inputErrorMessage}
        </p>
      )}
    </div>
  );
};
