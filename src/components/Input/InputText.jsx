import React from 'react';
import PropTypes from 'prop-types';

export class InputText extends React.PureComponent {
  render() {
    const { name, value, change, required, validate, onBlur, blured, valid }
      = this.props;

    const requiredMessage = (required && !value.length && blured);
    const invalidMessage = (validate && !valid && blured);

    return (
      <div>
        <input
          type="text"
          name={name}
          placeholder={
            name.charAt(0).toUpperCase() + name.slice(1) + (required ? '*' : '')
          }
          className={
            `form-control mb-4 input
            ${requiredMessage || invalidMessage ? 'warning-input' : ''}`
          }
          value={value}
          onChange={event => change(event)}
          onBlur={event => onBlur(event)}
          autoComplete="off"
        />
        {requiredMessage
          && (
            <span className="error-message">
              {`${name} is required`}
              <br />
            </span>
          )}
        {invalidMessage
          && (
            <span className="error-message">
              {`${name} is invalid`}
            </span>
          )}
      </div>
    );
  }
}

InputText.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
  required: PropTypes.bool.isRequired,
  validate: PropTypes.bool.isRequired,
  valid: PropTypes.bool.isRequired,
  onBlur: PropTypes.func.isRequired,
  blured: PropTypes.bool.isRequired,
};
