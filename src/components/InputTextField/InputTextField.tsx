import React, { memo, useState } from 'react';
import classNames from 'classnames';
import { v4 as uuidv4 } from 'uuid';

interface Props {
  name: string;
  value: string;
  label: string;
  // eslint-disable-next-line react/require-default-props
  required?: boolean;
  onChange: (newValue: string) => void;
}

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
      <label className="label" htmlFor={uuidv4()}>
        {label}
      </label>

      <div className="control">
        <input
          type="text"
          placeholder={`Enter ${label}`}
          id={uuidv4()}
          value={value}
          data-cy={`movie-${name}`}
          className={classNames('input', {
            'is-danger': hasError,
          })}
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
