import classNames from 'classnames';
import React, { useState } from 'react';
import { LINK_REGEXP } from '../../constants/validation';
import { initValue } from '../../constants/initial-values';

type Props = {
  name: string,
  label?: string,
  required?: boolean,
  editMovie: (title: string, value: string) => void,
  approveField?: (name: string, newSet: boolean) => void,
};

function getRandomDigits() {
  return Math.random().toString().slice(2);
}

export const TextField: React.FC<Props> = ({
  name,
  label = name,
  required = false,
  approveField,
  editMovie,
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  const [touched, setTouched] = useState(false);

  const [value, setValue] = useState(initValue);

  const hasErrors = () => {
    const hasError = touched && required && !value;

    const validUrl = name.toLocaleLowerCase().includes('url')
      ? LINK_REGEXP.test(value)
      : true;

    return hasError || (!validUrl && touched);
  };

  const handleOnBlur = () => {
    approveField?.(name, !hasErrors());

    if (!hasErrors()) {
      editMovie(name, value);
    }
  };

  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {label}
      </label>

      <div className="control">
        <input
          id={id}
          data-cy={`movie-${name}`}
          className={classNames('input', {
            'is-danger': hasErrors(),
          })}
          type="text"
          placeholder={`Enter ${label}`}
          value={value}
          onFocus={() => setTouched(true)}
          onChange={(e) => setValue(e.target.value)}
          onBlur={handleOnBlur}
        />
      </div>

      {hasErrors() && (
        <p className="help is-danger">{`${label} is required`}</p>
      )}
    </div>
  );
};
