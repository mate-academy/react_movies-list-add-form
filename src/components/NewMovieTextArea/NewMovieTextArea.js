import React from 'react';
import PropTypes from 'prop-types';

export const NewMovieTextArea = ({
  description,
  placeholder,
  title,
  value,
  handleChange,
}) => (
  <div className="field">
    <label>
      <p>
        {`${description}:`}
      </p>
      <textarea
        name={title}
        placeholder={placeholder}
        className="textarea"
        value={value}
        onChange={handleChange}
      />
    </label>
  </div>
);

NewMovieTextArea.propTypes = {
  description: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

NewMovieTextArea.defaultProps = {
  placeholder: 'Type something',
};
