import React, { useState } from 'react';
import classNames from 'classnames';
import './FormInput.scss';

type Props = {
  name: string;
  value: string;
  onChange: (x: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
  void;
  isValid: boolean;
};

export const FormInput: React.FC<Props> = React.memo(({
  name,
  value,
  onChange,
  isValid,
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <input
        type="text"
        className="input form__input"
        placeholder={`Please enter a ${name}`}
        name={name}
        value={value}
        id={name}
        onBlur={() => {
          setVisible(!isValid);
        }}
        onChange={event => {
          onChange(event);
          setVisible(false);
        }}
        style={{
          borderColor: visible ? '#eee' : '#555',
        }}
      />
      <label
        htmlFor={name}
        className={
          classNames(
            'input__label',
            { 'input__label--visible': visible },
          )
        }
      >
        {`Please enter valid ${name}`}
      </label>
    </>
  );
});
