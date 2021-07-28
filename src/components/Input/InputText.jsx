import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class InputText extends Component {
  state = {
  }

  render() {
    const { name, value, change, required, validate, onBlur, blured, valid }
      = this.props;

    const requir = (required && !value.length && blured);
    const invalid = (validate && !valid && blured);

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
            ${requir || invalid ? 'warning-input' : ''}`
          }
          value={value}
          onChange={event => change(event)}
          onBlur={event => onBlur(event)}
          autoComplete="off"
        />
        {requir
          && (
            <span className="error-message">
              {`${name} is required`}
              <br />
            </span>
          )}
        {invalid
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
