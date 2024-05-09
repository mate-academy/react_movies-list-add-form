import { FC, useState } from 'react';

import classNames from 'classnames';
import { URL_PATTERN } from '../../constants';

interface Props {
  name: string;
  value: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (newValue: React.ChangeEvent<HTMLInputElement>) => void;
}

function getRandomDigits() {
  return Math.random().toFixed(16).slice(2);
}

export const TextField: FC<Props> = ({
  name,
  value,
  label = name,
  placeholder = `Enter ${label}`,
  required = false,
  onChange = () => {},
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  const [touched, setTouched] = useState(false);
  const hasError = touched && required && !value;

  const correctURL = name.includes('Url') && value && !value.match(URL_PATTERN);

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
            'is-danger': hasError,
          })}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={() => setTouched(true)}
        />
        {correctURL && (
          <span
            style={{
              color: 'red',
            }}
          >
            {label} is not valid
          </span>
        )}
      </div>
      {hasError && <p className="help is-danger">{`${label} is required`}</p>}
    </div>
  );
};
