import React, { FC, memo } from 'react';

interface Props {
  name: string,
  label: string,
  inputValue: string,
  placeholder: string,
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export const TextareaInput: FC<Props> = memo(({
  name, label, inputValue, placeholder, onChange,
}) => {
  return (
    <div className="field">
      <label htmlFor={name} className="label">
        {label}
        <div className="control">
          <textarea
            name={name}
            id={name}
            placeholder={placeholder}
            className="textarea"
            value={inputValue}
            onChange={onChange}
          />
        </div>
      </label>
    </div>
  );
});
