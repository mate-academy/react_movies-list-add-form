import React from 'react';
import PropTypes from 'prop-types';
import Error from '../Error/Error';
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
      className="form field form__field--textarea"
      type="text"
      value={fieldData.input}
      onBlur={handleFieldBlur}
      onChange={handleFieldChange}
    />
    {
      fieldData.showError
      && !fieldData.isValid
      && <Error text={textsOfErrors.default} />
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
  }).isRequired,
  textsOfErrors: PropTypes.shape({
    default: PropTypes.string.isRequired,
  }).isRequired,
  handleFieldBlur: PropTypes.func.isRequired,
  handleFieldChange: PropTypes.func.isRequired,
};

export default TextArea;
