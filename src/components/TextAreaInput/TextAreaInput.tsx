import React from 'react';
import classNames from 'classnames';

type Props = {
  fieldId: string,
  fieldName: string,
  fieldValue: string,
  labelText: string,
  onInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  validateField: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error: boolean,
};

export const TextAreaInput: React.FC<Props> = ({
  fieldId,
  fieldName,
  fieldValue,
  labelText,
  onInputChange,
  validateField,
  error,
}) => {
  return (
    <label
      htmlFor={fieldId}
      className="form__input"
    >
      <span className="form__label-text">
        {labelText}
      </span>
      <textarea
        id={fieldId}
        name={fieldName}
        className={classNames(
          'form__input-field',
          { 'form__input-field--invalid': error },
        )}
        value={fieldValue}
        onChange={onInputChange}
        onBlur={validateField}
      />
      <br />
      {error && 'Required field'}
    </label>
  );
};
