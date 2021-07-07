import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const NewMovieInput = React.memo(({
  description,
  title,
  isError,
  value,
  handleChange,
  handleBlur,
  placeholder,
}) => (
  <div className="field">
    <label>
      <p>
        {`${description}:`}
      </p>
      <input
        type="text"
        name={title}
        placeholder={placeholder}
        className={classNames({
          input: true,
          'is-danger': isError,
        })}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {isError
        && (
          <p className="has-text-danger">
            Please fill this field with valid data
          </p>
        )
      }
    </label>
  </div>
));

NewMovieInput.propTypes = {
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  isError: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

NewMovieInput.defaultProps = {
  placeholder: 'Type something',
};
