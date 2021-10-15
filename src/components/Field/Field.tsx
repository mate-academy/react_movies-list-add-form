import React from 'react';

interface Props {
  id: string;
  value: string;
  label: string;
  type: string;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Field: React.FC<Props> = ({
  id,
  value,
  label,
  type,
  required,
  onChange,
}) => {
  return (
    <div className="field">
      <label htmlFor={id}>
        {label}
        <div className="control">
          <input
            id={id}
            type={type}
            className="input"
            value={value}
            onChange={onChange}
            required={required}
          />
        </div>
        <p className="help is-danger is-invisible">This field is invalid</p>
      </label>
    </div>
  );
};

Field.defaultProps = {
  required: false,
};
