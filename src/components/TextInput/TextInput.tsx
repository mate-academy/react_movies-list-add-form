import React, { FC, memo } from 'react';
import classNames from 'classnames';

interface Props {
  name: string,
  label: string,
  inputValue: string,
  errorMessage: string,
  placeholder: string,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const TextInput: FC<Props> = memo(({
  name, label, inputValue, errorMessage, placeholder, onChange,
}) => {
  return (
    <div className="field">
      <label htmlFor={name} className="label">
        {label}
        <div className="control">
          <input
            type="text"
            name={name}
            id={name}
            placeholder={placeholder}
            className={classNames('input', { 'is-danger': errorMessage })}
            value={inputValue}
            onChange={onChange}
          />
        </div>
      </label>
      {errorMessage && (<p className="help is-danger">{errorMessage}</p>)}
    </div>
  );
});
