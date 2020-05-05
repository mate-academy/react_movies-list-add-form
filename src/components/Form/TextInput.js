import React from 'react';
import PropTypes from 'prop-types';
import Error from '../Error/Error';
import './Form.scss';

const TextInput = ({
  fieldName,
  fieldData,
  textsOfErrors,
  handleFieldBlur,
  handleFieldChange,
}) => (
  <label htmlFor={fieldName} className="form__label">
    {fieldData.fieldLabel}
    <input
      id={fieldName}
      className="form__field"
      type="text"
      value={fieldData.input}
      onBlur={handleFieldBlur}
      onChange={handleFieldChange}
    />
    {
      fieldData.showError
      && !fieldData.isValid
      && <Error text={textsOfErrors[fieldData.type] || textsOfErrors.default} />
    }
  </label>
);

TextInput.propTypes = {
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

export default TextInput;
