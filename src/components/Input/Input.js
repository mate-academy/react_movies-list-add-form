import React from 'react';
import PropTypes from 'prop-types';

export const Input = props => (
  <div className="field">
    <label htmlFor={props.name} className="label">
      {props.name[0].toUpperCase() + props.name.slice(1)}
    </label>
    <div>
      <input
        {...props}
        className="input"
        id={props.name}
        placeholder={props.name}
      />
    </div>
  </div>
);

Input.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  pattern: PropTypes.string,
  title: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
};

Input.defaultProps = {
  type: 'text',
  pattern: '.+',
  required: true,
  title: ``,
  onBlur: () => {},
};
