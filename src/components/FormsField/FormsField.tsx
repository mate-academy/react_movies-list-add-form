import React from 'react';

import './FormsField.scss';

interface Props {
  name:string,
  value:string,
  placeholder:string,
  onChange: (event:
  React.ChangeEvent<HTMLInputElement>) => void;
}

export const FormsField: React.FC<Props> = ({
  value,
  name,
  placeholder,
  onChange,
}) => (

  <label className="form__field form-field">
    <input
      type="text"
      className="form-field__input"
      placeholder={placeholder || name}
      name={name}
      value={value}
      onChange={onChange}
      required
    />
  </label>
);
