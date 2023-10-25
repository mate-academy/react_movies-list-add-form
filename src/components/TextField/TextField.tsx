import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string,
  value: string,
  label?: string,
  placeholder?: string,
  hasError?: boolean,
  onChange: (newValue: string, newName: string) => void;
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
  hasError = false,
  onChange,
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  const [touched, setTouched] = useState(false);

  const handleBlur = () => {
    setTouched(true);

    if (!value) {
      setTouched(true);
    } else {
      setTouched(false);
    }

    if (name === 'description') {
      setTouched(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(name, e.target.value);
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
            'is-danger': hasError || touched,
          })}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>

      {(hasError || touched) && (
        <p className="help is-danger">{`${label} is required`}</p>
      )}
    </div>
  );
};
