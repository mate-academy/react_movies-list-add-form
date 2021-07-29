import React from 'react';
import PropTypes from 'prop-types';

export class Input extends React.PureComponent {
  render() {
    const { name, value, onChange, tag, borderColor } = this.props;

    return (
      <label className="label">
        {name.toUpperCase()}
        {tag === 'input'
          ? (
            <input
              className={tag}
              type="text"
              name={name}
              value={value}
              onChange={onChange}
              style={borderColor}
            />
          )
          : (
            <textarea
              className={tag}
              name={name}
              value={value}
              onChange={onChange}
              style={borderColor}
            />
          )}
      </label>
    );
  }
}

Input.propTypes = {
  borderColor: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  tag: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};
