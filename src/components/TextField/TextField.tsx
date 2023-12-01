import classNames from 'classnames';
import React, { useState } from 'react';
import isUrl from '../../utils/isUrl';

type Props = {
  name: string,
  value: string,
  label?: string,
  placeholder?: string,
  required?: boolean,
  url?: boolean,
  onChange?: (newValue: string) => void,
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
  required = false,
  url = false,
  onChange = () => { },
}) => {
  // generage a unique id once on component load
  const { 0: id } = useState(() => `${name}-${getRandomDigits()}`);

  // To show errors only if the field was touched (onBlur)
  // const [touched, setTouched] = useState(false);

  const { 0: errorMessage, 1: setErrorMessage } = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    let errorMessageText = '';

    if (required && !inputValue) {
      errorMessageText = (`${label} is required`);
    } else if (url && !isUrl(inputValue)) {
      errorMessageText = ('This is not a url');
    }

    setErrorMessage(errorMessageText);
    onChange(inputValue);
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
            'is-danger': errorMessage,
          })}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          // onBlur={() => setTouched(true)}
        />
      </div>

      {errorMessage && (
        <p className="help is-danger">{errorMessage}</p>
      )}
    </div>
  );
};
