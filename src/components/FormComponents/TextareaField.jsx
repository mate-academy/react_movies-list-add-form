import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export class TextareaField extends PureComponent {
  render() {
    const { value, placeholder, name, addInfo, error, errorText } = this.props;

    return (
      <div>
        <textarea
          className="textarea"
          placeholder={placeholder}
          value={value}
          name={name}
          onChange={addInfo}
        />

        <div style={{
          visibility: error ? 'visible' : 'hidden',
          color: 'red',
        }}
        >
          {errorText}
        </div>
      </div>
    );
  }
}

TextareaField.propTypes = {
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  addInfo: PropTypes.func.isRequired,
  error: PropTypes.bool.isRequired,
  errorText: PropTypes.string.isRequired,
};
