import React, { memo, useState } from 'react';
import classNames from 'classnames';
import { v4 as uuidv4 } from 'uuid';

interface Props {
  name: string;
  value: string;
  label: string;
  required?: boolean;
  onChange: React.Dispatch<React.SetStateAction<string>>;
}

const uuid = uuidv4();

const InputTextField: React.FC<Props> = ({
  name,
  value,
  label = name,
  required = false,
  onChange = () => {},
}) => {
  const [touched, setTouched] = useState(false);
  const hasError = touched && required && !value;

  return (
    <div className="field">
      <label className="label" htmlFor={uuid}>
        {label}
      </label>

      <div className="control">
        <input
          id={uuid}
          data-cy={`movie-${name}`}
          className={classNames('input', {
            'is-danger': hasError,
          })}
          type="text"
          placeholder={`Enter ${label}`}
          value={value}
          onChange={event => onChange(event.target.value)}
          onBlur={() => setTouched(true)}
        />
      </div>

      {hasError && (
        <p className="help is-danger">{`${label} is required`}</p>
      )}
    </div>
  );
};

export default memo(InputTextField);
