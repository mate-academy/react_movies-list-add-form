import React from 'react';
import classNames from 'classnames';

interface Props {
  name: string;
  value: string;
  valid: boolean;
  handleChange: (event: InputAndTextareaEvent) => void;
}

export const InputField: React.FC<Props> = React.memo((props) => {
  const {
    name, value, handleChange, valid,
  } = props;

  return (
    <label htmlFor={name}>
      <input
        id={name}
        type="text"
        name={name}
        placeholder={name}
        className={classNames(
          'form-control',
          { 'is-invalid': !valid },
          { 'is-valid': valid && value },
        )}
        value={value}
        onChange={handleChange}
        autoComplete="off"
      />
      <div className="invalid-feedback">
        This field is required!
      </div>
      <div className="valid-feedback">
        Correct!
      </div>
    </label>
  );
});
