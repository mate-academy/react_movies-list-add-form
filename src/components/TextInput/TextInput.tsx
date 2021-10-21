import React from 'react';
import classNames from 'classnames';

type TypeChangeEventHandler = (event: React.ChangeEvent<HTMLInputElement>) => void;

type Props = {
  fieldId: string,
  fieldName: string,
  fieldValue: string,
  labelText: string,
  onInputChange: TypeChangeEventHandler;
  validateField: TypeChangeEventHandler;
  onSetSpecialValue: (field: string, value: string) => void;
  error: boolean,
  isLink: boolean,
  specialValue?: string,
};

export const TextInput: React.FC<Props> = ({
  fieldId,
  fieldName,
  fieldValue,
  labelText,
  onInputChange,
  validateField,
  onSetSpecialValue,
  error,
  isLink,
  specialValue = '',
}) => {
  return (
    <label
      htmlFor={fieldId}
      className="form__input"
    >
      <span className="form__label-text">
        {labelText}
      </span>
      {isLink && (
        <button
          type="button"
          onClick={() => {
            onSetSpecialValue(fieldName, specialValue);
          }}
        >
          Use Placeholder URL
        </button>
      )}
      <input
        id={fieldId}
        type="text"
        name={fieldName}
        className={classNames(
          'form__input-field',
          { 'form__input-field--invalid': error },
        )}
        onChange={onInputChange}
        value={fieldValue}
        onBlur={validateField}
      />
      <br />
      {isLink
        ? (error && 'Must be a link')
        : (error && 'Required field')}
    </label>
  );
};

TextInput.defaultProps = {
  specialValue: '',
};
