import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import './Form.scss';

const TextArea = ({
  fieldName,
  fieldData,
  textsOfErrors,
  handleFieldBlur,
  handleFieldChange,
}) => (
  <label htmlFor={fieldName} className="form__label">
    {fieldData.fieldLabel}
    <textarea
      id={fieldName}
      className={cn(
        'form__textarea',
        { 'form__textarea--error': fieldData.showError && !fieldData.isValid },
      )}
      type="text"
      value={fieldData.input}
      onBlur={handleFieldBlur}
      onChange={handleFieldChange}
    />
    {
      fieldData.showError
      && !fieldData.isValid
      && (
        <div className="form__error">
          {textsOfErrors[fieldData.type] || textsOfErrors.default}
        </div>
      )
    }
  </label>
);

TextArea.propTypes = {
  fieldName: PropTypes.string.isRequired,
  fieldData: PropTypes.shape({
    input: PropTypes.string.isRequired,
    fieldLabel: PropTypes.string.isRequired,
    showError: PropTypes.bool.isRequired,
    isValid: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  textsOfErrors: PropTypes.shape({
    default: PropTypes.string.isRequired,
  }).isRequired,
  handleFieldBlur: PropTypes.func.isRequired,
  handleFieldChange: PropTypes.func.isRequired,
};

export default TextArea;
